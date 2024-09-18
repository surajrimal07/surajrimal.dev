'use client';
import headerNavLinks from '@/data/headerNavLinks';
import siteMetadata from '@/data/siteMetadata';

import clsx from 'clsx';
import { usePathname } from 'next/navigation';
import Typewriter from 'typewriter-effect';
import AnalyticsLink from './AnalyticsLink';
import Link from './Link';
import MobileNav from './MobileNav';
import SearchButton from './SearchButton';
import ThemeSwitch from './ThemeSwitch';

//to add hover block back add  // hover:text-red-800 dark:hover:text-red-800'

const Header = () => {
  const pathname = usePathname();

  let headerClass = 'flex items-center w-full bg-white/75 dark:bg-dark/75 backdrop-blur justify-between py-8'; //make header up or down change py
  if (siteMetadata.stickyNav) {
    headerClass += ' sticky top-0 z-5';
  }
  return (
    <header className={headerClass}>
      <Link href="/" aria-label={siteMetadata.headerTitle} className="flex items-center justify-between ">
        <span className="text-3xl font-bold">{'{ '}</span>
        {pathname === '/' ? (
          <div className="group ml-1 mr-1 hidden h-7 text-2xl font-semibold sm:block transition duration-300">
            {siteMetadata.headerTitle}
            <span className="block h-0.5 max-w-0 bg-red-300 transition-all duration-500 group-hover:max-w-[97%] dark:bg-red-700"></span>
          </div>
        ) : (
          <div className="text-primary-color dark:text-primary-color-dark flex items-center text-2xl font-semibold">
            {`~${pathname}`}{' '}
            <Typewriter
              options={{
                strings: [],
                autoStart: true,
                loop: true,
              }}
            />
          </div>
        )}
        <span className="text-3xl font-bold mr-2">{' }'}</span>

        <div className="flex items-center">
          <span className="ml-1 mr-1 rounded-full bg-red-600 px-1 py-1 text-xs font-medium text-white">
            Open to work
          </span>
        </div>
      </Link>
      <div className="flex items-center space-x-4 leading-5 sm:space-x-3">
        <div className="no-scrollbar hidden max-w-40 items-center space-x-4 overflow-x-auto sm:flex sm:space-x-1 md:max-w-72 lg:max-w-96">
          {headerNavLinks
            .filter((link) => link.href !== '/')
            .map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className={clsx(
                  'link-underline rounded py-1 px-1 text-gray-900 hover:bg-gray-200 dark:text-gray-100 dark:hover:bg-gray-700 sm:py-2 sm:px-3 ',
                  pathname?.startsWith(link.href)
                    ? 'bg-red-300 dark:bg-red-800 '
                    : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                )}
              >
                {link.title}
              </Link>
            ))}
        </div>
        <AnalyticsLink />
        <SearchButton />
        <ThemeSwitch />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;

//{ href: siteMetadata.analyticsURL, title: 'Analytics' },
