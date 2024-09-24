'use client';

import clsx from 'clsx';
import Typewriter from 'typewriter-effect';

import headerNavLinks from '@/data/headerNavLinks';
import siteMetadata from '@/data/siteMetadata';

import AnalyticsLink from './AnalyticsLink';
import DropMenu from './DropMenu';
import Link from './Link';
import MobileNav from './MobileNav';
import { useCurrentPath } from './PathProvider';
import SearchButton from './SearchButton';
import ThemeSwitch from './ThemeSwitch';
import Tooltip from './ui/tooltip';

//to add hover block back add  // hover:text-red-800 dark:hover:text-red-800'

const Header = () => {
  const currentPath = useCurrentPath();

  let headerClass =
    'flex inset-x-0 top-4 items-center h-[70px] w-full backdrop-blur bg-white/50 dark:bg-black/50 justify-between py-7 mb-6'; //make header up or down change py
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-40'; //5
  }
  return (
    <header className={headerClass}>
      <Link
        href="/"
        aria-label={siteMetadata.headerTitle}
        className="flex items-center justify-between"
      >
        {currentPath === '/' ? (
          <div className="group ml-1 mr-1 h-7 text-2xl font-semibold transition duration-300 sm:block">
            {siteMetadata.headerTitle}
            <span className="block h-0.5 max-w-0 bg-red-300 transition-all duration-500 group-hover:max-w-[97%] dark:bg-red-700"></span>
          </div>
        ) : (
          <div className="text-primary-color dark:text-primary-color-dark flex items-center text-2xl font-semibold">
            <Typewriter
              options={{
                strings: [
                  `~${currentPath.startsWith('/blog') ? '/blog' : currentPath}`,
                ],
                autoStart: true,
                loop: false,
                deleteSpeed: 100000,
              }}
            />
          </div>
        )}
        <div className="flex items-center">
          <span className="ml-1 mr-0 hidden rounded-full bg-red-600 px-1 py-1 text-xs font-thin text-white md:block">
            Open to work
          </span>
          <Tooltip content="Open to work">
            <span className="ml-1 mr-0 mt-2 block h-2 w-2 rounded-full bg-red-600 md:hidden" />
          </Tooltip>
        </div>
      </Link>
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

//{ href: siteMetadata.analyticsURL, title: 'Analytics' },
