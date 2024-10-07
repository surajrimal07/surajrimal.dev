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

export default function ResumeHeaderImage() {
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
            'h-[450px] w-[450px] stroke-green-500 opacity-60 dark:opacity-40',
            'hidden md:block'
          )}
        >
          <motion.path
            variants={animation}
            custom={1}
            d="M368 32H144c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"
          />
          <motion.path
            variants={animation}
            custom={2}
            d="M176 128h160M176 208h160M176 288h160"
          />
          <motion.circle
            variants={animation}
            custom={3}
            cx="256"
            cy="400"
            r="24"
          />
        </motion.svg>
      </div>
    </div>
  );
}
