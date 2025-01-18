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
    y: [0, -10, 0],
    transition: {
      delay: i * 0.2,
      duration: 3,
      ease: 'easeInOut',
      repeat: Number.POSITIVE_INFINITY,
    },
  }),
};

export default function ChatHeaderImage() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <div className="absolute top-0 right-0 pr-1">
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
          <title>Chat Header Image</title>
          {/* Chat bubble */}
          <motion.path
            className="fill-none stroke-blue-600 dark:stroke-blue-400"
            custom={0}
            d="M100 150 Q80 190 80 220 Q80 300 140 340 Q140 370 120 400 Q160 380 200 360 Q340 360 400 300 Q460 240 400 180 Q340 120 200 120 Q140 120 100 150Z"
            variants={pathAnimation}
          />

          {/* Typing dots */}
          {[
            { cx: 220, cy: 230, r: 8 },
            { cx: 260, cy: 230, r: 8 },
            { cx: 300, cy: 230, r: 8 },
          ].map((dot, i) => (
            <motion.circle
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={i}
              className="fill-blue-500 dark:fill-blue-300"
              custom={i + 1}
              cx={dot.cx}
              cy={dot.cy}
              r={dot.r}
              variants={floatAnimation}
            />
          ))}

          {/* Floating elements */}
          {[
            { cx: 440, cy: 100, r: 10, color: 'fill-purple-500' },
            { cx: 460, cy: 160, r: 6, color: 'fill-pink-500' },
            { cx: 480, cy: 220, r: 8, color: 'fill-green-500' },
          ].map((circle, i) => (
            <motion.circle
              // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
              key={i}
              className={circle.color}
              custom={i + 4}
              cx={circle.cx}
              cy={circle.cy}
              r={circle.r}
              variants={floatAnimation}
            />
          ))}
        </motion.svg>
      </div>
    </div>
  );
}
