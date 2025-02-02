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

export default function AuthHeaderImage() {
  return (
    <div className="pointer-events-none fixed inset-0">
      <div className="absolute bottom-0 left-0 pl-1">
        <motion.svg
          animate="show"
          className={clsx(
            'h-[350px] w-[350px] stroke-indigo-500 opacity-60 dark:opacity-40',
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
          <title>Authentication Header Image</title>
          <motion.path
            custom={1}
            d="M128 224h256v256H128zM256 320v64"
            variants={animation}
          />

          <motion.path
            custom={2}
            d="M128 224c0-70.7 57.3-128 128-128s128 57.3 128 128"
            variants={animation}
          />
          {/* Digital elements */}
          <motion.path
            custom={3}
            d="M176 288h32M304 288h32M176 368h32M304 368h32"
            variants={animation}
          />
          {/* Keyhole */}
          <motion.circle
            custom={4}
            cx="256"
            cy="320"
            r="16"
            variants={animation}
          />
        </motion.svg>
      </div>
    </div>
  );
}
