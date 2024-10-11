import { ExternalLink, Eye, GitFork, Github, Star } from 'lucide-react';

import type { GithubRepository } from '@/types/server';

interface GithubRepoProps {
  repo: GithubRepository;
  projectUrl?: string;
}

export default function GithubRepo({ repo, projectUrl }: GithubRepoProps) {
  const mainLanguage = repo.languages.find(
    (language) => language.name !== 'CSS'
  );

  const url = projectUrl || repo.url;

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
        <div className="flex items-center space-x-1.5">
          <Star size={20} strokeWidth={1} />
          <span>{repo.stargazerCount}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <GitFork size={20} strokeWidth={1} />
          <span>{repo.forkCount}</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <Eye size={20} strokeWidth={1} />
          <span>{repo.watch}</span>
        </div>
      </div>
      <div className="flex items-center space-x-2">
        {url && (
          <>
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className="flex items-center"
              data-umami-event="project-demo"
            >
              <ExternalLink size={20} strokeWidth={1} />
            </a>
            <span className="text-gray-400 dark:text-gray-500">|</span>
          </>
        )}
        <a
          href={repo.url}
          target="_blank"
          rel="noreferrer"
          className="flex items-center space-x-1"
          data-umami-event="project-repo"
        >
          <Github size={20} strokeWidth={1} />
        </a>
      </div>
    </div>
  );
}
