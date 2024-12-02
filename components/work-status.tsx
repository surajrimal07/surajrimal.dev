import Link from 'next/link';
import { memo, useEffect, useMemo } from 'react';

import { useAvailabilityStore } from '@/lib/hooks/availablityState';

import { HoverBorderGradient } from './ui/shimmer-button';
import Tooltip from './ui/tooltip';

interface OpenToWorkBadgeProps {
  headerTitle: string;
}

const OpenToWorkBadge = memo(function OpenToWorkBadge({
  headerTitle,
}: OpenToWorkBadgeProps) {
  const { availabilityData, fetchAvailabilityData } = useAvailabilityStore();

  useEffect(() => {
    if (!availabilityData) {
      fetchAvailabilityData();
    }
  }, [availabilityData, fetchAvailabilityData]);

  const memoizedBadge = useMemo(
    () => (
      <Link
        href="/available"
        aria-label={headerTitle}
        className="flex items-center"
      >
        <div className="m-0 mt-0 hidden justify-center p-0.5 text-center md:block">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="flex items-center space-x-2 bg-white text-black dark:bg-gray-600/70 dark:text-white"
          >
            <span className="text-xs">Open to work</span>
          </HoverBorderGradient>
        </div>

        <Tooltip content="Open to work">
          <span className="m-0 mt-1 block h-2 w-2 animate-pulse rounded-full bg-green-400 duration-1000 md:hidden" />
        </Tooltip>
      </Link>
    ),
    [headerTitle]
  );

  return memoizedBadge;
});

export default OpenToWorkBadge;
