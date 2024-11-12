'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import clsx from 'clsx';
import toast from 'react-hot-toast';

import { useCurrentPath } from '@/components/PathProvider';
import AnimatedCounter from '@/components/animata/text/counter';
import { getPageViews } from '@/lib/pageView';
import { toastOptions } from '@/utils/toast';

const MemoizedAnimatedCounter = React.memo(AnimatedCounter);

interface PageViewProps {
  hideViewsInSmallDevice?: boolean;
  shouldIncrement?: boolean;
}

const PageView: React.FC<PageViewProps> = ({
  hideViewsInSmallDevice = false,
  shouldIncrement = false,
}) => {
  const pathname = useCurrentPath();
  const [pageView, setPageView] = useState<number>(0);
  const lastIncrementTimestamp = useRef<{ [key: string]: number }>({});

  const fetchPageViews = useCallback(async () => {
    try {
      const now = Date.now();
      const lastIncrement = lastIncrementTimestamp.current[pathname] || 0;
      const shouldDebounce = shouldIncrement && now - lastIncrement < 60000;

      const views = await getPageViews(
        pathname,
        shouldIncrement && !shouldDebounce
      );

      if (shouldIncrement && !shouldDebounce) {
        lastIncrementTimestamp.current[pathname] = now;
      }

      setPageView(views);
    } catch (error) {
      console.error(`Failed to fetch page views for ${pathname}`, error);
      toast.error(`Failed to fetch page views`, toastOptions);
    }
  }, [pathname, shouldIncrement]);

  useEffect(() => {
    fetchPageViews();
  }, [fetchPageViews]);

  const memoizedCounter = useMemo(
    () => <MemoizedAnimatedCounter targetValue={pageView} />,
    [pageView]
  );

  return (
    <p>
      <span
        className={clsx({
          'hidden sm:inline': hideViewsInSmallDevice,
        })}
      >
        {'Views '}
      </span>
      {memoizedCounter}
    </p>
  );
};

export default PageView;
