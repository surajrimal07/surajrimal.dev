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

export default function HeaderImage() {
  return (
    <div className="pointer-events-none fixed inset-0">
      <div className="absolute right-0 top-0 pr-1">
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
            'h-[450px] w-[450px] stroke-red-500 opacity-60 dark:opacity-40',
            'hidden md:block'
          )}
        >
          <motion.path
            variants={animation}
            custom={1}
            d="M204.055 213.905q-18.12-5.28-34.61-9a145.92 145.92 0 0 1-6.78-44.33c0-65.61 42.17-118.8 94.19-118.8 52.02 0 94.15 53.14 94.15 118.76a146.3 146.3 0 0 1-6.16 42.32q-20.52 4.3-43.72 11.05c-22 6.42-39.79 12.78-48.56 16.05-8.72-3.27-26.51-9.63-48.51-16.05zm-127.95 84.94a55.16 55.16 0 1 0 55.16 55.15 55.16 55.16 0 0 0-55.16-55.15zm359.79 0a55.16 55.16 0 1 0 55.16 55.15 55.16 55.16 0 0 0-55.15-55.15zm-71.15 55.15a71.24 71.24 0 0 1 42.26-65v-77.55c-64.49 0-154.44 35.64-154.44 35.64s-89.95-35.64-154.44-35.64v74.92a71.14 71.14 0 0 1 0 135.28v7c64.49 0 154.44 41.58 154.44 41.58s89.99-41.55 154.44-41.55v-9.68a71.24 71.24 0 0 1-42.26-65z"
          />
        </motion.svg>
      </div>
    </div>
  );
}
