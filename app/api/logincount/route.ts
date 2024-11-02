import { type NextRequest, NextResponse } from 'next/server';

import redis from '@/utils/redis';

const LOGIN_COUNTER_KEY = 'tmsextension:login:counter';

function isValidTmsDomain(origin: string | null): boolean {
  if (!origin) return false;
  const tmsPattern = /^https:\/\/tms\d+\.nepsetms\.com\.np$/;
  return tmsPattern.test(origin);
}

function corsResponse(response: NextResponse, request: NextRequest) {
  const origin = request.headers.get('origin');

  if (isValidTmsDomain(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin!);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  }

  return response;
}

export async function OPTIONS(request: NextRequest) {
  return corsResponse(new NextResponse(null, { status: 200 }), request);
}

export async function POST(request: NextRequest) {
  try {
    const count = await redis.incr(LOGIN_COUNTER_KEY);
    const response = NextResponse.json({ success: true, count });
    return corsResponse(response, request);
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
