import clsx from 'clsx';
import { useRouter } from 'next/router';

import headerNavLinks from '@/data/headerNavLinks';
import siteMetadata from '@/data/siteMetadata';

import EndDarkLogo from 'public/static/images/end_dark_mode.svg';
import StartDarkLogo from 'public/static/images/start_dark_mode.svg';

import EndLightLogo from 'public/static/images/end_light_mode.svg';
import StartLightLogo from 'public/static/images/start_light_mode.svg';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import Link from './Link';
import MobileNav from './MobileNav';
import ThemeSwitch from './ThemeSwitch';

const Header = () => {
  const router = useRouter();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const StartLogo = resolvedTheme === 'dark' ? StartDarkLogo : StartLightLogo;
  const EndLogo = resolvedTheme === 'dark' ? EndDarkLogo : EndLightLogo;

  return (
    <header className="supports-backdrop-blur fixed left-0 right-0 top-0 z-40 bg-white/75 py-4 backdrop-blur dark:bg-dark/75">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-3 xl:max-w-5xl xl:px-0">
        <Link href="/" aria-label={siteMetadata.headerTitle} className="flex items-center">
          <StartLogo className="fill-dark dark:fill-white" />
          <div className="group ml-1 text-xl font-bold transition duration-300">
            {siteMetadata.headerTitle}
            <span className="block h-0.5 max-w-0 bg-red-300 transition-all duration-500 group-hover:max-w-[85%] dark:bg-red-700"></span>
          </div>
          <EndLogo className="fill-dark dark:fill-white" />
          <span className="ml-2 mr-2 rounded-full bg-red-200 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-800 dark:text-white">
            Open to work
          </span>
        </Link>
        <div className="flex items-center text-base leading-5">
          <div className="hidden sm:block">
            {headerNavLinks.map((link) => (
              <Link
                key={link.title}
                href={link.href}
                className={clsx(
                  'mx-1 rounded px-2 py-1 font-medium text-gray-900 dark:text-gray-100 sm:px-3 sm:py-2',
                  router.pathname.startsWith(link.href)
                    ? 'bg-red-300 dark:bg-red-800'
                    : 'hover:bg-red-300 dark:hover:bg-red-800'
                )}
                data-umami-event={`nav-${link.href.replace('/', '')}`}
              >
                {link.title}
              </Link>
            ))}
          </div>
          <ThemeSwitch />
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;
