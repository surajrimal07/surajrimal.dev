'use client';

import { updatePageViews } from '@/lib/pageView';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import AnimatedCounter from '../animata/text/counter';

const PageView = () => {
  const pathname = usePathname();
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
      Page View <AnimatedCounter targetValue={pageView} />
    </p>
  );
};

export default PageView;
