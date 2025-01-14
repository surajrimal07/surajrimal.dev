'use client';

import { cn } from '@/lib/utils';
import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Skeleton } from '../ui/skeleton';

export function ThemeCustomizer() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-1.5">
      <Label className="text-xs">Mode</Label>
      <div className="grid grid-cols-3 gap-2">
        {mounted ? (
          <>
            <Button
              variant={'outline'}
              size="sm"
              onClick={() => setTheme('light')}
              className={cn(theme === 'light' && 'border-2 border-primary')}
            >
              <SunIcon className="mr-1 -translate-x-1" />
              Light
            </Button>
            <Button
              variant={'outline'}
              size="sm"
              onClick={() => setTheme('dark')}
              className={cn(theme === 'dark' && 'border-2 border-primary')}
            >
              <MoonIcon className="mr-1 -translate-x-1" />
              Dark
            </Button>
          </>
        ) : (
          <>
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </>
        )}
      </div>
    </div>
  );
}
