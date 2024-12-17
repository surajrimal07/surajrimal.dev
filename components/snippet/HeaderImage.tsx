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

export default function SnippetsHeaderImage() {
  return (
    <div className="pointer-events-none fixed inset-0">
      <div className="absolute bottom-0 left-0 pl-1">
        <motion.svg
          animate="show"
          className={clsx(
            'h-[350px] w-[350px] stroke-blue-500 opacity-60 dark:opacity-40',
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
          <title>Snippet Header Image</title>
          <motion.path
            custom={1}
            d="M128 32v448M384 32v448M96 64h320M96 448h320M224 128h64M224 192h64M224 256h64M224 320h64M224 384h64"
            variants={animation}
          />
          <motion.path
            custom={2}
            d="M96 160h64M352 160h64M96 224h64M352 224h64M96 288h64M352 288h64M96 352h64M352 352h64"
            variants={animation}
          />
        </motion.svg>
      </div>
    </div>
  );
}
