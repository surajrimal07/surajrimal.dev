import siteMetadata from '@/data/siteMetadata';
import { motion } from 'framer-motion';
import { LuLineChart } from 'react-icons/lu';
import usePlaySound from './PlaySound';

const AnalyticsLink = () => {
  const { playSound } = usePlaySound({
    filePath: '/static/sounds/open.mp3',
    volume: 0.7,
  });

  const handleClick = () => {
    playSound();
    window.open(siteMetadata.analyticsURL, '_blank');
  };

  return (
    <div>
      <motion.button
        aria-label="Open analytics"
        type="button"
        className="rounded"
        data-umami-event="nav-analytics"
        onClick={handleClick}
        whileTap={{
          scale: 0.7,
          rotate: 360,
          transition: { duration: 0.2 },
        }}
        whileHover={{ scale: 1.2 }}
      >
        <LuLineChart className="h-6 w-6 text-current hover:text-red-500" />
        <span className="sr-only">{'Umami Analytics'}</span>
      </motion.button>
    </div>
  );
};

export default AnalyticsLink;
