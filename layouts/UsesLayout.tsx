import { ReactNode } from 'react';

import Link from '@/components/Link';

interface Props {
  children: ReactNode;
}

export default function UsesLayout({ children }: Props) {
  return (
    <div className="divide-y divide-gray-200 dark:divide-gray-700">
      <div className="space-y-2 pb-8 pt-6 md:space-y-5">
        <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-black dark:text-white sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          What I Use
        </h1>
        <span className="text-base text-gray-500 dark:text-gray-400 md:text-lg md:leading-7">
          Inspired by{' '}
          <Link
            href="https://wesbos.com/uses"
            className="underline-magical"
            target="_blank"
            rel="noreferrer"
          >
            Wes bos
          </Link>
        </span>
      </div>
      <div className="prose max-w-none pb-8 pt-8 dark:prose-invert xl:col-span-2">
        {children}
      </div>
    </div>
  );
}
