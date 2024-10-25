import { type NextRequest } from 'next/server';

import { updateSession } from './utils/supabase/middleware';

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/admin/:path*',
    '/profile/:path*',
    '/private/:path*',
    '/auth/:path*',
  ],
};
