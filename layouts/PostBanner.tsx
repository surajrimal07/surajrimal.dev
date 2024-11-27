import { headers } from 'next/headers';

import Bleed from 'pliny/ui/Bleed';

import Image from '@/components/Image';
import Link from '@/components/Link';
import PageTitle from '@/components/PageTitle';
import ScrollTopAndComment from '@/components/ScrollTopAndComment';
import SectionContainer from '@/components/SectionContainer';
import WalineComment from '@/components/WalineComment';
import Reactions from '@/components/blog/PageReactions';
import { BlogPostProps } from '@/types/bloglist';

export default async function PostMinimal({
  content,
  next,
  prev,
  children,
}: BlogPostProps) {
  const { title, images, slug } = content;
  const headersList = await headers();
  const ip = headersList.get('x-forwarded-for') || '121.0.0.1';
  const slugNormalized = `blog/${slug}`;

  const displayImage =
    images && images.length > 0
      ? images[0]
      : 'https://picsum.photos/seed/picsum/800/400';

  return (
    <SectionContainer>
      <ScrollTopAndComment />
      <article>
        <div>
          <div className="space-y-1 pb-10 text-center dark:border-gray-700">
            <div className="w-full">
              <Bleed>
                <div className="relative aspect-[2/1] w-full">
                  <Image
                    src={displayImage}
                    alt={title}
                    fill
                    className="object-cover"
                  />
                </div>
              </Bleed>
            </div>
            <div className="relative pt-10">
              <PageTitle>{title}</PageTitle>
            </div>
          </div>
          <div className="prose max-w-none py-4 dark:prose-invert">
            {children}
          </div>
          <div className="sticky bottom-4 z-10 mb-2 w-full max-w-md transform border-none outline-none lg:sticky lg:bottom-4 lg:left-1/2 lg:w-auto lg:-translate-x-1/2">
            <Reactions slug={slugNormalized} ip={ip} />
          </div>

          <div
            className="max-w-full pb-4 pt-2 text-center text-gray-700 dark:text-gray-300"
            id="comment"
          >
            <WalineComment
              serverURL={process.env.NEXT_PUBLIC_COMMENT_SERVER_URL!}
            />
          </div>
          <footer>
            <div className="flex flex-col text-sm font-medium sm:flex-row sm:justify-between sm:text-base">
              {prev && prev.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${prev.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Previous post: ${prev.title}`}
                  >
                    &larr; {prev.title}
                  </Link>
                </div>
              )}
              {next && next.path && (
                <div className="pt-4 xl:pt-8">
                  <Link
                    href={`/${next.path}`}
                    className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                    aria-label={`Next post: ${next.title}`}
                  >
                    {next.title} &rarr;
                  </Link>
                </div>
              )}
            </div>
          </footer>
        </div>
      </article>
    </SectionContainer>
  );
}
