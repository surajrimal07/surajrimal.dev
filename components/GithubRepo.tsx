import Link from 'next/link';

import { ExternalLink, Eye, GitFork, Github, Star } from 'lucide-react';

import type { GithubRepository } from '@/types/server';

interface GithubRepoProps {
  repo: GithubRepository;
  projectUrl?: string;
}

const GithubRepo = ({ repo, projectUrl }: GithubRepoProps) => {
  const mainLanguage = repo.languages.find(
    (language) => language.name !== 'CSS',
  );

  const hasProjectUrl = projectUrl && projectUrl !== repo.url;
  const isPublic = !repo.isPrivate;

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {mainLanguage && (
          <div className="flex items-center space-x-1.5">
            <span
              className="inline-block h-4 w-4 rounded-full"
              style={{ backgroundColor: mainLanguage.color }}
            />
            <span>{mainLanguage.name}</span>
          </div>
        )}
        <RepoMetric
          icon={<Star size={20} strokeWidth={1} />}
          value={repo.stargazerCount}
        />
        <RepoMetric
          icon={<GitFork size={20} strokeWidth={1} />}
          value={repo.forkCount}
        />
        <RepoMetric
          icon={<Eye size={20} strokeWidth={1} />}
          value={repo.watch}
        />
      </div>
      <div className="flex items-center space-x-2">
        {hasProjectUrl && (
          <Link
            className="flex items-center"
            data-umami-event="project-demo"
            href={projectUrl}
            rel="noreferrer"
            target="_blank"
          >
            <ExternalLink size={20} strokeWidth={1} />
          </Link>
        )}
        {hasProjectUrl && isPublic && (
          <span className="text-gray-400 dark:text-gray-500">|</span>
        )}
        {isPublic && (
          <Link
            className="flex items-center space-x-1"
            data-umami-event="project-repo"
            href={repo.url}
            rel="noreferrer"
            target="_blank"
          >
            <Github size={20} strokeWidth={1} />
          </Link>
        )}
      </div>
    </div>
  );
};

const RepoMetric = ({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: number;
}) => (
  <div className="flex items-center space-x-1.5">
    {icon}
    <span>{value}</span>
  </div>
);

export default GithubRepo;
