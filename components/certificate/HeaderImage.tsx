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
          animate="visible"
          className="hidden h-[350px] w-[350px] stroke-blue-500 opacity-70 dark:opacity-50 md:block"
          fill="none"
          initial="hidden"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          viewBox="0 0 800 600"
        >
          <title>Decorative SVG Header Image</title>
          <motion.path
            custom={0}
            d="M200 300 L600 300 C630 300 650 280 650 250 L650 150 C650 120 630 100 600 100 L200 100 C170 100 150 120 150 150 L150 250 C150 280 170 300 200 300 Z"
            variants={pathVariants}
          />

          <motion.path
            custom={1}
            d="M350 300 L450 300 L500 400 L400 350 L350 400 L300 350 L200 400 L250 300"
            variants={pathVariants}
          />

          <motion.path
            custom={2}
            d="M200 100 C180 100 150 120 150 150 C130 150 120 130 120 100 C120 70 140 50 170 50 C190 50 200 70 200 100"
            variants={pathVariants}
          />

          <motion.path
            custom={3}
            d="M600 100 C620 100 650 120 650 150 C670 150 680 130 680 100 C680 70 660 50 630 50 C610 50 600 70 600 100"
            variants={pathVariants}
          />

          <motion.path
            custom={4}
            d="M700 200 L710 220 L730 220 L715 235 L720 255 L700 245 L680 255 L685 235 L670 220 L690 220 Z"
            variants={pathVariants}
          />
          <motion.path
            custom={5}
            d="M100 200 L110 220 L130 220 L115 235 L120 255 L100 245 L80 255 L85 235 L70 220 L90 220 Z"
            variants={pathVariants}
          />
        </motion.svg>
      </div>
    </div>
  );
};

export default UsageHeaderImage;
