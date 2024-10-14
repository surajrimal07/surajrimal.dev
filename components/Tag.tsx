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
      className="dark:bg:black bg:black group mb-2 mr-2 inline-flex items-center overflow-hidden rounded-md border border-gray-700 text-gray-600 transition-all duration-200 ease-in-out hover:border-gray-700 dark:text-white dark:hover:border-white"
    >
      <span className="px-3 py-1 text-sm font-medium">
        {text.toUpperCase()}
      </span>
      {count !== undefined && (
        <>
          <div className="h-7 w-px bg-gray-700 transition-colors duration-200 ease-in-out group-hover:bg-white"></div>
          <span className="bg-gray-700 bg-opacity-50 px-2 py-1 text-sm font-medium">
            {count}
          </span>
        </>
      )}
    </Link>
  );
}
