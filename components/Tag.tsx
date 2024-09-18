import kebabCase from '@/utils/kebabCase';
import Link from 'next/link';

interface Props {
  text: string;
}

const Tag = ({ text }: Props) => {
  return (
    <Link
      href={`/tags/${kebabCase(text)}`}
      className="mr-3 text-sm font-medium uppercase text-primary hover:text-red-400 dark:hover:text-red-400"
    >
      {text.split(' ').join('-')}
    </Link>
  );
};

export default Tag;
