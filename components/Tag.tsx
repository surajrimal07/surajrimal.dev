import Link from 'next/link';

import kebabCase from '@/utils/kebabCase';

interface TagProps {
  text: string;
  count?: number;
}

export default function Tag({ text, count }: TagProps) {
  const formattedText =
    `${text.split(' ').join('-')} ${count ? `(${count})` : ''}`.toUpperCase();

  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className="py-0.75 mr-2 mt-2 inline-flex items-center rounded-lg bg-secondary px-1 text-sm font-medium text-secondary-foreground transition-colors hover:bg-gray-400 dark:hover:bg-gray-600"
    >
      {formattedText}
    </Link>
  );
}
