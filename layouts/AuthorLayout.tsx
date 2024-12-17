import Image from 'next/image';
import type { ReactNode } from 'react';

import type { Authors } from 'contentlayer/generated';

import ProfileCard from '@/components/profilecard';

interface Props {
  children: ReactNode;
  content: Omit<Authors, '_id' | '_raw' | 'body'>;
}

export default function AuthorLayout({ children }: Props) {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-black dark:text-white sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            About
          </h1>
          <p className="text-base text-gray-500 dark:text-gray-400 md:text-lg md:leading-7">
            Further insights into who I am and the purpose of this blog.
          </p>
        </div>
        <div className="items-start space-y-2 xl:grid xl:grid-cols-3 xl:gap-x-8 xl:space-y-0">
          <div className="flex flex-col items-center space-x-2 pt-8">
            <ProfileCard />
          </div>
          <div className="prose max-w-none pb-2 pt-8 dark:prose-invert xl:col-span-2">
            {children}
            <Image
              src="https://cdn.surajrimal.dev/image.png"
              alt="Signature"
              width={96}
              height={96}
              className="h-24 w-auto"
            />
          </div>
        </div>
      </div>
    </>
  );
}
