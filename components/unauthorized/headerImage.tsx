'use client';

import clsx from 'clsx';
import { Variants, motion } from 'framer-motion';

const pathAnimation: Variants = {
  hide: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: 0.2 + i * 0.15, duration: 1.5, ease: 'easeInOut' },
      opacity: { duration: 0.5 },
    },
  }),
};

const pulseAnimation: Variants = {
  hide: { scale: 0.8, opacity: 0 },
  show: (i: number) => ({
    scale: [0.8, 1.1, 1],
    opacity: [0, 1, 1],
    transition: {
      delay: 1 + i * 0.2,
      duration: 0.8,
      ease: 'easeOut',
      times: [0, 0.7, 1],
    },
  }),
};

export default function UnauthorizedImage() {
  return (
    <div className="pointer-events-none fixed inset-0 flex items-end justify-center">
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
            'h-[450px] w-[450px] opacity-60 dark:opacity-40',
            'hidden md:block'
          )}
        >
          {/* Circle for no entry sign */}
          <motion.circle
            variants={pathAnimation}
            custom={0}
            cx="256"
            cy="256"
            r="200"
            className="stroke-red-600"
          />

          {/* Horizontal bar */}
          <motion.rect
            variants={pathAnimation}
            custom={1}
            x="156"
            y="230"
            width="200"
            height="30"
            className="fill-red-600"
          />

          {/* Vertical bar */}
          <motion.rect
            variants={pathAnimation}
            custom={2}
            x="256"
            y="156"
            width="30"
            height="200"
            className="fill-red-600"
          />

          {/* Pulsating circles */}
          <motion.circle
            variants={pulseAnimation}
            custom={3}
            cx="256"
            cy="256"
            r="80"
            className="fill-transparent stroke-red-400"
          />
          <motion.circle
            variants={pulseAnimation}
            custom={4}
            cx="256"
            cy="256"
            r="100"
            className="fill-transparent stroke-red-300"
          />
        </motion.svg>
      </div>
    </div>
  );
}
