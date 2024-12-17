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

export default function PrivacyPolicyImage() {
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
          <title>Privacy Policy Illustration</title>
          <motion.path
            className="stroke-green-500"
            custom={0}
            d="M256 64c-39.76 0-72 32.24-72 72v32h-48v288h240V168h-48V136c0-39.76-32.24-72-72-72z"
            variants={pathAnimation}
          />
          <motion.path
            className="stroke-green-500"
            custom={1}
            d="M224 168v16h64v-16c0-22.09-17.91-40-40-40s-40 17.91-40 40z"
            variants={pathAnimation}
          />

          <motion.path
            className="stroke-blue-500"
            custom={2}
            d="M256 432l-72 72V288l72-72 72 72v216z"
            variants={pathAnimation}
          />
          <motion.path
            className="stroke-blue-500"
            custom={3}
            d="M184 504h144v-32H184z"
            variants={pathAnimation}
          />

          {[0, 1, 2].map((i) => (
            <motion.circle
              key={i}
              className="fill-indigo-500"
              custom={i + 4}
              cx={256 + (i - 1) * 32}
              cy="256"
              r="4"
              variants={floatAnimation}
            />
          ))}
        </motion.svg>
      </div>
    </div>
  );
}
