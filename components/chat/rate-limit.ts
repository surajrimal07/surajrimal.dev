'use server';
import { type RateLimitResult, checkRateLimit } from '@/lib/rate-limit';
import { headers } from 'next/headers';

export default async function RateLimit(
  update = false,
): Promise<RateLimitResult> {
  const header = await headers();
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.2').split(',')[0];

  const { success, error, remaining_soft, remaining_hard, retryAfter } =
    await checkRateLimit(ip, update);

  return { success, remaining_soft, remaining_hard, error, retryAfter };
}
