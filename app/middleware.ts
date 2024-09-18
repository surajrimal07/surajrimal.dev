import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);
  const pathname = request.nextUrl.pathname;
  console.log('pathname in middleware:', request.nextUrl.pathname);

  if (pathname === '/') {
    headers.set('x-current-path', 'home');
  } else {
    headers.set('x-current-path', pathname);
  }

  return NextResponse.next({ headers });
}

export const config = {
  matcher: ['/((_next/static|_next/image|favicon.ico).*)'],
};
