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
          <title>Availability Image</title>
          <motion.rect
            className="stroke-blue-500"
            custom={0}
            height="384"
            rx="20"
            variants={pathAnimation}
            width="288"
            x="112"
            y="64"
          />
          <motion.line
            className="stroke-blue-500"
            custom={1}
            variants={pathAnimation}
            x1="112"
            x2="400"
            y1="128"
            y2="128"
          />

          <motion.rect
            className="fill-yellow-400"
            custom={2}
            height="24"
            variants={pathAnimation}
            width="256"
            x="128"
            y="200"
          />
          <motion.rect
            className="fill-yellow-400"
            custom={3}
            height="24"
            variants={pathAnimation}
            width="180"
            x="128"
            y="240"
          />
          <motion.rect
            className="fill-yellow-400"
            custom={4}
            height="24"
            variants={pathAnimation}
            width="220"
            x="128"
            y="280"
          />

          <motion.g custom={0} variants={floatAnimation}>
            <motion.circle className="fill-gray-600" cx="400" cy="350" r="30" />
            <motion.path
              className="stroke-white"
              d="M400 320v60M370 350h60M385 335l30 30"
            />
          </motion.g>

          <motion.g custom={1} variants={floatAnimation}>
            <motion.circle className="fill-gray-600" cx="360" cy="250" r="20" />
            <motion.path
              className="stroke-white"
              d="M360 235v30M350 250h20M355 245l10 10"
            />
          </motion.g>

          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              className="fill-indigo-500"
              custom={i + 2}
              cx={120 + i * 60}
              cy="460"
              r="6"
              variants={floatAnimation}
            />
          ))}
        </motion.svg>
      </div>
    </div>
  );
}
