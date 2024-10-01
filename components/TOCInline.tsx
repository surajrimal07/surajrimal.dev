'use client';

import { useEffect, useMemo, useState } from 'react';

import clsx from 'clsx';
import { Toc } from 'pliny/mdx-plugins/remark-toc-headings';

import useOnScroll from '@/lib/hooks/useOnScroll';
import useScrollSpy from '@/lib/hooks/useScrollSpy';
import { cn } from '@/lib/utils';

type TocItem = {
  value: string;
  url: string;
  depth: number;
  active?: boolean;
};

export interface TOCInlineProps {
  toc: Toc;
  title?: string;
  fromHeading?: number;
  toHeading?: number;
  asDisclosure?: boolean;
  exclude?: string | string[];
  collapse?: boolean;
  ulClassName?: string;
  liClassName?: string;
  rightAlign?: boolean;
}

export interface NestedTocItem extends TocItem {
  children?: NestedTocItem[];
}

const createNestedList = (items: TocItem[]): NestedTocItem[] => {
  const nestedList: NestedTocItem[] = [];
  const stack: NestedTocItem[] = [];

  items.forEach((item) => {
    const newItem: NestedTocItem = { ...item };
    while (stack.length > 0 && stack[stack.length - 1].depth >= newItem.depth) {
      stack.pop();
    }
    const parent = stack.length > 0 ? stack[stack.length - 1] : null;
    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(newItem);
    } else {
      nestedList.push(newItem);
    }
    stack.push(newItem);
  });

  return nestedList;
};

const TOCInline = ({
  toc,
  fromHeading = 1,
  toHeading = 6,
  asDisclosure = false,
  exclude = '',
  collapse = false,
  ulClassName = '',
  liClassName = '',
  rightAlign = false,
}: TOCInlineProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const isScrolled = useOnScroll(1000);
  const { currentVisibles } = useScrollSpy();

  // Memoize the regular expression
  const re = useMemo(
    () =>
      new RegExp(
        `^(${Array.isArray(exclude) ? exclude.join('|') : exclude})$`,
        'i'
      ),
    [exclude]
  );

  // Process TOC and filter
  const filteredToc = useMemo(
    () =>
      toc
        .map((item) => {
          const parts = item.url.split('-');
          if (!isNaN(Number(parts[parts.length - 1]))) parts.pop();
          return { ...item, url: parts.join('-') };
        })
        .filter(
          (heading) =>
            heading.depth >= fromHeading &&
            heading.depth <= toHeading &&
            !re.test(heading.value)
        ),
    [toc, fromHeading, toHeading, re]
  );

  // Memoize nestedList
  const nestedList = useMemo(
    () => createNestedList(filteredToc),
    [filteredToc]
  );

  // Scroll handler with debounce
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

      let currentId = '';
      headings.forEach((heading) => {
        const id = heading.getAttribute('id');
        if (
          id &&
          heading.getBoundingClientRect().top + window.pageYOffset - 300 <=
            scrollPosition
        ) {
          currentId = id;
        }
      });

      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTopClick = () => {
    window.scrollTo({ top: 0 });
  };

  const createList = (items: NestedTocItem[] | undefined, level = 0) => {
    if (!items || items.length === 0) return null;

    return (
      <ul
        className={ulClassName}
        style={{
          [rightAlign ? 'marginRight' : 'marginLeft']:
            `${level === 0 ? 1.5 : level}rem`,
        }}
      >
        {items.map((item, index) => {
          const itemId = item.url.substring(1);
          //       const isActive = currentVisibles?.[itemId];
          const isActiveHeader = itemId === activeId;

          return (
            <li key={index} className={liClassName}>
              <a
                href={item.url}
                className={cn(
                  'toc-link mb-0.5 inline-block rounded-lg px-0.5 py-0 transition-colors',
                  // isActive ? 'bg-gray-600 ' : 'text-gray-600',
                  isActiveHeader && 'active-header bg-gray-800'
                )}
              >
                {item.value}
              </a>
              {createList(item.children, level + 1)}
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <div
      className={clsx(
        'border-divider-light hidden h-auto max-w-80 rounded-xl border bg-gray-900 sm:block',
        'dark:border-divider-dark dark:bg-gray-900'
      )}
    >
      <div className="flex items-center justify-between border-b p-2">
        <div className="ml-5 text-lg font-bold">Contents</div>
        {isScrolled && (
          <button
            className={clsx(
              'border-divider-light text-accent-700 flex h-6 cursor-pointer items-center rounded-full border px-2 text-xs font-normal',
              'dark:border-divider-light bg-white text-black dark:bg-gray-800 dark:text-white'
            )}
            tabIndex={0}
            onClick={handleScrollToTopClick}
          >
            Scroll to top
          </button>
        )}
      </div>

      {asDisclosure ? (
        <details open={!collapse}>
          <div className="ml-6">{createList(nestedList)}</div>
        </details>
      ) : (
        <div className="ml-0">{createList(nestedList)}</div>
      )}
    </div>
  );
};

export default TOCInline;
