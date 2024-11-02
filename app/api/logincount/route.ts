import { NextResponse } from 'next/server';

import redis from '@/utils/redis';

const LOGIN_COUNTER_KEY = 'tmsextension:login:counter';

export async function POST() {
  try {
    const count = await redis.incr(LOGIN_COUNTER_KEY);
    return NextResponse.json({ success: true, count });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to increment counter' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const count = await redis.get(LOGIN_COUNTER_KEY);
    return NextResponse.json({ success: true, count: count || 0 });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to get counter' },
      { status: 500 }
    );
  }
}
