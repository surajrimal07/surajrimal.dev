'use client';

import siteMetadata from '@/data/siteMetadata';
import { motion } from 'framer-motion';
import { AlgoliaButton } from 'pliny/search/AlgoliaButton';
import { KBarButton } from 'pliny/search/KBarButton';
import { IoMdSearch } from 'react-icons/io';
import usePlaySound from './PlaySound';

const SearchButton = () => {
  if (siteMetadata.search && (siteMetadata.search.provider === 'algolia' || siteMetadata.search.provider === 'kbar')) {
    const SearchButtonWrapper = siteMetadata.search.provider === 'algolia' ? AlgoliaButton : KBarButton;

    const { playSound } = usePlaySound({
      filePath: '/static/sounds/open.mp3',
      volume: 0.7,
    });

    const handleClick = () => {
      playSound();
    };

    return (
      <SearchButtonWrapper aria-label="Search">
        <motion.div
          aria-label="Open analytics"
          className="rounded cursor-pointer"
          data-umami-event="nav-analytics"
          onClick={handleClick}
          whileTap={{
            scale: 0.7,
            rotate: 360,
            transition: { duration: 0.2 },
          }}
          whileHover={{ scale: 1.2 }}
        >
          <IoMdSearch className="h-6 w-6 text-current hover:text-red-500" />
          <span className="sr-only">{'Search Button'}</span>
        </motion.div>
      </SearchButtonWrapper>
    );
  }

  return null;
};

export default SearchButton;
