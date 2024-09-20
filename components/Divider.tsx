import { cn } from '@/lib/utils';

interface DividerProps {
  marginTop?: string;
}

const Divider = ({ marginTop = '0' }: DividerProps) => {
  return <hr className={cn('border-gray-300 dark:border-gray-600 w-full', `mt-${marginTop}`, 'mb-0')} />;
};

export default Divider;
