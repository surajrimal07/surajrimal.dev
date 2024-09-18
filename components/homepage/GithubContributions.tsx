import GitHubCalendar from 'react-github-calendar';
import Twemoji from '../Twemoji';

const GithubContributions = () => {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 py-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
          Github Contributions
          <Twemoji size="twa-sm" emoji="keyboard" />
        </h1>
        <p className="!mt-2 text-lg leading-7 text-gray-500 dark:text-gray-400">
          My Github contributions calendar throughout the year.
        </p>
      </div>
      <div className="pt-5">
        <GitHubCalendar blockSize={15} username="surajrimal07" />
      </div>
    </div>
  );
};

export default GithubContributions;
