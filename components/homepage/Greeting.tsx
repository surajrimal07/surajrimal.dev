'use client';

import { motion } from 'framer-motion';

import { HeroHighlight, Highlight } from '@/components/ui/hero-highlight';

import Twemoji from '../Twemoji';

const Greeting = () => {
  return (
    <HeroHighlight>
      <motion.h1
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: [20, -5, 0],
        }}
        transition={{
          duration: 0.5,
          ease: [0.4, 0.0, 0.2, 1],
        }}
        className="mb-0 mt-0 text-center text-4xl font-bold leading-relaxed text-neutral-700 dark:text-white md:text-4xl lg:text-5xl lg:leading-snug"
      >
        <Twemoji size={'xl'} name="wave" className="mr-1" /> Hey there! Discover
        about me and my{' '}
        <Highlight className="text-black dark:text-white">
          creative ideas.
        </Highlight>
      </motion.h1>
    </HeroHighlight>
  );
};

export default Greeting;
