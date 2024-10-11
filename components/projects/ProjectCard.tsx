'use client';

import { useEffect, useState } from 'react';

import GithubRepo from '@/components/GithubRepo';
import Image from '@/components/Image';
import Link from '@/components/Link';
import { Badge } from '@/components/ui/badge';
import { fetchGithubRepo } from '@/lib/github';
import type { ProjectCardProps } from '@/types/components';
import type { GithubRepository } from '@/types/server';

const ProjectCard = ({ project }: ProjectCardProps) => {
  const {
    title,
    description,
    imgSrc,
    isDarkBadgeNeeded,
    url,
    repo,
    builtWith,
    stack,
  } = project;

  const [repository, setRepository] = useState<GithubRepository | null>(null);

  useEffect(() => {
    const getRepoData = async () => {
      if (repo) {
        try {
          const data = await fetchGithubRepo(repo);
          setRepository(data);
        } catch (error) {
          console.error('Error fetching repository data:', error);
        }
      }
    };

    getRepoData();
  }, [repo]);

  return (
    <div className="md max-w-[544px] p-4 md:w-1/2">
      <div
        className={`${
          imgSrc && 'h-full'
        } flex h-full flex-col overflow-hidden rounded-lg border border-transparent shadow-nextjs dark:shadow-nextjs-dark`}
      >
        <div className="relative">
          <Image
            alt={title}
            src={imgSrc}
            className="object-cover object-center md:h-36 lg:h-60"
            width={1088}
            height={612}
          />
          {stack && (
            <div className="absolute right-2 top-2">
              <Badge variant={isDarkBadgeNeeded ? 'neutralDark' : 'neutral'}>
                {stack}
              </Badge>
            </div>
          )}
        </div>

        <div className="p-6">
          <h2 className="mb-3 text-2xl font-bold leading-8 tracking-tight">
            {url ? (
              <Link href={url} aria-label={`Link to ${title}`}>
                {title}
              </Link>
            ) : (
              title
            )}
          </h2>
          <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
            {repository?.description || description}
          </p>

          <div className="mb-3 flex flex-wrap space-x-1.5">
            <span className="shrink-0">Built with: </span>
            {builtWith?.map((tool, index) => {
              return (
                <span
                  key={index}
                  className="font-semibold text-gray-600 dark:text-gray-300"
                >
                  {tool}
                  {index !== builtWith.length - 1 && ','}
                </span>
              );
            })}
            .
          </div>
          {repository ? (
            <GithubRepo repo={repository} projectUrl={url} />
          ) : (
            url && (
              <Link
                href={url}
                className="text-base font-medium leading-6 text-primary hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Link to ${title}`}
              >
                Learn more &rarr;
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
