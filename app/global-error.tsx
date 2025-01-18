'use client';

import * as Sentry from '@sentry/nextjs';
// biome-ignore lint/suspicious/noShadowRestrictedNames: <explanation>
import type Error from 'next/error';
import Link from 'next/link';
import { useEffect } from 'react';

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en-US">
      <body className="flex min-h-screen items-center justify-center bg-black p-4">
        <div className="w-full max-w-md rounded-xl bg-gradient-to-br from-red-900 via-black to-black p-8 text-center shadow-2xl border border-red-800/50">
          <div className="mb-8">
            <svg
              aria-hidden="true"
              className="mx-auto h-16 w-16 text-red-500 animate-pulse"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              />
            </svg>
          </div>

          <h1 className="mb-4 text-3xl font-bold text-red-500">
            Oops! Something went wrong
          </h1>

          <p className="mb-8 text-gray-400">
            We&apos;re experiencing technical difficulties. Please try again
            later.
          </p>

          <div className="flex justify-center space-x-4">
            <button
              className="inline-flex items-center rounded-lg bg-red-600 px-6 py-3 text-sm font-medium text-white shadow-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all transform hover:scale-105"
              type="button"
              onClick={() => window.location.reload()}
            >
              Try again
            </button>
            <Link
              className="inline-flex items-center rounded-lg border border-red-600 bg-transparent px-6 py-3 text-sm font-medium text-red-500 hover:bg-red-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all transform hover:scale-105"
              href="/"
            >
              Return home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
