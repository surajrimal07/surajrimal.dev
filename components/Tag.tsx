import Link from 'next/link';

import kebabCase from '@/utils/kebabCase';

interface Props {
  text: string;
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className="mr-3 mt-2 rounded-lg border border-primary-500 px-3 py-1 text-sm font-medium uppercase text-primary-500 transition duration-500 ease-in-out hover:bg-primary-500 hover:text-white dark:text-primary-200 dark:hover:text-white"
    >
      {text.split(' ').join('-')}
    </Link>
  );
};

export default Tag;
