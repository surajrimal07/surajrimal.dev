'use client';

import { useEffect, useState } from 'react';

import { updatePageViews } from '@/lib/pageView';

import { useCurrentPath } from '../PathProvider';
import AnimatedCounter from '../animata/text/counter';

const PageView = () => {
  const pathname = useCurrentPath();
  const [pageView, setPageView] = useState<number>(0);

  useEffect(() => {
    const fetchPageViews = async () => {
      try {
        const views = await updatePageViews(pathname);
        setPageView(views);
      } catch (error) {
        console.error('Failed to fetch page views:', error);
      }
    };

    fetchPageViews();
  }, [pathname]);

  return (
    <p>
      {' '}
      Page Views <AnimatedCounter targetValue={pageView} />
    </p>
  );
};

export default PageView;
