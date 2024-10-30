import { headers } from 'next/headers';

import redis from '@/utils/redis';

export default async function VisitorCounter() {
  const headersList = headers();
  const ip =
    headersList.get('x-forwarded-for')?.split(',')[0] ||
    headersList.get('x-real-ip') ||
    '0.0.0.0';

  const today = new Date().toISOString().split('T')[0];
  const totalVisitsKey = 'total_visits';
  const dailyIpKey = `visitors:${today}`;

  try {
    const hasVisited = await redis.sismember(dailyIpKey, ip);

    if (!hasVisited) {
      await Promise.all([
        redis.sadd(dailyIpKey, ip),
        redis.incr(totalVisitsKey),
        redis.expire(dailyIpKey, 172800),
      ]);
    }

    const totalVisits = await redis.get<number>(totalVisitsKey);

    return <div className="text-sm">Visitor #{totalVisits}</div>;
  } catch (error) {
    console.error('Failed to track visitor:', error);
    return null;
  }
}
