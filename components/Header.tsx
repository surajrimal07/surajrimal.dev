'use client';

import clsx from 'clsx';

import headerNavLinks from '@/data/headerNavLinks';
import siteMetadata from '@/data/siteMetadata';
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
  //const completion = useReadingProgress();

  let headerClass =
    'flex inset-x-0 top-4 items-center h-[70px] w-full backdrop-blur bg-white/50 dark:bg-black/50 justify-between py-7 mb-6'; //make header up or down change py
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-40'; //5
  }
  return (
    <header className={headerClass}>
      <div className="flex items-center gap-0">
        <Link
          href="/"
          aria-label={siteMetadata.headerTitle}
          className="flex items-center"
        >
          <div className="link-underline group relative ml-1 mr-1 h-7 text-2xl sm:block">
            <span className="typewriter-text">
              ~
              <span className="font-bold">
                {currentPath === '/'
                  ? `/${siteMetadata.headerTitle}`
                  : currentPath.startsWith('/admin/blog')
                    ? '/admin/blog'
                    : currentPath.startsWith('/blog')
                      ? '/blog'
                      : currentPath}
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

        <Link
          href="/"
          aria-label={siteMetadata.headerTitle}
          className="flex items-center"
        >
          <div className="m-0 mt-2 hidden justify-center p-0.5 text-center md:block">
            <HoverBorderGradient
              containerClassName="rounded-full"
              as="button"
              className="flex items-center space-x-2 bg-white text-black dark:bg-black dark:text-white"
            >
              <span className="text-xs"> Open to work</span>
            </HoverBorderGradient>
          </div>

          <Tooltip content="Open to work">
            <span className="ml-1 mt-2 block h-2 w-2 animate-pulse rounded-full bg-green-400 duration-1000 md:hidden" />
          </Tooltip>
        </Link>
      </div>

      <div className="flex items-center text-base leading-5">
        <div className="no-scrollbar hidden max-w-40 items-center space-x-4 overflow-x-auto sm:flex sm:space-x-1 md:max-w-72 lg:max-w-96">
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
                    : 'link-underline hover:bg-gray-200 dark:hover:bg-gray-700'
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
