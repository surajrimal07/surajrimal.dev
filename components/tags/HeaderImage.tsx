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

export default function TagsHeaderImage() {
  return (
    <div className="pointer-events-none fixed inset-0">
      <div className="absolute bottom-0 left-0 pl-1">
        <motion.svg
          animate="show"
          className={clsx(
            'h-[350px] w-[350px] stroke-yellow-500 opacity-60 dark:opacity-40',
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
          <title>Animated SVG Icon</title>
          <motion.path
            custom={1}
            d="M64 32v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V160L288 32H64z"
            variants={animation}
          />
          <motion.path custom={2} d="M288 32v128h128" variants={animation} />
          <motion.path
            custom={3}
            d="M128 224h256M128 288h256M128 352h192"
            variants={animation}
          />
        </motion.svg>
      </div>
    </div>
  );
}
