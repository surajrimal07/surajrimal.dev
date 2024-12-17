'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useReadingProgress() {
  const [completion, setCompletion] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    function updateScrollCompletion() {
      // Ensure we're in a browser environment
      if (typeof window === 'undefined') return;

      const currentProgress = window.scrollY;
      const scrollHeight = document.body.scrollHeight - window.innerHeight;

      if (scrollHeight) {
        setCompletion(
          Number((currentProgress / scrollHeight).toFixed(2)) * 100,
        );
      }
    }

    // Reset completion when route changes
    setCompletion(0);

    // Add scroll event listener
    window.addEventListener('scroll', updateScrollCompletion);

    // Initial calculation
    updateScrollCompletion();

    return () => {
      window.removeEventListener('scroll', updateScrollCompletion);
    };
  }, [pathname]); // Dependency on pathname instead of router

  return completion;
}
