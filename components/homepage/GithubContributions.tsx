'use client';

import { useEffect, useState } from 'react';

import GitHubCalendar from 'react-github-calendar';
import { TfiArrowTopRight } from 'react-icons/tfi';

import Link from '@/components/Link';
import Twemoji from '@/components/Twemoji';

const GithubContributions = () => {
  const [blockSize, setBlockSize] = useState(15);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setBlockSize(8);
      } else if (window.innerWidth < 768) {
        setBlockSize(10);
      } else {
        setBlockSize(15);
      }
    };

    // Initial size check
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full">
      <div className="w-full space-y-2 py-2 md:space-y-5">
        <h1 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-2xl md:text-3xl lg:text-4xl">
          Github Contributions <Twemoji name="keyboard" size="md" />
        </h1>
        <p className="!mt-2 text-base leading-7 text-gray-500 dark:text-gray-400 sm:text-lg">
          <span className="mr-1">
            My Github contributions calendar throughout the year, fetched from
          </span>
          <Link
            className="special-underline-new inline-flex items-center"
            href="https://github.com/surajrimal07"
          >
            Github <TfiArrowTopRight className="ml-1" />
          </Link>
          .
        </p>
      </div>
      <div className="overflow-x-auto pt-5">
        <div className="min-w-full">
          <GitHubCalendar
            blockSize={blockSize}
            fontSize={10}
            username="surajrimal07"
          />
        </div>
      </div>
    </div>
  );
};

export default GithubContributions;
