import { motion } from 'framer-motion';
import { LuLineChart } from 'react-icons/lu';

import siteMetadata from '@/data/siteMetadata';

import usePlaySound from '../lib/hooks/PlaySound';

const AnalyticsLink = () => {
  const { playSound } = usePlaySound({
    filePath: '/static/sounds/page-change.mp3',
    volume: 0.7,
  });

  const handleClick = () => {
    playSound();
    window.open(siteMetadata.analyticsURL, '_blank');
  };

  return (
    <div className="ml-1 cursor-pointer rounded-full bg-zinc-300 ring-zinc-400 transition-all hover:bg-zinc-300 hover:ring-1 dark:bg-zinc-700 dark:ring-white dark:hover:bg-zinc-800">
      <motion.button
        aria-label="Open analytics"
        type="button"
        className="flex h-8 w-8 items-center justify-center p-2"
        data-umami-event="nav-analytics"
        onClick={handleClick}
        whileTap={{
          scale: 0.7,
          rotate: 90,
          transition: { duration: 0.2 },
        }}
        whileHover={{ scale: 1.2 }}
        transition={{ duration: 0.2, ease: 'easeIn' }}
      >
        <LuLineChart className="h-4 w-4 text-current" />
        <span className="sr-only">{'Umami Analytics'}</span>
      </motion.button>
    </div>
  );
};

export default AnalyticsLink;
