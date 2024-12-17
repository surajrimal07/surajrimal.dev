import Image from 'next/image';
import Link from 'next/link';

import { TfiArrowTopRight } from 'react-icons/tfi';

import Twemoji from '@/components/Twemoji';

// biome-ignore lint/style/noNonNullAssertion: <explanation>
const BUCKET_NAME = process.env.SUPABASE_BUCKET!;
// biome-ignore lint/style/noNonNullAssertion: <explanation>
const BUCKET_URL = process.env.SUPABASE_NORMAL_BUCKET_URL!;

const BADGES = [
  {
    path: `${BUCKET_URL}${BUCKET_NAME}/today.png`,
    label: 'Today',
  },
  {
    path: `${BUCKET_URL}${BUCKET_NAME}/week.png`,
    label: 'Week',
  },
  {
    path: `${BUCKET_URL}${BUCKET_NAME}/30_days.png`,
    label: 'Month',
  },
  {
    path: `${BUCKET_URL}${BUCKET_NAME}/last_12_months.png`,
    label: 'Year',
  },
  {
    path: `${BUCKET_URL}${BUCKET_NAME}/all_time.png`,
    label: 'All Time',
  },
] as const;

export default function PrivateContributions() {
  return (
    <>
      <div className="space-y-2 py-1 md:space-y-5">
        <h1 className="text-xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-2xl md:text-3xl lg:text-4xl">
          Private Contributions <Twemoji name="keyboard" size="md" />
        </h1>
        <p className="!mt-2 text-lg leading-7 text-gray-500 dark:text-gray-400">
          <span className="mr-1">
            My Private hours contributions calendar throughout the year, fetched
            from
          </span>
          <Link
            className="special-underline-new inline-flex items-center"
            href="https://wakapi.dev"
          >
            Wakapi <TfiArrowTopRight className="ml-1" />
          </Link>
          .
        </p>
      </div>
      <div className="pt-3">
        <div className="max-w-full overflow-hidden">
          <Image
            alt="Contribution graph"
            className="h-full w-full"
            height={186}
            src={`${BUCKET_URL}${BUCKET_NAME}/contributions.png`}
            width={1219}
          />
        </div>
        <div className="mt-0 flex flex-wrap justify-center sm:gap-2">
          {BADGES.map((badge) => (
            <Image
              key={badge.label}
              alt={`${badge.label} contributions`}
              className="h-auto w-auto max-w-[80px] sm:max-w-none"
              height={30}
              src={badge.path}
              width={150}
            />
          ))}
        </div>
      </div>
    </>
  );
}
