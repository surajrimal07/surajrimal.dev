import Link from 'next/link';

import clsx from 'clsx';

import kebabCase from '@/utils/kebabCase';

interface TagProps {
  text: string;
  count?: number;
  where?: string;
  highlight?: boolean;
}

export default function Tag({ text, count, highlight }: TagProps) {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className={clsx(
        'group mb-1 mr-1 inline-flex items-center overflow-hidden rounded-md border text-gray-600 transition-all duration-200 ease-in-out dark:text-white sm:mb-1.5 sm:mr-1.5',
        {
          'border-white bg-black dark:border-white': highlight,
          'border-gray-700 bg-transparent hover:border-gray-700 dark:hover:border-white':
            !highlight,
        }
      )}
    >
      <span className="px-2 py-1 text-[10px] font-medium sm:px-2 sm:py-0.5 sm:text-xs">
        {text.toUpperCase()}
      </span>
      {count !== undefined && (
        <>
          <div className="h-5 w-px bg-gray-700 transition-colors duration-200 ease-in-out group-hover:bg-white sm:h-7" />
          <span className="bg-gray-700 bg-opacity-50 px-1.5 py-0.5 text-xs font-medium sm:px-2 sm:py-1 sm:text-sm">
            {count}
          </span>
        </>
      )}
    </Link>
  );
}
