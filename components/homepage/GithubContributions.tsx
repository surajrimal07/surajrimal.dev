import GitHubCalendar from 'react-github-calendar';
import { TfiArrowTopRight } from 'react-icons/tfi';
import Link from '../Link';
import Twemoji from '../Twemoji';

const GithubContributions = () => {
  return (
    <>
      <div className="w-full space-y-2 py-2 md:space-y-5">
        <h1 className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 sm:text-3xl sm:leading-10 md:text-4xl md:leading-14 ">
          Github Contributions
          <Twemoji size="twa-sm" emoji="keyboard" />
        </h1>
        <p className="!mt-2 text-lg leading-7 text-gray-500 dark:text-gray-400 flex items-center">
          My Github contributions calendar throughout the year, fetched from&nbsp;
          <Link
            href={'https://github.com/surajrimal07'}
            className="text-primary hover:text-red-400 dark:hover:text-red-400 inline-flex items-center"
          >
            Github <TfiArrowTopRight />
          </Link>
          .
        </p>
      </div>
      <div className="pt-5">
        <GitHubCalendar blockSize={15} username="surajrimal07" />
      </div>
    </>
  );
};

export default GithubContributions;
