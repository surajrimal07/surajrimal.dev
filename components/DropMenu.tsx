import Link from 'next/link';
import { Fragment, useState } from 'react';

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { motion } from 'framer-motion';
import { CiMenuBurger } from 'react-icons/ci';
import {
  FaArchive,
  FaCode,
  FaHome,
  FaPen,
  FaSignInAlt,
  FaUser,
} from 'react-icons/fa';

import usePlaySound from './PlaySound';

const DropMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIcon = () => {
    setIsOpen(!isOpen);
  };

  const { playSound } = usePlaySound({
    filePath: '/static/sounds/page-change.mp3',
    volume: 0.7,
  });

  return (
    <Menu as="div" className="relative hidden text-left md:block">
      <div>
        <MenuButton
          className="ml-2 cursor-pointer rounded-full bg-zinc-300 ring-zinc-400 transition-all hover:bg-zinc-300 hover:ring-1 dark:bg-zinc-700 dark:ring-white dark:hover:bg-zinc-800"
          onClick={toggleIcon}
        >
          <motion.span
            className="flex h-8 w-8 items-center justify-center p-2"
            whileTap={{ scale: 0.7 }}
            transition={{ duration: 0.1, ease: 'easeIn' }}
            aria-label="Toggle List Menu"
            whileHover={{ scale: 1.1 }}
          >
            <CiMenuBurger className="h-4 w-4" />
          </motion.span>
        </MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
        afterEnter={() => {
          toggleIcon();
          playSound();
        }}
        afterLeave={() => {
          toggleIcon();
          playSound();
        }}
      >
        <MenuItems className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-zinc-300 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-zinc-700 dark:bg-zinc-800">
          <div className="py-1">
            {[
              { href: '/', label: 'Home', icon: <FaHome /> },
              { href: '/blog', label: 'Blog', icon: <FaPen /> },
              { href: '/snippets', label: 'Snippets', icon: <FaCode /> },
              { href: '/projects', label: 'Projects', icon: <FaArchive /> },
              { href: '/about', label: 'About', icon: <FaUser /> },
            ].map(({ href, label, icon }) => (
              <MenuItem key={label}>
                {({ active }) => (
                  <Link href={href} passHref legacyBehavior>
                    <a
                      className={`block px-4 py-2 text-sm ${
                        active
                          ? 'bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300'
                          : 'bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700'
                      }`}
                    >
                      <div className="flex flex-row">
                        {icon}
                        <span className="ml-4">{label}</span>
                      </div>
                    </a>
                  </Link>
                )}
              </MenuItem>
            ))}
            <MenuItem>
              {({ active }) => (
                <div
                  className={`block cursor-pointer px-4 py-2 text-sm ${
                    active
                      ? 'cursor-pointer bg-gray-200 text-gray-700 dark:bg-zinc-700 dark:text-gray-300'
                      : 'bg-white text-zinc-700 hover:bg-gray-300 dark:bg-zinc-800 dark:text-gray-200 dark:hover:bg-zinc-700'
                  }`}
                >
                  <div className="flex flex-row">
                    <FaSignInAlt />
                    <span className="ml-4">Sign In</span>
                  </div>
                </div>
              )}
            </MenuItem>
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
};

export default DropMenu;
