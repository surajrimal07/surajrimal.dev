import { localCache } from '@/lib/cache';
import { supabase } from '@/utils/supabase/client';

export interface RateLimitResult {
  success: boolean;
  remaining_soft: number;
  remaining_hard: number;
  error?: string;
  retryAfter?: number;
}

// Fetch rate limits from Supabase and cache them
async function getRateLimits() {
  const cacheKey = 'rate_limits';
  const cachedLimits = localCache.get(cacheKey);

  // Return cached limits if available
  if (cachedLimits) {
    return cachedLimits;
  }

  // Fetch rate limits from Supabase if not cached
  const { data, error } = await supabase
    .from('rate_limits')
    .select('limit_type, limit_value');

  if (error) {
    throw new Error('Failed to fetch rate limits');
  }

  const limits = {
    soft_daily: 50, // default value
    hard_lifetime: 200, // default value
  };

  for (const limit of data) {
    if (limit.limit_type === 'soft_daily') {
      limits.soft_daily = limit.limit_value;
    } else if (limit.limit_type === 'hard_lifetime') {
      limits.hard_lifetime = limit.limit_value;
    }
  }

  // Cache the limits in localCache
  localCache.set(cacheKey, limits);

  return limits;
}

export async function checkRateLimit(
  ip: string,
  update = true,
): Promise<RateLimitResult> {
  // Fetch rate limits (cached or from Supabase)
  const { soft_daily: softLimit, hard_lifetime: hardLimit } =
    await getRateLimits();

  // Soft limit check - local cache (24 hours)
  const dailyLimitCacheKey = `daily_limit:${ip}`;
  const dailyCount = (localCache.get(dailyLimitCacheKey) as number) || 0;
  const remaining_soft = Math.max(0, softLimit - dailyCount);

  // Hard limit check (Supabase - lifetime)
  let lifetimeCount = 0;
  if (update) {
    // Only update the count if we are updating
    localCache.set(dailyLimitCacheKey, dailyCount + 1, {
      ttl: 24 * 60 * 60 * 1000,
    });

    const { data: ipRecord, error: fetchError } = await supabase
      .from('iprecord')
      .select('chat')
      .eq('ipaddress', ip)
      .single();

    if (fetchError && fetchError.code === 'PGRST116') {
      // New IP - create record
      await supabase.from('iprecord').insert({ ipaddress: ip, chat: 1 });
      lifetimeCount = 1;
    } else if (!fetchError && ipRecord) {
      // Existing IP - increment count
      lifetimeCount = ipRecord.chat + 1;
      await supabase
        .from('iprecord')
        .update({ chat: lifetimeCount })
        .eq('ipaddress', ip);
    }
  } else {
    // If not updating, just fetch the current count
    const { data: ipRecord, error: fetchError } = await supabase
      .from('iprecord')
      .select('chat')
      .eq('ipaddress', ip)
      .single();

    if (!fetchError && ipRecord) {
      lifetimeCount = ipRecord.chat;
    }
  }

  const remaining_hard = Math.max(0, hardLimit - lifetimeCount);

  // Check soft limit
  if (remaining_soft === 0) {
    const ttl = localCache.getRemainingTTL(dailyLimitCacheKey); // Get remaining TTL in milliseconds
    const retryAfter = Math.ceil(ttl / (60 * 1000)); // Convert to minutes
    return {
      success: false,
      remaining_soft: 0,
      remaining_hard,
      retryAfter,
      error: `Daily limit reached. Try again in ${retryAfter} minutes.`,
    };
  }

  // Check hard limit
  if (remaining_hard === 0) {
    return {
      success: false,
      remaining_soft,
      remaining_hard: 0,
      error: 'Lifetime chat limit reached.',
    };
  }

  // Success case
  return {
    success: true,
    remaining_soft,
    remaining_hard,
  };
}
