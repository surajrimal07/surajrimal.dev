/* eslint-disable @next/next/no-img-element */
import { TfiArrowTopRight } from 'react-icons/tfi';
import Link from '../Link';
import Twemoji from '../Twemoji';

const fetchSvg = async (): Promise<string> => {
  const res = await fetch('https://wakapi.dev/api/activity/chart/surajrimal.svg');
  return res.text();
};

const modifySvg = (svgString: string): string => {
  if (!svgString) return '';

  svgString = svgString.replace(/<image[^>]+xlink:href="[^"]*logo-gh\.svg"[^>]*>/, '');

  svgString = svgString.replace(/(<style[^>]*>[\s\S]*?<\/style>)/, (styleBlock) =>
    styleBlock.replace(
      /text\s?{([^}]*)}/,
      (textMatch, properties) => `text {${properties.replace(/fill:\s?#([A-Fa-f0-9]{6})/, 'fill: #FFFFFF')}}`
    )
  );

  svgString = svgString.replace(
    /fill:\s?#([A-Fa-f0-9]{6})/g,
    (match, color) => `fill: ${color === 'DCE3E1' ? '#171b21' : `#${color}`}`
  );

  return svgString.replace(/<svg /, '<svg viewBox="0 0 1219 186" width="100%" height="100%" ');
};

const PrivateContributions = async () => {
  let svgData = '';
  try {
    const svgString = await fetchSvg();
    svgData = modifySvg(svgString);
  } catch (error) {
    return <p>Failed to load contribution data. Please try again later.</p>;
  }

  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 py-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Private Contributions
          <Twemoji size="twa-sm" emoji="keyboard" />
        </h1>
        <p className="!mt-2 text-lg leading-7 text-gray-500 dark:text-gray-400 flex items-center">
          My Private hours contributions calendar throughout the year, fetched from&nbsp;
          <Link
            href={'https://wakapi.dev'}
            className="text-primary hover:text-red-400 dark:hover:text-red-400 inline-flex items-center"
          >
            Wakapi <TfiArrowTopRight className="ml-1" />
          </Link>
          .
        </p>
      </div>

      <div className="pt-5">
        <div dangerouslySetInnerHTML={{ __html: svgData }} />
        <div className="flex space-x-4 mt-5 justify-center">
          <img
            src="https://wakapi.dev/api/badge/surajrimal/interval:today?label=Today"
            alt="Today contributions"
            className="h-6 w-15"
          />
          <img
            src="https://wakapi.dev/api/badge/surajrimal/interval:week?label=Week"
            alt="This week contributions"
            className="h-6 w-15"
          />
          <img
            src="https://wakapi.dev/api/badge/surajrimal/interval:30_days?label=Month"
            alt="Last 30 days contributions"
            className="h-6 w-15"
          />

          <img
            src="https://wakapi.dev/api/badge/surajrimal/interval:last_12_months?label=Year"
            alt="Year contributions"
            className="h-6 w-15"
          />
          <img
            src="https://wakapi.dev/api/badge/surajrimal/interval:all_time?label=All Time"
            alt="All contributions"
            className="h-6 w-15"
          />
        </div>
      </div>
    </div>
  );
};

export default PrivateContributions;
