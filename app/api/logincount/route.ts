import { NextRequest, NextResponse } from 'next/server';

import redis from '@/utils/redis';

const LOGIN_COUNTER_KEY = 'tmsextension:login:counter';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const action = searchParams.get('action');

  try {
    if (action === 'receive') {
      await redis.incr(LOGIN_COUNTER_KEY);
      return NextResponse.json({ message: 'Ping received!' }, { status: 200 });
    }

    if (action === 'count') {
      const count = (await redis.get<number>(LOGIN_COUNTER_KEY)) || 0;
      return NextResponse.json({ totalPings: count }, { status: 200 });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    console.error('Error in login count route:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
