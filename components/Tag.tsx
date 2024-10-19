import Link from 'next/link';

import kebabCase from '@/utils/kebabCase';

interface TagProps {
  text: string;
  count?: number;
  where?: string;
}

export default function Tag({ text, count }: TagProps) {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className="dark:bg:black bg:black group mb-1 mr-1 inline-flex items-center overflow-hidden rounded-md border border-gray-700 text-gray-600 transition-all duration-200 ease-in-out hover:border-gray-700 dark:text-white dark:hover:border-white sm:mb-2 sm:mr-2"
    >
      <span className="px-2 py-0.5 text-xs font-medium sm:px-3 sm:py-1 sm:text-sm">
        {text.toUpperCase()}
      </span>
      {count !== undefined && (
        <>
          <div className="h-5 w-px bg-gray-700 transition-colors duration-200 ease-in-out group-hover:bg-white sm:h-7"></div>
          <span className="bg-gray-700 bg-opacity-50 px-1.5 py-0.5 text-xs font-medium sm:px-2 sm:py-1 sm:text-sm">
            {count}
          </span>
        </>
      )}
    </Link>
  );
}
