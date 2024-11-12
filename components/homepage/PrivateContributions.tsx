import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';

import { TfiArrowTopRight } from 'react-icons/tfi';

import { LoadingSpinner } from '../ui/loadingSpinner';

// Fetch SVG data with caching
async function fetchSvg() {
  const res = await fetch(
    'https://wakapi.dev/api/activity/chart/surajrimal.svg',
    {
      next: {
        revalidate: 7200,
      },
    }
  );
  return res.text();
}

// Fetch badge data with caching and convert to base64
async function fetchBadges() {
  const badgeUrls = [
    'https://wakapi.dev/api/badge/surajrimal/interval:today?label=Today',
    'https://wakapi.dev/api/badge/surajrimal/interval:week?label=Week',
    'https://wakapi.dev/api/badge/surajrimal/interval:30_days?label=Month',
    'https://wakapi.dev/api/badge/surajrimal/interval:last_12_months?label=Year',
    'https://wakapi.dev/api/badge/surajrimal/interval:all_time?label=All Time',
  ];

  const badgeData = await Promise.all(
    badgeUrls.map(async (url) => {
      const res = await fetch(url, {
        next: {
          revalidate: 7200,
        },
      });
      const svg = await res.text();
      const base64 = Buffer.from(svg).toString('base64');
      const dataUrl = `data:image/svg+xml;base64,${base64}`;
      return {
        dataUrl,
        label: url.split('?label=')[1],
      };
    })
  );
  return badgeData;
}

// Modify SVG
function modifySvg(svgString: string): string {
  if (!svgString) return '';

  return svgString
    .replace(/<image[^>]+xlink:href="[^"]*logo-gh\.svg"[^>]*>/, '')
    .replace(/(<style[^>]*>[\s\S]*?<\/style>)/, (styleBlock) => {
      return styleBlock.replace(/text\s?{([^}]*)}/, (textMatch, properties) => {
        return `text {${properties.replace(/fill:\s?#([A-Fa-f0-9]{6})/, 'fill: #FFFFFF')}}`;
      });
    })
    .replace(/fill:\s?#([A-Fa-f0-9]{6})/g, (match, color) => {
      return `fill: ${color === 'DCE3E1' ? '#171b21' : `#${color}`}`;
    })
    .replace(
      /<svg /,
      '<svg viewBox="0 0 1219 186" width="100%" height="100%" '
    );
}

async function ContributionContent() {
  const [svgString, badgeData] = await Promise.all([fetchSvg(), fetchBadges()]);

  if (!svgString) {
    throw new Error('Failed to load contribution data');
  }

  const modifiedSvg = modifySvg(svgString);

  return (
    <div className="pt-3">
      <div dangerouslySetInnerHTML={{ __html: modifiedSvg }} />
      <div className="mt-3 flex flex-wrap justify-center gap-2 sm:gap-4">
        {badgeData?.length > 0 && (
          <div className="mt-3 flex flex-wrap justify-center gap-2 sm:gap-4">
            {badgeData.map((badge, index) => (
              <Image
                key={index}
                src={badge.dataUrl}
                alt={`${badge.label} contributions`}
                width={150}
                height={30}
                unoptimized
                className="h-auto w-auto max-w-[80px] sm:max-w-none"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PrivateContributions() {
  return (
    <>
      <div className="space-y-2 py-1 md:space-y-5">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          Private Contributions
          <span role="img" aria-label="keyboard" className="ml-2">
            ⌨️
          </span>
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
      <Suspense
        fallback={
          <div className="flex min-h-[300px] items-center justify-center rounded-lg border border-dashed border-gray-300 dark:border-gray-800">
            <LoadingSpinner />
          </div>
        }
      >
        <ContributionContent />
      </Suspense>
    </>
  );
}
