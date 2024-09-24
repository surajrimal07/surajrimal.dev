import { cn } from '@/lib/utils';

interface DividerProps {
  marginTop?: string;
}

const Divider = ({ marginTop = '0' }: DividerProps) => {
  return (
    <hr
      className={cn(
        'w-full border-gray-300 dark:border-gray-600',
        `mt-${marginTop}`,
        'mb-0'
      )}
    />
  );
};

export default Divider;
