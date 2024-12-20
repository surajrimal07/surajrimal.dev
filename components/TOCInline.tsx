'use client';

import { useEffect, useMemo, useState } from 'react';

import clsx from 'clsx';
import { ChevronDown, ChevronUp } from 'lucide-react';

import useOnScroll from '@/lib/hooks/useOnScroll';
import { cn } from '@/lib/utils';
import type { TOCInlineProps, TocItem } from '@/types/toc';

export interface NestedTocItem extends TocItem {
  children?: NestedTocItem[];
}

const createNestedList = (items: TocItem[]): NestedTocItem[] => {
  const nestedList: NestedTocItem[] = [];
  const stack: NestedTocItem[] = [];

  for (const item of items) {
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
  }

  return nestedList;
};

const TOCInline = ({
  toc,
  fromHeading = 1,
  toHeading = 6,
  exclude = '',
  ulClassName = '',
  liClassName = '',
}: TOCInlineProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const isScrolled = useOnScroll(1000);

  const re = useMemo(
    () =>
      new RegExp(
        `^(${Array.isArray(exclude) ? exclude.join('|') : exclude})$`,
        'i',
      ),
    [exclude],
  );

  const filteredToc = useMemo(
    () =>
      toc
        .map((item) => {
          const parts = item.url.split('-');
          if (!Number.isNaN(Number(parts[parts.length - 1]))) parts.pop();
          return { ...item, url: parts.join('-') };
        })
        .filter(
          (heading) =>
            heading.depth >= fromHeading &&
            heading.depth <= toHeading &&
            !re.test(heading.value),
        ),
    [toc, fromHeading, toHeading, re],
  );

  const nestedList = useMemo(
    () => createNestedList(filteredToc),
    [filteredToc],
  );

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

      let currentId = '';
      for (const heading of headings) {
        const id = heading.getAttribute('id');
        if (
          id &&
          heading.getBoundingClientRect().top + window.pageYOffset - 300 <=
            scrollPosition
        ) {
          currentId = id;
        }
      }

      setActiveId(currentId);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!toc || toc.length < 2) {
    return null;
  }

  const createList = (items: NestedTocItem[] | undefined, level = 0) => {
    if (!items || items.length === 0) return null;

    return (
      <ul
        className={cn(
          ulClassName,
          level === 0 && 'space-y-1',
          level > 0 && `toc-indent-${level}`,
        )}
      >
        {items.map((item, index) => {
          const itemId = item.url.substring(1);
          const isActiveHeader = itemId === activeId;

          return (
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            <li key={index} className={liClassName}>
              <a
                className={cn(
                  'block rounded-md px-2 py-1 text-sm transition-all',
                  'text-muted-foreground hover:bg-slate-50 hover:dark:bg-[#242e45]',
                  isActiveHeader &&
                    'active-header bg-slate-100 dark:bg-[#1e2638]',
                )}
                href={item.url}
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
        'border-divider-light hidden h-auto max-w-64 rounded-xl bg-gray-300 pb-1 sm:block',
        'dark:border-divider-dark dark:bg-gray-900',
      )}
    >
      <div className="flex items-center justify-between border-b p-2">
        <div className="ml-2 flex items-center text-base font-bold text-black dark:text-white">
          <span>On this page</span>
          <button
            className="ml-2 p-1"
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
        {isScrolled && (
          <button
            className={clsx(
              'border-divider-light text-accent-700 flex h-6 cursor-pointer items-center rounded-full border px-2 text-xs font-normal',
              'dark:border-divider-light bg-white text-black dark:bg-gray-800 dark:text-white',
            )}
            tabIndex={0}
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            Scroll to top
          </button>
        )}
      </div>

      {isExpanded && <div className="mt-2">{createList(nestedList)}</div>}
    </div>
  );
};

export default TOCInline;
