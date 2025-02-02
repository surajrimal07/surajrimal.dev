import Image from 'next/image';

import { type Authors, allAuthors } from 'contentlayer/generated';
import { coreContent } from 'pliny/utils/contentlayer';
import { FaRegStar, FaUserFriends, FaUserPlus } from 'react-icons/fa';
import {
  RiGitRepositoryLine,
  RiGitRepositoryPrivateLine,
} from 'react-icons/ri';

import IconsBundle from '@/components/icons';
import { LOGO_IMAGE_PATH } from '@/constants';
import siteMetadata from '@/data/siteMetadata';
import { useRepoData, useUserData } from '@/lib/github';
import type { GithubStats, LanguageStats } from '@/types/about';
import type { Repository, UserData } from '@/types/github';
import { timeAgo } from '@/utils/time';

export default async function ProfileCard() {
  const author = allAuthors.find((p) => p.slug === 'default') as Authors;
  const { name, occupation, company } = coreContent(author);

  let languages: string[] = [];
  let languagePercentages: LanguageStats = {};
  let githubStats: GithubStats = {
    totalStars: 0,
    privateRepos: 0,
    lastCommitDate: '',
  };
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const userData: UserData = await useUserData();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const repos: Repository[] = await useRepoData();

  const processRepoData = (repos: Repository[]) => {
    const privateRepos = repos.filter((repo) => repo.private).length;
    const lastCommit = repos.reduce(
      (acc, repo) => (repo.pushed_at > acc ? repo.pushed_at : acc),
      '',
    );
    const totalStars = repos.reduce(
      (total, repo) => total + (repo.stargazers_count || 0),
      0,
    );

    githubStats = {
      totalStars,
      privateRepos,
      lastCommitDate: timeAgo(new Date(lastCommit)),
    };

    const languageCount: { [key: string]: number } = {};
    for (const repo of repos) {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
      }
    }

    const totalRepos = repos.length;
    languagePercentages = Object.fromEntries(
      Object.entries(languageCount).map(([lang, count]) => [
        lang,
        `${((count / totalRepos) * 100).toFixed(2)}%`,
      ]),
    );

    languages = Object.keys(languagePercentages)
      .sort(
        (a, b) =>
          Number.parseFloat(languagePercentages[b]) -
          Number.parseFloat(languagePercentages[a]),
      )
      .slice(0, 6);
  };

  processRepoData(repos);

  const renderLanguages = () => (
    <div className="w-full">
      <h4 className="mb-2 font-semibold">Top Languages</h4>
      {languages.map((lang) => (
        <div key={lang} className="mb-2">
          <div className="flex justify-between">
            <span>{lang}</span>
            <span>{languagePercentages[lang]}</span>
          </div>
          <div className="h-2 w-full rounded-full bg-gray-200">
            <div
              className="h-2 rounded-full bg-red-500"
              style={{ width: languagePercentages[lang] }}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderGithubStats = () => (
    <>
      <h4 className="mb-2 w-full font-semibold">Github Stats</h4>
      <div className="flex w-full flex-wrap justify-between">
        <StatItem
          icon={<FaRegStar size={24} />}
          value={githubStats.totalStars}
        />
        <StatItem
          icon={<RiGitRepositoryLine size={24} />}
          value={userData?.public_repos || 0}
        />
        <StatItem
          icon={<RiGitRepositoryPrivateLine size={24} />}
          value={githubStats.privateRepos}
        />
        <StatItem
          icon={<FaUserFriends size={24} />}
          value={userData?.followers || 0}
        />
        <StatItem
          icon={<FaUserPlus size={24} />}
          value={userData?.following || 0}
        />
      </div>
      <h4 className="mb-2 w-full font-semibold">
        Last Commit: {githubStats.lastCommitDate}
      </h4>
    </>
  );

  return (
    <div className="mx-auto flex w-full max-w-full flex-col items-center space-y-4 rounded-lg border p-6 dark:border-gray-700 dark:bg-black sm:max-w-xs">
      <Image
        alt="avatar"
        className="h-48 w-48 rounded-full"
        height={192}
        src={LOGO_IMAGE_PATH}
        width={192}
      />
      <h3 className="text-center text-2xl font-bold leading-8 tracking-tight">
        {name}
      </h3>
      <p className="text-center font-bold">@surajrimal07</p>
      <div className="text-center text-gray-500 dark:text-gray-400">
        {occupation}
      </div>
      <div className="text-center text-gray-500 dark:text-gray-400">
        {company}
      </div>
      <div className="flex flex-wrap justify-center space-x-3">
        <IconsBundle href={`mailto:${siteMetadata.email}`} kind="mail" />
        <IconsBundle href={siteMetadata.github} kind="github" />
        <IconsBundle
          href={siteMetadata.socialAccounts.linkedin}
          kind="linkedin"
        />
        <IconsBundle href={siteMetadata.socialAccounts.twitter} kind="x" />
      </div>
      {userData && (
        <>
          {renderLanguages()}
          {renderGithubStats()}
        </>
      )}
    </div>
  );
}

const StatItem = ({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: number;
}) => (
  <div className="mb-4 flex flex-col items-center md:mb-0">
    {icon}
    <span className="font-bold">{value}</span>
  </div>
);
