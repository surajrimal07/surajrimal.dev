import { localCache } from '@/lib/cache';

export interface RateLimitResult {
  success: boolean;
  remaining_soft: number;
  remaining_hard: number;
  error?: string;
  retryAfter?: number;
}

// Constants
const DAILY_TTL = 24 * 60 * 60 * 1000; // 24 hours
const HARD_LIMIT_TTL = 365 * 24 * 60 * 60 * 1000; // 1 year
const SOFT_LIMIT = 50;
const HARD_LIMIT = 200;

// Use nested object structure for better organization
interface IPLimits {
  daily: number;
  lifetime: number;
}

export function checkRateLimit(ip: string, update = true): RateLimitResult {
  try {
    const cacheKey = `limits:${ip}`;
    const limits = (localCache.get(cacheKey) as IPLimits) || {
      daily: 0,
      lifetime: 0,
    };

    // Calculate remaining limits
    const remaining_soft = Math.max(0, SOFT_LIMIT - limits.daily);
    const remaining_hard = Math.max(0, HARD_LIMIT - limits.lifetime);

    // Check soft limit (daily)
    if (remaining_soft === 0) {
      // Get TTL for retry-after
      const dailyTTL = localCache.getRemainingTTL(cacheKey) || 0;
      const retryAfter = Math.ceil(dailyTTL / (60 * 1000));

      return {
        success: false,
        remaining_soft: 0,
        remaining_hard,
        retryAfter,
        error: `Daily limit reached. Try again in ${retryAfter} minutes.`,
      };
    }

    // Check hard limit (lifetime)
    if (remaining_hard === 0) {
      return {
        success: false,
        remaining_soft,
        remaining_hard: 0,
        error: 'Lifetime chat limit reached.',
      };
    }

    // Update counts if needed
    if (update) {
      const newLimits = {
        daily: limits.daily + 1,
        lifetime: limits.lifetime + 1,
      };

      // Store both limits in single cache entry
      localCache.set(cacheKey, newLimits, {
        ttl: DAILY_TTL,
      });

      // Store lifetime count separately with longer TTL
      localCache.set(`lifetime:${ip}`, newLimits.lifetime, {
        ttl: HARD_LIMIT_TTL,
      });

      // Update remaining counts
      return {
        success: true,
        remaining_soft: Math.max(0, SOFT_LIMIT - newLimits.daily),
        remaining_hard: Math.max(0, HARD_LIMIT - newLimits.lifetime),
      };
    }

    // Return current limits if not updating
    return {
      success: true,
      remaining_soft,
      remaining_hard,
    };
  } catch (error) {
    // Failsafe: If cache errors, allow the request but don't count it
    console.error('Rate limit cache error:', error);
    return {
      success: true,
      remaining_soft: SOFT_LIMIT,
      remaining_hard: HARD_LIMIT,
    };
  }
}
