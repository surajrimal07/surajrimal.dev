'use client';

import { useEffect, useState } from 'react';

import Link from './Link';

const CookieConsent = () => {
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  useEffect(() => {
    const checkConsent = async () => {
      const res = await fetch('/api/cookies');
      const data = await res.json();
      if (!res.ok || !data.consent) {
        setIsBannerVisible(true);
      }
    };
    checkConsent();
  }, []);

  const handleAccept = async () => {
    await fetch('/api/cookies', {
      method: 'POST',
    });
    setIsBannerVisible(false);
  };

  if (!isBannerVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 p-4 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between text-white">
        <p className="text-sm md:text-base">
          We use cookies to improve your experience. This site uses{' '}
          <Link
            href="https://vercel.com/analytics"
            className="special-underline-new"
          >
            Vercel Analytics
          </Link>{' '}
          and{' '}
          <Link href="https://umami.is" className="special-underline-new">
            Umami Analytics
          </Link>{' '}
          for performance monitoring and rate-limiting features like collecting
          IP addresses. Read our{' '}
          <Link href="/privacy" className="special-underline-new">
            Privacy Policy
          </Link>
          .
        </p>
        <button
          onClick={handleAccept}
          className="ml-4 rounded bg-red-500 px-4 py-2 text-sm font-semibold transition hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
        >
          Accept
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
