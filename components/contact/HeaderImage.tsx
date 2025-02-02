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

export default function ContactHeaderImage() {
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
          <title>Contact Header Image</title>
          <motion.circle
            className="fill-teal-500 stroke-teal-600"
            custom={0}
            cx="256"
            cy="256"
            r="48"
            variants={pulseAnimation}
          />

          {/* Email envelope */}
          <motion.path
            className="stroke-blue-500"
            custom={1}
            d="M96 128h128l64 64 64-64h64v256H96V128z"
            variants={pathAnimation}
          />
          <motion.path
            className="stroke-blue-500"
            custom={2}
            d="M96 128l160 128 160-128M96 384l128-96M416 384l-128-96"
            variants={pathAnimation}
          />

          {/* Social media icons */}
          <motion.g custom={0} variants={floatAnimation}>
            <motion.circle
              className="fill-purple-500 stroke-purple-600"
              custom={1}
              cx="128"
              cy="192"
              r="24"
              variants={pulseAnimation}
            />
            <motion.path
              className="stroke-white"
              custom={3}
              d="M116 192h24M128 180v24"
              variants={pathAnimation}
            />
          </motion.g>

          <motion.g custom={1} variants={floatAnimation}>
            <motion.circle
              className="fill-red-500 stroke-red-600"
              custom={2}
              cx="384"
              cy="192"
              r="24"
              variants={pulseAnimation}
            />
            <motion.path
              className="stroke-white"
              custom={4}
              d="M372 192h24"
              variants={pathAnimation}
            />
          </motion.g>

          {/* Message bubbles */}
          <motion.g custom={2} variants={floatAnimation}>
            <motion.path
              className="fill-green-500 stroke-green-600"
              custom={3}
              d="M128 352h96v48l24-48h32v-64H128v64z"
              variants={pulseAnimation}
            />
          </motion.g>

          <motion.g custom={3} variants={floatAnimation}>
            <motion.path
              className="fill-amber-500 stroke-amber-600"
              custom={4}
              d="M384 352h-96v48l-24-48h-32v-64h152v64z"
              variants={pulseAnimation}
            />
          </motion.g>

          {/* Connecting lines */}
          <motion.path
            className="stroke-gray-400"
            custom={5}
            d="M256 208v-80M184 256h-80M328 256h80"
            variants={pathAnimation}
          />

          {/* Floating dots */}
          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              className="fill-indigo-500"
              custom={i + 4}
              cx={176 + i * 32}
              cy="128"
              r="4"
              variants={floatAnimation}
            />
          ))}
        </motion.svg>
      </div>
    </div>
  );
}
