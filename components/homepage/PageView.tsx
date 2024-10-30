'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';

import clsx from 'clsx';
import toast from 'react-hot-toast';

import { useCurrentPath } from '@/components/PathProvider';
import AnimatedCounter from '@/components/animata/text/counter';
import { updatePageViews } from '@/lib/pageView';
import { toastOptions } from '@/utils/toast';

const MemoizedAnimatedCounter = React.memo(AnimatedCounter);

interface PageViewProps {
  hideViewsInSmallDevice?: boolean;
}

const PageView: React.FC<PageViewProps> = ({
  hideViewsInSmallDevice = false,
}) => {
  const pathname = useCurrentPath();
  const [pageView, setPageView] = useState<number>(0);

  const fetchPageViews = useCallback(async () => {
    try {
      const views = await updatePageViews(pathname);
      setPageView(views);
    } catch (error) {
      toast.error(`Failed to fetch page views ${error}`, toastOptions);
    }
  }, [pathname]);

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
