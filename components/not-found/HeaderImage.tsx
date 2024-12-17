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
          <title>Page Not Found Image</title>
          <motion.path
            variants={pathAnimation}
            custom={0}
            d="M128 192h256v64H128z"
            className="stroke-red-500"
          />
          <motion.path
            variants={pathAnimation}
            custom={1}
            d="M184 256h32v192h-32z"
            className="stroke-yellow-500"
          />
          <motion.path
            variants={pathAnimation}
            custom={2}
            d="M296 256h32v192h-32z"
            className="stroke-yellow-500"
          />
          <motion.path
            variants={pathAnimation}
            custom={3}
            d="M144 432h224v32H144z"
            className="stroke-blue-500"
          />

          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              variants={floatAnimation}
              custom={i + 4}
              cx={256 + (i - 1) * 32}
              cy="144"
              r="4"
              className="fill-indigo-500"
            />
          ))}

          <motion.text
            x="128"
            y="128"
            fontSize="48"
            fill="red"
            variants={floatAnimation}
            custom={6}
          >
            404
          </motion.text>
        </motion.svg>
      </div>
    </div>
  );
}
