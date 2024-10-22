'use client';

import { motion } from 'framer-motion';

const UsageHeaderImage = () => {
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.3, duration: 1.5, ease: 'easeInOut' },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <div className="pointer-events-none fixed inset-0">
      <div className="absolute bottom-0 left-0 pl-1">
        <motion.svg
          viewBox="0 0 800 600"
          className="hidden h-[400px] w-[400px] stroke-purple-500 opacity-70 dark:opacity-50 md:block"
          fill="none"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial="hidden"
          animate="visible"
        >
          {/* Newspaper Background */}
          <motion.path
            variants={pathVariants}
            custom={0}
            d="M200 100 L600 100 L600 400 L200 400 Z"
          />

          {/* Headline Lines */}
          <motion.path
            variants={pathVariants}
            custom={1}
            d="M250 150 L550 150 M250 180 L450 180"
          />

          {/* Text Column Lines */}
          <motion.path
            variants={pathVariants}
            custom={2}
            d="M250 220 L550 220 M250 250 L550 250 M250 280 L550 280 M250 310 L550 310 M250 340 L550 340"
          />

          {/* Microphone */}
          <motion.path
            variants={pathVariants}
            custom={3}
            d="M650 250 C650 220 680 220 680 250 L680 300 C680 330 650 330 650 300 Z"
          />
          <motion.path
            variants={pathVariants}
            custom={4}
            d="M665 300 L665 350 M650 350 L680 350"
          />

          {/* Camera */}
          <motion.path
            variants={pathVariants}
            custom={5}
            d="M120 200 L180 200 L190 220 L220 220 L220 300 L120 300 Z"
          />
          <motion.path
            variants={pathVariants}
            custom={6}
            d="M140 240 A30 30 0 0 1 200 240 A30 30 0 0 1 140 240"
          />

          {/* Wi-Fi Waves */}
          <motion.path
            variants={pathVariants}
            custom={7}
            d="M300 50 A200 200 0 0 1 500 50"
          />
          <motion.path
            variants={pathVariants}
            custom={8}
            d="M350 30 A150 150 0 0 1 450 30"
          />
          <motion.path
            variants={pathVariants}
            custom={9}
            d="M380 10 A100 100 0 0 1 420 10"
          />

          {/* Pen */}
          <motion.path
            variants={pathVariants}
            custom={10}
            d="M650 120 L700 170 L690 180 L640 130 Z"
          />
          <motion.path
            variants={pathVariants}
            custom={11}
            d="M700 170 L720 150"
          />
        </motion.svg>
      </div>
    </div>
  );
};

export default UsageHeaderImage;
