import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from '@headlessui/react';
import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';

import Link from '@/components/Link';
import { useCurrentPath } from '@/components/PathProvider';
import headerNavLinks from '@/data/headerNavLinks';
import usePlaySound from '@/lib/hooks/PlaySound';
import { useSoundStore } from '@/lib/hooks/soundState';

const MobileNav = memo(() => {
  const [navShow, setNavShow] = useState(false);
  const { isSoundEnabled } = useSoundStore();
  const navRef = useRef(null);
  const pathname = useCurrentPath();

  const { playSound } = usePlaySound({
    filePath: '/static/sounds/page-change.mp3',
    volume: 0.7,
  });

  const onToggleNav = useCallback(() => {
    setNavShow((status) => {
      if (isSoundEnabled) playSound();
      if (status) {
        enableBodyScroll(navRef.current);
      } else {
        disableBodyScroll(navRef.current);
      }
      return !status;
    });
  }, [isSoundEnabled, playSound]);

  useEffect(() => {
    return clearAllBodyScrollLocks;
  }, []);

  return (
    <>
      <button
        type="button"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
        className="sm:hidden"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-8 w-8 text-gray-900 hover:text-primary-500 dark:text-gray-100 dark:hover:text-primary-400"
          aria-labelledby="toggleMenuTitle"
        >
          <title id="toggleMenuTitle">Toggle Navigation Menu</title>
          <path
            fillRule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <Transition appear show={navShow} as={Fragment} unmount={false}>
        <Dialog as="div" onClose={onToggleNav} unmount={false}>
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            unmount={false}
          >
            <div className="fixed inset-0 z-60 bg-black/25" />
          </TransitionChild>

          <TransitionChild
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full opacity-0"
            enterTo="translate-x-0 opacity-95"
            leave="transition ease-in duration-200 transform"
            leaveFrom="translate-x-0 opacity-95"
            leaveTo="translate-x-full opacity-0"
            unmount={false}
          >
            <DialogPanel className="fixed left-0 top-0 z-70 h-full w-full bg-black opacity-95 duration-300">
              <nav
                ref={navRef}
                className="mt-24 flex h-full basis-0 flex-col items-start overflow-y-auto px-8 pt-2 text-left"
              >
                {headerNavLinks.map((link) => (
                  <Link
                    key={link.title}
                    href={link.href}
                    className={`mb-4 w-full rounded-lg px-4 py-3 text-2xl font-bold tracking-widest ${
                      pathname === link.href ||
                      (link.href.startsWith('/blog') &&
                        pathname.startsWith('/blog'))
                        ? 'bg-gray-800 text-red-400'
                        : 'text-gray-100'
                    } outline outline-0`}
                    onClick={onToggleNav}
                  >
                    {link.title}
                  </Link>
                ))}
              </nav>

              <div className="absolute bottom-8 left-0 right-0 flex justify-center">
                <div className="rounded-lg bg-gray-800 px-4 py-2">
                  <p className="text-lg font-bold text-gray-300">Suraj Rimal</p>
                </div>
              </div>

              <button
                type="button"
                className="fixed right-4 top-7 z-80 h-16 w-16 p-4 text-gray-100"
                aria-label="Toggle Menu"
                onClick={onToggleNav}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-labelledby="closeMenuTitle"
                >
                  <title id="closeMenuTitle">Close Navigation Menu</title>
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </DialogPanel>
          </TransitionChild>
        </Dialog>
      </Transition>
    </>
  );
});

MobileNav.displayName = 'MobileNav';

export default memo(MobileNav);
