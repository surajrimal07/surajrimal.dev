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

// import { NextResponse, type NextRequest } from 'next/server'
// import { updateSession } from './utils/supabase/middleware'

// export async function middleware(request: NextRequest) {
//   const headers = new Headers(request.headers)
//   headers.set('x-current-path', request.nextUrl.pathname)

//   // For auth-protected routes
//   if (request.nextUrl.pathname.match(/^\/(?:dashboard|admin|profile|private|auth)/)) {
//     const response = await updateSession(request)
//     // Copy the pathname header to the response
//     response?.headers.set('x-current-path', request.nextUrl.pathname)
//     return response
//   }

//   // For all other routes, just set the pathname header
//   return NextResponse.next({
//     request: {
//       headers: headers,
//     },
//   })
// }

// export const config = {
//   matcher: [
//     // Auth protected routes
//     '/dashboard/:path*',
//     '/admin/:path*',
//     '/profile/:path*',
//     '/private/:path*',
//     '/auth/:path*',
//     // Add a matcher for all other routes
//     '/((?!api|_next/static|_next/image|favicon.ico).*)',
//   ],
// }
