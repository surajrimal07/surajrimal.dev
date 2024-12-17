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
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-5 left-4 right-4 z-50 mx-auto max-w-sm"
          exit={{ y: 50, opacity: 0 }}
          initial={{ y: 50, opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <Card className="border-none bg-gray-900 shadow-lg">
            <CardContent className="p-4">
              <h3 className="text-lg font-medium text-white">Cookie Consent</h3>
              <p className="mb-2 text-sm text-gray-200">
                We use cookies to enhance your experience. This site uses{' '}
                <Link
                  className="text-red-300 underline hover:text-red-200"
                  href="https://supabase.com"
                >
                  Supabase <ExternalLink className="inline h-3 w-3" />
                </Link>{' '}
                for data storage{' '}
                <Link
                  className="text-red-300 underline hover:text-red-200"
                  href="https://vercel.com/analytics"
                >
                  Vercel Analytics <ExternalLink className="inline h-3 w-3" />
                </Link>{' '}
                for performance monitoring{' '}
                <Link
                  className="text-red-300 underline hover:text-red-200"
                  href="https://umami.is"
                >
                  Umami <ExternalLink className="inline h-3 w-3" />
                </Link>{' '}
                for website statistics.{' '}
              </p>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-xs text-gray-300">
                  By accepting, you agree to our{' '}
                  <Link
                    className="text-red-300 underline hover:text-red-200"
                    href="/privacy"
                  >
                    Privacy Policy
                  </Link>
                </p>
                <Button
                  className="ml-4 bg-red-600 text-white hover:bg-red-700"
                  size="sm"
                  onClick={handleAccept}
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
