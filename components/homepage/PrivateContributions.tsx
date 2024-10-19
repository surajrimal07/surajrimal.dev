/* eslint-disable @next/next/no-img-element */
import { TfiArrowTopRight } from 'react-icons/tfi';

import Link from '@/components/Link';
import Twemoji from '@/components/Twemoji';

const fetchSvg = async (): Promise<string> => {
  const res = await fetch(
    'https://wakapi.dev/api/activity/chart/surajrimal.svg'
  );
  return res.text();
};

const modifySvg = (svgString: string): string => {
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
};

const PrivateContributions = async () => {
  let svgData = '';
  try {
    const svgString = await fetchSvg();
    svgData = modifySvg(svgString);
  } catch (error) {
    console.error('Failed to fetch contribution data:', error);
    return <p>Failed to load contribution data. Please try again later.</p>;
  }

  const badgeUrls = [
    'https://wakapi.dev/api/badge/surajrimal/interval:today?label=Today',
    'https://wakapi.dev/api/badge/surajrimal/interval:week?label=Week',
    'https://wakapi.dev/api/badge/surajrimal/interval:30_days?label=Month',
    'https://wakapi.dev/api/badge/surajrimal/interval:last_12_months?label=Year',
    'https://wakapi.dev/api/badge/surajrimal/interval:all_time?label=All Time',
  ];

  const badges = badgeUrls.map((url, index) => (
    <img
      key={index}
      src={url}
      alt={url.split('?label=')[1] + ' contributions'}
      className="h-auto w-auto max-w-[80px] sm:max-w-none"
    />
  ));

  return (
    <>
      <div className="space-y-2 py-1 md:space-y-5">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14">
          Private Contributions {''}
          <Twemoji size="twa-sm" emoji="keyboard" />
        </h1>
        <p className="!mt-2 text-lg leading-7 text-gray-500 dark:text-gray-400">
          <span className="mr-1">
            My Private hours contributions calendar throughout the year, fetched
            from
          </span>
          <Link
            href={'https://wakapi.dev'}
            className="special-underline-new inline-flex items-center"
          >
            Wakapi <TfiArrowTopRight className="ml-1" />
          </Link>
          .
        </p>
      </div>
      <div className="pt-3">
        <div dangerouslySetInnerHTML={{ __html: svgData }} />
        <div className="mt-3 flex flex-wrap justify-center gap-2 sm:gap-4">
          {badges}
        </div>
      </div>
    </>
  );
};

export default PrivateContributions;
