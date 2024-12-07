'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function CookieConsent() {
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

  return (
    <AnimatePresence>
      {isBannerVisible && (
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
          className="fixed bottom-5 left-4 right-4 z-50 mx-auto max-w-sm"
        >
          <Card className="border-none bg-gray-900 shadow-lg">
            <CardContent className="p-4">
              <h3 className="text-lg font-medium text-white">Cookie Consent</h3>
              <p className="mb-2 text-sm text-gray-200">
                We use cookies to enhance your experience. This site uses{' '}
                <Link
                  href="https://supabase.com"
                  className="text-red-300 underline hover:text-red-200"
                >
                  Supabase <ExternalLink className="inline h-3 w-3" />
                </Link>{' '}
                for data storage{' '}
                <Link
                  href="https://vercel.com/analytics"
                  className="text-red-300 underline hover:text-red-200"
                >
                  Vercel Analytics <ExternalLink className="inline h-3 w-3" />
                </Link>{' '}
                for performance monitoring{' '}
                <Link
                  href="https://umami.is"
                  className="text-red-300 underline hover:text-red-200"
                >
                  Umami <ExternalLink className="inline h-3 w-3" />
                </Link>{' '}
                for website statistics.{' '}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-gray-300">
                  By accepting, you agree to our{' '}
                  <Link
                    href="/privacy"
                    className="text-red-300 underline hover:text-red-200"
                  >
                    Privacy Policy
                  </Link>
                </p>
                <Button
                  onClick={handleAccept}
                  size="sm"
                  className="ml-4 bg-red-600 text-white hover:bg-red-700"
                >
                  Accept
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
