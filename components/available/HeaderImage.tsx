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
      duration: 2,
      ease: 'easeInOut',
      repeat: Number.POSITIVE_INFINITY,
    },
  }),
};

export default function AvailabilityImage() {
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
          <title>Availability Image</title>
          <motion.rect
            variants={pathAnimation}
            custom={0}
            x="112"
            y="64"
            width="288"
            height="384"
            rx="20"
            className="stroke-blue-500"
          />
          <motion.line
            variants={pathAnimation}
            custom={1}
            x1="112"
            y1="128"
            x2="400"
            y2="128"
            className="stroke-blue-500"
          />

          <motion.rect
            variants={pathAnimation}
            custom={2}
            x="128"
            y="200"
            width="256"
            height="24"
            className="fill-yellow-400"
          />
          <motion.rect
            variants={pathAnimation}
            custom={3}
            x="128"
            y="240"
            width="180"
            height="24"
            className="fill-yellow-400"
          />
          <motion.rect
            variants={pathAnimation}
            custom={4}
            x="128"
            y="280"
            width="220"
            height="24"
            className="fill-yellow-400"
          />

          <motion.g variants={floatAnimation} custom={0}>
            <motion.circle cx="400" cy="350" r="30" className="fill-gray-600" />
            <motion.path
              d="M400 320v60M370 350h60M385 335l30 30"
              className="stroke-white"
            />
          </motion.g>

          <motion.g variants={floatAnimation} custom={1}>
            <motion.circle cx="360" cy="250" r="20" className="fill-gray-600" />
            <motion.path
              d="M360 235v30M350 250h20M355 245l10 10"
              className="stroke-white"
            />
          </motion.g>

          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              variants={floatAnimation}
              custom={i + 2}
              cx={120 + i * 60}
              cy="460"
              r="6"
              className="fill-indigo-500"
            />
          ))}
        </motion.svg>
      </div>
    </div>
  );
}
