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

export default function ResumeHeaderImage() {
  return (
    <div className="pointer-events-none fixed inset-0">
      <div className="absolute bottom-0 left-0 pl-1">
        <motion.svg
          animate="show"
          className={clsx(
            'h-[350px] w-[350px] stroke-green-500 opacity-60 dark:opacity-40',
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
          <title>Resume Header Image</title>
          <motion.path
            custom={1}
            d="M368 32H144c-26.5 0-48 21.5-48 48v352c0 26.5 21.5 48 48 48h224c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48z"
            variants={animation}
          />
          <motion.path
            custom={2}
            d="M176 128h160M176 208h160M176 288h160"
            variants={animation}
          />
          <motion.circle
            custom={3}
            cx="256"
            cy="400"
            r="24"
            variants={animation}
          />
        </motion.svg>
      </div>
    </div>
  );
}
