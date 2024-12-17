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

export default function PageNotFoundImage() {
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
          <title>Page Not Found Image</title>
          <motion.path
            className="stroke-red-500"
            custom={0}
            d="M128 192h256v64H128z"
            variants={pathAnimation}
          />
          <motion.path
            className="stroke-yellow-500"
            custom={1}
            d="M184 256h32v192h-32z"
            variants={pathAnimation}
          />
          <motion.path
            className="stroke-yellow-500"
            custom={2}
            d="M296 256h32v192h-32z"
            variants={pathAnimation}
          />
          <motion.path
            className="stroke-blue-500"
            custom={3}
            d="M144 432h224v32H144z"
            variants={pathAnimation}
          />

          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              className="fill-indigo-500"
              custom={i + 4}
              cx={256 + (i - 1) * 32}
              cy="144"
              r="4"
              variants={floatAnimation}
            />
          ))}

          <motion.text
            custom={6}
            fill="red"
            fontSize="48"
            variants={floatAnimation}
            x="128"
            y="128"
          >
            404
          </motion.text>
        </motion.svg>
      </div>
    </div>
  );
}
