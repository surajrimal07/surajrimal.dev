'use client';

import clsx from 'clsx';
import { type Variants, motion } from 'framer-motion';

const pathAnimation: Variants = {
  hide: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: 0.2 + i * 0.2, duration: 2, ease: 'easeInOut' },
      opacity: { duration: 0.5 },
    },
  }),
};

const circleAnimation: Variants = {
  hide: { scale: 0, opacity: 0 },
  show: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: {
      delay: 0.5 + i * 0.2,
      duration: 0.5,
      type: 'spring',
      stiffness: 100,
    },
  }),
};

const symbolAnimation: Variants = {
  hide: { scale: 0, opacity: 0, rotate: -45 },
  show: (i: number) => ({
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: {
      delay: 0.7 + i * 0.2,
      duration: 0.5,
      type: 'spring',
      stiffness: 100,
    },
  }),
};

export default function JourneyHeaderImage() {
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
          <title>Journey Header Image</title>
          <motion.path
            className="stroke-rose-500"
            custom={1}
            d="M96 96c0 0 64 32 160 32s160-32 160-32v320c0 0-64-32-160-32s-160 32-160 32V96"
            variants={pathAnimation}
          />

          <motion.circle
            className="fill-amber-500 stroke-amber-600"
            custom={1}
            cx="96"
            cy="96"
            r="16"
            variants={circleAnimation}
          />
          <motion.circle
            className="fill-green-500 stroke-green-600"
            custom={2}
            cx="96"
            cy="208"
            r="16"
            variants={circleAnimation}
          />
          <motion.circle
            className="fill-blue-500 stroke-blue-600"
            custom={3}
            cx="96"
            cy="320"
            r="16"
            variants={circleAnimation}
          />
          <motion.circle
            className="fill-purple-500 stroke-purple-600"
            custom={4}
            cx="96"
            cy="416"
            r="16"
            variants={circleAnimation}
          />

          <motion.path
            className="stroke-amber-500"
            custom={1}
            d="M384 96l-32-16-32 16 32 16z"
            variants={symbolAnimation}
          />

          <motion.path
            className="stroke-green-500"
            custom={2}
            d="M352 192h64m-32 32v-64"
            variants={symbolAnimation}
          />

          <motion.path
            className="stroke-blue-500"
            custom={3}
            d="M352 304l32 32 32-32-32-32z"
            variants={symbolAnimation}
          />

          <motion.path
            className="stroke-purple-500"
            custom={4}
            d="M384 416l-16-32 16-16 16 16z"
            variants={symbolAnimation}
          />

          <motion.path
            className="stroke-gray-400"
            custom={5}
            d="M112 96h240M112 208h240M112 320h240M112 416h240"
            variants={pathAnimation}
          />
        </motion.svg>
      </div>
    </div>
  );
}
