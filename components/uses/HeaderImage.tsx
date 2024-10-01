'use client';

import clsx from 'clsx';
import { Variants, motion } from 'framer-motion';

const animation: Variants = {
  hide: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: 0.2 + i * 0.1, duration: 2, ease: 'easeInOut' },
      opacity: { duration: 0.5 },
    },
  }),
};

export default function UsageHeaderImage() {
  return (
    <div className="pointer-events-none fixed inset-0">
      <div className="absolute bottom-0 left-0 pl-1">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="none"
          initial="hide"
          animate="show"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={clsx(
            'h-[450px] w-[450px] stroke-red-500 opacity-60',
            'dark:opacity-40'
          )}
        >
          <motion.path variants={animation} custom={1} d="M48 96h416v256H48z" />
          <motion.path
            variants={animation}
            custom={2}
            d="M160 416h192M256 352v64"
          />

          <motion.path
            variants={animation}
            custom={3}
            d="M96 144l48 32-48 32M288 144h80M96 240l48 32-48 32M288 240h80"
          />

          <motion.path
            variants={animation}
            custom={4}
            d="M400 192h48v64h-48M400 208h32"
          />

          <motion.path
            variants={animation}
            custom={5}
            d="M96 464h320M112 440h32M176 440h32M240 440h32M304 440h32M368 440h32"
          />
        </motion.svg>
      </div>
    </div>
  );
}
