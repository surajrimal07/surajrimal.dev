import Image from 'next/image';
import Link from 'next/link';

import { GoRepoForked } from 'react-icons/go';
import { RiRssLine } from 'react-icons/ri';

import CustomLink from '@/components/Link';
import IconsBundle from '@/components/icons/index';
import siteMetadata from '@/data/siteMetadata';

const BuildWith = () => (
  <div className="flex items-center space-x-1">
    <div className="flex space-x-1.5">
      <IconsBundle
        className="h-5 w-5"
        href="https://nextjs.org?ref=surajr.com.np"
        iconColor="white"
        kind="nextjs"
        size={6}
      />

      <IconsBundle
        className="h-5 w-5"
        href="https://tailwindcss.com?ref=surajr.com.np"
        kind="tailwindcss"
        size={6}
      />
      <IconsBundle
        href="https://www.typescriptlang.org?ref=surajr.com.np"
        kind="typescript"
        size={4}
      />

      <IconsBundle
        className="h-5 w-5"
        href="https://umami.is?ref=surajr.com.np"
        iconColor="white"
        kind="umami"
        size={6}
      />
      <IconsBundle
        className="h-5 w-5"
        href="https://supabase.com?ref=surajr.com.np"
        kind="supabase"
        size={6}
      />
      <IconsBundle
        className="h-5 w-5"
        href="https://www.postgresql.org?ref=surajr.com.np"
        kind="postgresql"
        size={6}
      />
    </div>
    <div>{' • '}</div>
    <CustomLink
      className="text-gray-500 underline underline-offset-4 dark:text-gray-300"
      href={siteMetadata.siteRepo}
    >
      <span className="flex items-center" data-umami-event="view-source">
        Source
        <GoRepoForked size={12} />
      </span>
    </CustomLink>
    <div>{' • '}</div>
    <CustomLink
      className="text-gray-500 underline underline-offset-4 dark:text-gray-300"
      href={`${siteMetadata.siteUrl}/feed`}
    >
      <span className="flex items-center" data-umami-event="view-source">
        RSS {'  '}
        <RiRssLine className="ml-0.5" size={13} />
      </span>
    </CustomLink>
    <div>{' • '}</div>
    <Link
      href="https://stats.surajrimal.dev/status/servers"
      rel="noopener noreferrer"
      target="_blank"
    >
      <Image
        alt="API Status"
        className="inline-block h-auto w-auto transition-opacity hover:opacity-80"
        height={20}
        src="https://stats.surajrimal.dev/api/badge/58/status?style=social"
        unoptimized={true}
        width={60}
      />
    </Link>
  </div>
);

export default BuildWith;
