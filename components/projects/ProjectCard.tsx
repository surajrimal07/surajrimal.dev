import GithubRepo from '@/components/GithubRepo';
import Image from '@/components/Image';
import Link from '@/components/Link';
import { Badge } from '@/components/ui/badge';
import { fetchGithubRepo } from '@/lib/github';
import type { ProjectCardProps } from '@/types/components';
import redis from '@/utils/redis';

async function ProjectCard({ project }: ProjectCardProps) {
  const {
    title,
    description,
    img_src,
    is_dark_badge_needed,
    url,
    repo,
    built_with,
    stack,
  } = project;

  const repository = repo ? await fetchGithubRepo(repo) : null;

  let enhancedDescription = description;
  if (title === 'Nepse Trade Helper Extension') {
    const loginCount =
      (await redis.get<number>('tmsextension:login:counter')) || 0;
    enhancedDescription = `${description} The extension has auto logged in more than ${loginCount} sessions.`;
  }

  return (
    <div className="md max-w-[544px] p-4 md:w-1/2">
      <div
        className={`${
          img_src && 'h-full'
        } flex h-full flex-col overflow-hidden rounded-lg border border-gray-600 shadow-nextjs hover:border-white dark:shadow-nextjs-dark`}
      >
        <div className="relative">
          <Image
            alt={title}
            className="object-cover object-center md:h-36 lg:h-60"
            height={612}
            src={img_src}
            width={1088}
          />
          {stack && (
            <div className="absolute right-2 top-2">
              <Badge variant={is_dark_badge_needed ? 'neutralDark' : 'neutral'}>
                {stack}
              </Badge>
            </div>
          )}
        </div>

        <div className="p-4">
          <h2 className="mb-2 text-2xl font-bold leading-8 tracking-tight">
            {title}
          </h2>
          <div className="mb-2 flex flex-wrap space-x-1.5">
            {built_with?.map((tool, index) => {
              return (
                <span
                  // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  key={index}
                  className="m-1 inline-flex items-center overflow-hidden rounded-md border border-gray-700 bg-gray-800 bg-opacity-50 px-3 py-1 text-sm font-medium text-white transition-all duration-200 ease-in-out hover:border-white"
                >
                  {tool.toUpperCase()}
                </span>
              );
            })}
          </div>
          <p className="prose mb-3 max-w-none text-gray-500 dark:text-gray-400">
            {enhancedDescription || repository?.description}
          </p>

          {repository && url ? (
            <GithubRepo projectUrl={url} repo={repository} />
          ) : (
            url && (
              <Link
                aria-label={`Link to ${title}`}
                className="text-base font-medium leading-6 text-primary hover:text-primary-600 dark:hover:text-primary-400"
                href={url}
              >
                Learn more &rarr;
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
