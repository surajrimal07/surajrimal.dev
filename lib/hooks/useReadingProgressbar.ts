'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export function useReadingProgress() {
  const [completion, setCompletion] = useState(0);
  const router = useRouter();

  useEffect(() => {
    function updateScrollCompletion() {
      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;
      if (scrollHeight) {
        setCompletion(
          Number((currentProgress / scrollHeight).toFixed(2)) * 100
        );
      }
    }

    function handleRouteChange() {
      setCompletion(0);
    }

    window.addEventListener('scroll', updateScrollCompletion);
    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      window.removeEventListener('scroll', updateScrollCompletion);
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router]);

  return completion;
}
