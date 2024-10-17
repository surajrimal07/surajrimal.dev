'use client';

import { useEffect } from 'react';

import clsx from 'clsx';

import headerNavLinks from '@/data/headerNavLinks';
import siteMetadata from '@/data/siteMetadata';
import { useAvailabilityStore } from '@/lib/hooks/availablityState';
import { useReadingProgress } from '@/lib/hooks/useReadingProgressbar';

import AnalyticsLink from './AnalyticsLink';
import DropMenu from './DropMenu';
import Link from './Link';
import MobileNav from './MobileNav';
import { useCurrentPath } from './PathProvider';
import SearchButton from './SearchButton';
import ThemeSwitch from './ThemeSwitch';
import { HoverBorderGradient } from './ui/shimmer-button';
import Tooltip from './ui/tooltip';

const Header = () => {
  const currentPath = useCurrentPath();
  const completion = useReadingProgress();
  const { availabilityData, fetchAvailabilityData } = useAvailabilityStore();

  useEffect(() => {
    if (!availabilityData) {
      fetchAvailabilityData();
    }
  }, [availabilityData, fetchAvailabilityData]);

  return (
    <header
      className={clsx(
        'inset-x-0 top-4 mb-6 flex h-[50px] w-full items-center justify-between rounded-lg bg-white/50 py-6 backdrop-blur dark:bg-black/50',
        siteMetadata.stickyNav && 'sticky top-0 z-40'
      )}
    >
      <div className="pointer-events-none absolute bottom-0 left-0 h-full w-full overflow-hidden rounded-lg">
        <div
          className="absolute bottom-0 left-0 h-0.5 rounded-full bg-gradient-to-r from-primary-400 via-primary-500 to-primary-400"
          style={{
            width: `${completion}%`,
            maxWidth: 'calc(100% - 8px)',
            transform: 'translateY(50%)',
          }}
        />
      </div>

      <div className="z-10 flex items-center gap-0">
        <Link
          href="/"
          aria-label={siteMetadata.headerTitle}
          className="flex items-center"
        >
          <div className="link-underline group relative ml-1 mr-1 h-9 text-2xl sm:block">
            <span className="typewriter-text">
              ~
              <span className="font-bold">
                {currentPath === '/' ? (
                  <span className="hidden sm:inline">
                    {`/${siteMetadata.headerTitle}`}
                  </span>
                ) : currentPath.startsWith('/blog') ? (
                  '/blog'
                ) : currentPath.startsWith('/snippets') ? (
                  '/snippets'
                ) : currentPath.startsWith('/admin/snippets') ? (
                  '/admin/snippets'
                ) : currentPath.startsWith('/admin/blog') ? (
                  '/admin/blog'
                ) : (
                  currentPath
                )}
                <span className="sm:hidden">/</span>
              </span>
              <span
                className="blinking-cursor"
                style={{
                  fontWeight: 100,
                  fontSize: '1em',
                  animation: 'blink 1s step-start infinite',
                }}
              >
                |
              </span>
            </span>
          </div>
        </Link>

        {availabilityData?.is_available && (
          <Link
            href="/available"
            aria-label={siteMetadata.headerTitle}
            className="flex items-center"
          >
            <div className="m-0 mt-0 hidden justify-center p-0.5 text-center md:block">
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="flex items-center space-x-2 bg-white text-black dark:bg-gray-600/70 dark:text-white"
              >
                <span className="text-xs"> Open to work</span>
              </HoverBorderGradient>
            </div>

            <Tooltip content="Open to work">
              <span className="m-0 mt-1 block h-2 w-2 animate-pulse rounded-full bg-green-400 duration-1000 md:hidden" />
            </Tooltip>
          </Link>
        )}
      </div>

      <div className="z-10 flex items-center text-base leading-5">
        <div className="no-scrollbar md:max-w-82 hidden items-center space-x-4 overflow-x-auto sm:flex sm:space-x-1 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className={clsx(
                  'rounded-lg text-gray-900 dark:text-gray-100 sm:px-2 sm:py-2',
                  currentPath?.startsWith(link.href)
                    ? 'bg-red-300 dark:bg-red-600'
                    : 'link-underline hover:bg-gray-200 dark:hover:bg-gray-600'
                )}
              >
                {link.title}
              </Link>
            ))}
        </div>
        <AnalyticsLink />
        <SearchButton />
        <ThemeSwitch />
        <DropMenu />

        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
