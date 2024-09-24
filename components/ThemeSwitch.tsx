'use client';

import { Fragment, useEffect, useState } from 'react';

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react';
import { motion } from 'framer-motion';
import { useTheme } from 'next-themes';
import { CiMonitor } from 'react-icons/ci';
import { GoMoon } from 'react-icons/go';
import { HiSun } from 'react-icons/hi';

import usePlaySound from './PlaySound';

// const Sun = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 20 20"
//     fill="currentColor"
//     className="h-6 w-6"
//   >
//     <path
//       fillRule="evenodd"
//       d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
//       clipRule="evenodd"
//     />
//   </svg>
// );

// const Moon = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 20 20"
//     fill="currentColor"
//     className="h-6 w-6"
//   >
//     <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
//   </svg>
// );

// const Monitor = () => (
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 20 20"
//     fill="none"
//     stroke="currentColor"
//     strokeWidth="2"
//     strokeLinecap="round"
//     strokeLinejoin="round"
//     className="h-6 w-6"
//   >
//     <rect x="3" y="3" width="14" height="10" rx="2" ry="2"></rect>
//     <line x1="7" y1="17" x2="13" y2="17"></line>
//     <line x1="10" y1="13" x2="10" y2="17"></line>
//   </svg>
// );

//const Blank = () => <svg className="h-6 w-6" />;

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();
  const { playSound } = usePlaySound({
    filePath: '/static/sounds/switch-on.mp3',
    volume: 0.7,
  });

  const [isThemeChanged, setIsThemeChanged] = useState(false);

  const handleClick = (value) => {
    playSound();
    setTheme(value);
    setIsThemeChanged(true);
  };

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (isThemeChanged) {
      setTimeout(() => setIsThemeChanged(false), 500);
    }
  }, [isThemeChanged]);

  const ThemeOption = ({ value, icon, label }) => (
    <MenuItem>
      {({ active }) => (
        <button
          onClick={() => handleClick(value)}
          className={`${
            active || theme === value
              ? 'bg-red-500 text-white dark:bg-red-500'
              : ''
          } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
        >
          <div className="mr-2">{icon}</div>
          {label}
        </button>
      )}
    </MenuItem>
  );

  return (
    <div className="ml-2 cursor-pointer rounded-full bg-zinc-300 ring-zinc-400 transition-all hover:bg-zinc-300 hover:ring-1 dark:bg-zinc-700 dark:ring-white dark:hover:bg-zinc-800">
      <Menu>
        <motion.div
          className="flex h-8 w-8 items-center justify-center p-2"
          animate={isThemeChanged ? { scale: 1.2, rotate: 180 } : {}}
          transition={{ duration: 0.2, ease: 'easeIn' }}
          whileHover={{ scale: 1.1 }}
        >
          <MenuButton
            aria-label="Theme switcher"
            className="flex items-center justify-center"
          >
            {mounted ? (
              resolvedTheme === 'dark' ? (
                <GoMoon />
              ) : (
                <HiSun />
              )
            ) : (
              <CiMonitor />
            )}
          </MenuButton>
        </motion.div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <MenuItems className="absolute right-0 z-50 mt-2 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-800">
            <div className="p-1">
              <ThemeOption value="light" icon={<HiSun />} label="Light" />
              <ThemeOption value="dark" icon={<GoMoon />} label="Dark" />
              <ThemeOption value="system" icon={<CiMonitor />} label="System" />
            </div>
          </MenuItems>
        </Transition>
      </Menu>
    </div>
  );
};

export default ThemeSwitch;

//hover:text-red-500 dark:text-gray-400 dark:hover:text-red-500
