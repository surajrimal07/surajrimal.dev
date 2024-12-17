'use client';

import clsx from 'clsx';
import { type Variants, motion } from 'framer-motion';

const animation: Variants = {
  hide: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { delay: 0.2 + i * 0.1, duration: 2, ease: 'easeInOut' },
      opacity: { duration: 0.5 },
    },
  }),
};

export default function HeaderImage() {
  return (
    <div className="pointer-events-none fixed inset-0">
      <div className="absolute bottom-0 left-0 pl-1">
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 631 620"
          fill="none"
          initial="hide"
          animate="show"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={clsx(
            'h-[350px] w-[350px] stroke-red-500 opacity-60 dark:opacity-40',
            'hidden md:block'
          )}
        >
          <title>Header Image Animation</title>
          <motion.rect
            x="254.558"
            y="1.41421"
            width="122"
            height="358"
            rx="61"
            transform="rotate(45 254.558 1.41421)"
            variants={animation}
            custom={1}
          />
          <motion.rect
            x="341.105"
            y="421.087"
            width="122"
            height="358"
            rx="61"
            transform="rotate(135 341.105 421.087)"
            variants={animation}
            custom={2}
          />
          <motion.rect
            y="1.41421"
            width="122"
            height="358"
            rx="61"
            transform="matrix(-0.707107 0.707107 0.707107 0.707107 374.96 111.414)"
            variants={animation}
            custom={3}
          />
          <motion.rect
            x="1.41421"
            y="-1.19209e-07"
            width="122"
            height="358"
            rx="61"
            transform="matrix(0.707107 0.707107 0.707107 -0.707107 288.414 531.087)"
            variants={animation}
            custom={4}
          />
        </motion.svg>
      </div>
    </div>
  );
}
