'use client';

import clsx from 'clsx';
import { type Variants, motion } from 'framer-motion';

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
          animate="show"
          className={clsx(
            'h-[350px] w-[350px] stroke-cyan-500 opacity-60',
            'dark:opacity-40',
          )}
          fill="none"
          initial="hide"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Header Image</title>
          <motion.path custom={1} d="M48 96h416v256H48z" variants={animation} />
          <motion.path
            custom={2}
            d="M160 416h192M256 352v64"
            variants={animation}
          />

          <motion.path
            custom={3}
            d="M96 144l48 32-48 32M288 144h80M96 240l48 32-48 32M288 240h80"
            variants={animation}
          />

          <motion.path
            custom={4}
            d="M400 192h48v64h-48M400 208h32"
            variants={animation}
          />

          <motion.path
            custom={5}
            d="M96 464h320M112 440h32M176 440h32M240 440h32M304 440h32M368 440h32"
            variants={animation}
          />
        </motion.svg>
      </div>
    </div>
  );
}
