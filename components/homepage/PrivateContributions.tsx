import Image from 'next/image';
import Link from 'next/link';

import { TfiArrowTopRight } from 'react-icons/tfi';

import Twemoji from '@/components/Twemoji';

const BADGES = [
  { path: '/contributions/badges/today.svg', label: 'Today' },
  { path: '/contributions/badges/week.svg', label: 'Week' },
  { path: '/contributions/badges/30_days.svg', label: 'Month' },
  { path: '/contributions/badges/last_12_months.svg', label: 'Year' },
  { path: '/contributions/badges/all_time.svg', label: 'All Time' },
] as const;

export default function PrivateContributions() {
  return (
    <>
      <div className="space-y-2 py-1 md:space-y-5">
        <h1 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-2xl md:text-3xl lg:text-4xl">
          Private Contributions <Twemoji size="md" name="keyboard" />
        </h1>
        <p className="!mt-2 text-lg leading-7 text-gray-500 dark:text-gray-400">
          <span className="mr-1">
            My Private hours contributions calendar throughout the year, fetched
            from
          </span>
          <Link
            href="https://wakapi.dev"
            className="special-underline-new inline-flex items-center"
          >
            Wakapi <TfiArrowTopRight className="ml-1" />
          </Link>
          .
        </p>
      </div>
      <div className="pt-3">
        <div className="max-w-full overflow-hidden">
          <Image
            src="/contributions/graph/contributions.png"
            alt="Contribution graph"
            width={1219}
            height={186}
            className="h-full w-full"
            unoptimized={true}
          />
        </div>
        <div className="mt-3 flex flex-wrap justify-center gap-2 sm:gap-4">
          {BADGES.map((badge) => (
            <Image
              key={badge.label}
              src={badge.path}
              alt={`${badge.label} contributions`}
              unoptimized={true}
              width={150}
              height={30}
              className="h-auto w-auto max-w-[80px] sm:max-w-none"
            />
          ))}
        </div>
      </div>
    </>
  );
}
