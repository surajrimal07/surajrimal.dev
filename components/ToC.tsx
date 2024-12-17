'use client';

import { type MouseEvent, useEffect, useRef } from 'react';

import type { TOC } from '@/types/toc';

export function ToC({ toc }: { toc: TOC[] }) {
  const modifiedToc = toc.map((item) => {
    const parts = item.url.split('-');
    const lastPart = parts[parts.length - 1];
    if (!Number.isNaN(Number(lastPart))) {
      // If the last part is a number, remove it
      parts.pop();
    }
    return {
      ...item,
      url: parts.join('-'),
    };
  });
  const navRef = useRef<HTMLDivElement>(null);
  const activeIdRef = useRef<string | null>(null);

  useEffect(() => {
    const observerOptions = {
      rootMargin: '-10px 0px 0px 0px',
      threshold: 0,
    };
    const observer = new IntersectionObserver((entries) => {
      let firstActiveId: string | null = null;
      for (const entry of entries) {
        const firstElement = document.querySelector(`#${firstActiveId}`);

        if (entry.intersectionRatio > 0) {
          if (
            !firstActiveId ||
            (firstElement &&
              entry.target.getBoundingClientRect().top <
                firstElement.getBoundingClientRect().top)
          ) {
            firstActiveId = entry.target.getAttribute('id');
          }
        }
      }

      if (firstActiveId && activeIdRef.current !== firstActiveId) {
        if (activeIdRef.current && navRef.current) {
          const previousActiveAnchor = navRef.current.querySelector(
            `li a[href="#${activeIdRef.current}"]`,
          );
          if (previousActiveAnchor) {
            previousActiveAnchor.classList.remove('text-gray-600');
          }
        }

        if (navRef.current) {
          const currentActiveAnchor = navRef.current.querySelector(
            `li a[href="#${firstActiveId}"]`,
          );
          if (currentActiveAnchor) {
            currentActiveAnchor.classList.add('text-gray-600');
          }
        }

        activeIdRef.current = firstActiveId;
      }
    }, observerOptions);

    // Track only the headers that are in the ToC
    for (const item of modifiedToc) {
      const header = document.querySelector(item.url);
      if (header) {
        observer.observe(header);
      }
    }

    // Cleanup the observer when the component is unmounted
    return () => observer.disconnect();
  }, [modifiedToc]);

  const handleLinkClick = (e: MouseEvent, url: string) => {
    const targetElement: HTMLElement | null = document.querySelector(url);

    if (targetElement) {
      e.preventDefault();

      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

  return (
    <nav ref={navRef} className="top-24 self-start pl-0 md:sticky">
      <ul className="list-none space-y-1.5">
        {modifiedToc.map((item, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <li key={index}>
            <a
              className="block text-gray-400 transition duration-150 ease-in-out hover:text-gray-600"
              href={item.url}
              onClick={(e) => handleLinkClick(e, item.url)}
            >
              {item.value}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
