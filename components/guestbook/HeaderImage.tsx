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

const floatAnimation: Variants = {
  hide: { y: 0 },
  show: (i: number) => ({
    y: [0, -8, 0],
    transition: {
      delay: i * 0.2,
      duration: 3,
      ease: 'easeInOut',
      repeat: Number.POSITIVE_INFINITY,
    },
  }),
};

export default function GuestbookHeaderImage() {
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
            'h-[350px] w-[350px] opacity-60 dark:opacity-40',
            'hidden md:block'
          )}
        >
          <title>Guestbook Header Image</title>
          {/* Book base */}
          <motion.path
            variants={pathAnimation}
            custom={0}
            d="M100 150 L412 150 L412 400 L100 400 C80 400 60 380 60 360 L60 190 C60 170 80 150 100 150Z"
            className="fill-none stroke-gray-600 dark:stroke-gray-400"
          />

          {/* Book pages */}
          <motion.path
            variants={pathAnimation}
            custom={1}
            d="M120 170 L392 170 L392 380 L120 380 Z"
            className="fill-none stroke-gray-400 dark:stroke-gray-500"
          />

          {/* Writing lines */}
          <motion.g className="stroke-gray-500 dark:stroke-gray-400">
            <motion.path
              variants={pathAnimation}
              custom={2}
              d="M140 220 L372 220"
            />
            <motion.path
              variants={pathAnimation}
              custom={2.2}
              d="M140 260 L372 260"
            />
            <motion.path
              variants={pathAnimation}
              custom={2.4}
              d="M140 300 L372 300"
            />
            <motion.path
              variants={pathAnimation}
              custom={2.6}
              d="M140 340 L272 340"
            />
          </motion.g>

          {/* Floating elements */}
          {[
            { cx: 440, cy: 160, r: 8, color: 'fill-purple-500' },
            { cx: 460, cy: 200, r: 6, color: 'fill-pink-500' },
            { cx: 480, cy: 240, r: 7, color: 'fill-green-500' },
          ].map((circle, i) => (
            <motion.circle
              key={i}
              variants={floatAnimation}
              custom={i + 4}
              cx={circle.cx}
              cy={circle.cy}
              r={circle.r}
              className={circle.color}
            />
          ))}
        </motion.svg>
      </div>
    </div>
  );
}
