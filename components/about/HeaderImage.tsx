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

export default function AboutHeaderImage() {
  return (
    <div className="pointer-events-none fixed inset-0">
      <div className="absolute bottom-0 left-0 pl-1">
        <motion.svg
          animate="show"
          className={clsx(
            'h-[300px] w-[300px] stroke-purple-500 opacity-60 dark:opacity-40',
            'hidden md:block',
          )}
          fill="none"
          initial="hide"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 512 512"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Animated Header Image</title>
          <motion.circle
            custom={1}
            cx="256"
            cy="160"
            r="64"
            variants={animation}
          />
          <motion.path
            custom={2}
            d="M256 256c-70.7 0-128 57.3-128 128v32c0 17.7 14.3 32 32 32h192c17.7 0 32-14.3 32-32v-32c0-70.7-57.3-128-128-128z"
            variants={animation}
          />
          <motion.path
            custom={3}
            d="M160 96c-26.5 0-48 21.5-48 48s21.5 48 48 48M352 96c26.5 0 48 21.5 48 48s-21.5 48-48 48"
            variants={animation}
          />
        </motion.svg>
      </div>
    </div>
  );
}
