'use client';

import { memo } from 'react';

import { motion } from 'framer-motion';
import { AlgoliaButton } from 'pliny/search/AlgoliaButton';
import { KBarButton } from 'pliny/search/KBarButton';
import 'pliny/search/algolia.css';
import { FiCommand } from 'react-icons/fi';

import siteMetadata from '@/data/siteMetadata';
import usePlaySound from '@/lib/hooks/PlaySound';
import { useSoundStore } from '@/lib/store/soundStore';

const SearchButton = memo(() => {
  const { isSoundEnabled } = useSoundStore();

  const { playSound } = usePlaySound({
    filePath: '/static/sounds/page-change.mp3',
    volume: 0.7,
  });

  const handleClick = () => {
    if (isSoundEnabled) playSound();
  };

  if (
    siteMetadata.search &&
    (siteMetadata.search.provider === 'algolia' ||
      siteMetadata.search.provider === 'kbar')
  ) {
    const SearchButtonWrapper =
      siteMetadata.search.provider === 'algolia' ? AlgoliaButton : KBarButton;

    return (
      <SearchButtonWrapper aria-label="Search">
        <div className="ml-2 cursor-pointer rounded-full bg-zinc-300 ring-zinc-400 transition-all hover:bg-zinc-300 hover:ring-1 dark:bg-zinc-700 dark:ring-white dark:hover:bg-zinc-800">
          <motion.div
            aria-label="Open analytics"
            className="flex h-8 w-8 items-center justify-center p-2"
            data-umami-event="nav-analytics"
            transition={{ duration: 0.2, ease: 'easeIn' }}
            whileHover={{ scale: 1.1 }}
            whileTap={{
              scale: 0.7,
              rotate: 360,
              transition: { duration: 0.2 },
            }}
            onClick={handleClick}
          >
            <FiCommand className="h-6 w-6 text-current" />
            <span className="sr-only">Search Button</span>
          </motion.div>
        </div>
      </SearchButtonWrapper>
    );
  }

  return null;
});

SearchButton.displayName = 'SearchButton';

export default SearchButton;
