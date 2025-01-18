import redis from '@/utils/redis';
import { supabase } from '@/utils/supabase/client';

export interface RateLimitResult {
  success: boolean;
  remaining_soft: number;
  remaining_hard: number;
  error?: string;
  retryAfter?: number;
}

export async function checkRateLimit(
  ip: string,
  update = true,
): Promise<RateLimitResult> {
  const redisKey = `ratelimit:${ip}`;

  // Soft limit check (Redis - daily)
  const multi = redis.multi();
  multi.incr(redisKey);
  multi.expire(redisKey, 24 * 60 * 60);
  const [dailyCount] = (await multi.exec()) as [number, number];
  const remaining_soft = Math.max(0, 50 - dailyCount);

  // Hard limit check (Supabase - lifetime)
  let lifetimeCount = 0;
  if (update) {
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

  const remaining_hard = Math.max(0, 150 - lifetimeCount);

  // Check soft limit
  if (remaining_soft === 0) {
    const ttl = await redis.ttl(redisKey);
    const retryAfter = Math.ceil(ttl / 60);
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
