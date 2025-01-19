'use server';
import redis from '@/utils/redis';
import { Ratelimit } from '@upstash/ratelimit';
import { headers } from 'next/headers';

export interface RateLimitResult {
  success: boolean;
  remaining: number;
}

const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(30, '24 h'),
});

export async function RateLimit(): Promise<RateLimitResult> {
  const header = await headers();
  const identifier = (header.get('x-forwarded-for') ?? '127.0.0.2').split(
    ',',
  )[0];

  const { success, remaining } = await ratelimit.limit(identifier);

  return { success, remaining };
}
