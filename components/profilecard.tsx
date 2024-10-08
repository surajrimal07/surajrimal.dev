import Image from 'next/image';

import { Authors, allAuthors } from 'contentlayer/generated';
import { coreContent } from 'pliny/utils/contentlayer';
import { FaRegStar, FaUserFriends, FaUserPlus } from 'react-icons/fa';
import {
  RiGitRepositoryLine,
  RiGitRepositoryPrivateLine,
} from 'react-icons/ri';

import siteMetadata from '@/data/siteMetadata';
import { useRepoData, useUserData } from '@/lib/github';
import { Repository, UserData } from '@/types/github';
import { timeAgo } from '@/utils/timeAgo';

import { LOGO_IMAGE_PATH } from '../constants';
import IconsBundle from './social-icons';

interface LanguageStats {
  [key: string]: string;
}

interface GithubStats {
  totalStars: number;
  privateRepos: number;
  lastCommitDate: string;
}

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
  const userData: UserData = await useUserData();
  const repos: Repository[] = await useRepoData();

  const processRepoData = (repos: Repository[]) => {
    const privateRepos = repos.filter((repo) => repo.private).length;
    const lastCommit = repos.reduce(
      (acc, repo) => (repo.pushed_at > acc ? repo.pushed_at : acc),
      ''
    );
    const totalStars = repos.reduce(
      (total, repo) => total + (repo.stargazers_count || 0),
      0
    );

    githubStats = {
      totalStars,
      privateRepos,
      //lastCommitDate: formatCommitDate(lastCommit),
      lastCommitDate: timeAgo(new Date(lastCommit)),
    };

    const languageCount: { [key: string]: number } = {};
    repos.forEach((repo) => {
      if (repo.language) {
        languageCount[repo.language] = (languageCount[repo.language] || 0) + 1;
      }
    });

    const totalRepos = repos.length;
    languagePercentages = Object.fromEntries(
      Object.entries(languageCount).map(([lang, count]) => [
        lang,
        `${((count / totalRepos) * 100).toFixed(2)}%`,
      ])
    );

    languages = Object.keys(languagePercentages)
      .sort(
        (a, b) =>
          parseFloat(languagePercentages[b]) -
          parseFloat(languagePercentages[a])
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
            ></div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderGithubStats = () => (
    <>
      <h4 className="mb-2 w-full font-semibold">Github Stats</h4>
      <div className="flex w-full justify-between">
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
    <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 dark:border-gray-700 dark:bg-black">
      <Image
        src={LOGO_IMAGE_PATH}
        alt="avatar"
        width={192}
        height={192}
        className="h-48 w-48 rounded-full"
      />
      <h3 className="text-2xl font-bold leading-8 tracking-tight">{name}</h3>
      <p className="font-bold">@surajrimal07</p>
      <div className="text-gray-500 dark:text-gray-400">{occupation}</div>
      <div className="text-gray-500 dark:text-gray-400">{company}</div>
      <div className="flex space-x-3">
        <IconsBundle kind="mail" href={`mailto:${siteMetadata.email}`} />
        <IconsBundle kind="github" href={siteMetadata.github} />
        <IconsBundle
          kind="linkedin"
          href={siteMetadata.socialAccounts.linkedin}
        />
        <IconsBundle kind="x" href={siteMetadata.socialAccounts.twitter} />
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
  <div className="flex flex-col items-center">
    {icon}
    <span className="font-bold">{value}</span>
  </div>
);
