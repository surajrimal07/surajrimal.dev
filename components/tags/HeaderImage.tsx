'use client';

import clsx from 'clsx';
import { Variants, motion } from 'framer-motion';

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
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          fill="none"
          initial="hide"
          animate="show"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className={clsx(
            'h-[400px] w-[400px] stroke-yellow-500 opacity-60',
            'dark:opacity-40'
          )}
        >
          <motion.path
            variants={animation}
            custom={1}
            d="M64 32v384c0 35.3 28.7 64 64 64h256c35.3 0 64-28.7 64-64V160L288 32H64z"
          />
          <motion.path variants={animation} custom={2} d="M288 32v128h128" />
          <motion.path
            variants={animation}
            custom={3}
            d="M128 224h256M128 288h256M128 352h192"
          />
        </motion.svg>
      </div>
    </div>
  );
}
