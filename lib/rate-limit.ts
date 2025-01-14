import redis from '@/utils/redis';
import { supabase } from '@/utils/supabase/client';

interface RateLimitResult {
  success: boolean;
  remaining: number;
  error?: string;
}

export async function checkRateLimit(ip: string): Promise<RateLimitResult> {
  const redisKey = `ratelimit:${ip}`;
  const multi = redis.multi();
  multi.incr(redisKey);
  multi.expire(redisKey, 3600);
  const [count] = (await multi.exec()) as [number, number];

  if (count > 60) {
    const ttl = await redis.ttl(redisKey);
    return {
      success: false,
      remaining: 0,
      error: `Soft limit reached. Please try again in ${Math.ceil(ttl / 60)} minutes.`,
    };
  }

  try {
    const { data: ipRecord, error: fetchError } = await supabase
      .from('iprecord')
      .select('chat')
      .eq('ipaddress', ip)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    if (ipRecord?.chat >= 100) {
      return {
        success: false,
        remaining: 0,
        error:
          'You have reached the maximum allowed requests. Please contact me if you need more information.',
      };
    }

    await supabase.from('iprecord').upsert(
      {
        ipaddress: ip,
        chat: (ipRecord?.chat || 0) + 1,
      },
      {
        onConflict: 'ipaddress',
      },
    );

    return {
      success: true,
      remaining: Math.min(5 - count, 10 - (ipRecord?.chat || 0)),
    };
  } catch (error) {
    console.error('Rate limit check failed:', error);
    throw error;
  }
}

// import { Ratelimit } from "@upstash/ratelimit"

// // Create a new ratelimiter, that allows 10 requests per 2 minutes
// const ratelimit = new Ratelimit({
//   redis: kv,
//   limiter: Ratelimit.slidingWindow(10, "2 m"),
// })

// export async function rateLimit(identifier: string) {
//   const { success, remaining } = await ratelimit.limit(identifier)

//   return { success, remaining }
// }
