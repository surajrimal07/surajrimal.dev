import { GoRepoForked } from 'react-icons/go';
import { RiRssLine } from 'react-icons/ri';

import Link from '@/components/Link';
import IconsBundle from '@/components/social-icons/index';
import siteMetadata from '@/data/siteMetadata';

const BuildWith = () => (
  <div className="flex items-center space-x-1">
    <span className="mr-1 text-gray-500 dark:text-gray-300">Build with</span>

    <div className="flex space-x-1.5">
      <IconsBundle
        kind="nextdotjs"
        href="https://nextjs.org?ref=surajr.com.np"
        size={6}
        className="h-5 w-5"
        iconColor="white"
      />

      <IconsBundle
        kind="tailwindcss"
        href="https://tailwindcss.com?ref=surajr.com.np"
        size={6}
        className="h-5 w-5"
      />
      <IconsBundle
        kind="typescript"
        href="https://www.typescriptlang.org?ref=surajr.com.np"
        size={4}
      />

      <IconsBundle
        kind="umami"
        href="https://umami.is?ref=surajr.com.np"
        iconColor="white"
        size={6}
        className="h-5 w-5"
      />
      <IconsBundle
        kind="supabase"
        href="https://supabase.com?ref=surajr.com.np"
        size={6}
        className="h-5 w-5"
      />
      <IconsBundle
        kind="postgresql"
        href="https://www.postgresql.org?ref=surajr.com.np"
        size={6}
        className="h-5 w-5"
      />
    </div>
    <span className="px-0 text-gray-400 dark:text-gray-500">-</span>
    <Link
      href={siteMetadata.siteRepo}
      className="text-gray-500 underline underline-offset-4 dark:text-gray-300"
    >
      <span data-umami-event="view-source" className="flex items-center">
        Source
        <GoRepoForked size={12} />
      </span>
    </Link>
    <span className="px-0 text-gray-400 dark:text-gray-500">-</span>
    <Link
      href={`${siteMetadata.siteUrl}/feed`}
      className="text-gray-500 underline underline-offset-4 dark:text-gray-300"
    >
      <span data-umami-event="view-source" className="flex items-center">
        RSS {'  '}
        <RiRssLine size={12} className="ml-0.5" />
      </span>
    </Link>
  </div>
);

export default BuildWith;
