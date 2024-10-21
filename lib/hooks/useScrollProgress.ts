import { useCallback, useEffect, useState } from 'react';

interface ScrollProgress {
  showScrollToTop: boolean;
  progress: number;
}

export const useScrollProgress = (): ScrollProgress => {
  const [scrollState, setScrollState] = useState<ScrollProgress>({
    showScrollToTop: false,
    progress: 0,
  });

  const handleWindowScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    const windowHeight = scrollHeight - clientHeight;
    const progress = (scrollTop / windowHeight) * 100;
    const showScrollToTop = progress > 40;

    setScrollState({ showScrollToTop, progress });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleWindowScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleWindowScroll);
  }, [handleWindowScroll]);

  return scrollState;
};
