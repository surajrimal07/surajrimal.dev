'use client';

import { useEffect } from 'react';

import * as Sentry from '@sentry/nextjs';
import { AlertCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <div className="flex h-[50vh] flex-col items-center justify-center gap-4">
      <div className="flex items-center gap-2 text-destructive">
        <AlertCircle className="h-5 w-5" />
        <h2 className="text-lg font-semibold">
          Something went wrong while loading the page!
        </h2>
      </div>
      <p className="text-muted-foreground">
        {process.env.NODE_ENV === 'development'
          ? error.message
          : 'Error has been reported, you can try reloading page again.'}
      </p>
      <Button onClick={reset} variant="outline">
        Try reloading
      </Button>
    </div>
  );
}
