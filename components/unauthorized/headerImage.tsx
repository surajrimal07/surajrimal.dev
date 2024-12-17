'use client';

import clsx from 'clsx';
import { type Variants, motion } from 'framer-motion';

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
          animate="show"
          className={clsx(
            'h-[350px] w-[350px] opacity-60 dark:opacity-40',
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
          <title>Unauthorized Access Image</title>
          {/* Circle for no entry sign */}
          <motion.circle
            className="stroke-red-600"
            custom={0}
            cx="256"
            cy="256"
            r="200"
            variants={pathAnimation}
          />

          {/* Horizontal bar */}
          <motion.rect
            className="fill-red-600"
            custom={1}
            height="30"
            variants={pathAnimation}
            width="200"
            x="156"
            y="230"
          />

          {/* Vertical bar */}
          <motion.rect
            className="fill-red-600"
            custom={2}
            height="200"
            variants={pathAnimation}
            width="30"
            x="256"
            y="156"
          />

          {/* Pulsating circles */}
          <motion.circle
            className="fill-transparent stroke-red-400"
            custom={3}
            cx="256"
            cy="256"
            r="80"
            variants={pulseAnimation}
          />
          <motion.circle
            className="fill-transparent stroke-red-300"
            custom={4}
            cx="256"
            cy="256"
            r="100"
            variants={pulseAnimation}
          />
        </motion.svg>
      </div>
    </div>
  );
}
