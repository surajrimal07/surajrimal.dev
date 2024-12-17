import { cn } from '@/lib/utils';

type SeparatorProps = {
  /**
   * @default ""
   */
  label?: React.ReactNode;
  /**
   * @default false
   */
  gradient?: boolean;
  className?: string;
  /**
   * Margin top value to be applied
   */
  marginTop?: number; // New prop
};

//======================================
export const Separator = ({
  label,
  gradient = false,
  className = '',
  marginTop = 0, // Default to 0 if not provided
}: SeparatorProps) => {
  const marginTopStyle = { marginTop: `${marginTop}px` };

  if (label) {
    return (
      <div className={cn('flex w-full items-center')} style={marginTopStyle}>
        <div
          className={cn(
            'h-[1px] w-full rounded-full',
            gradient
              ? 'bg-gradient-to-r from-transparent to-zinc-500 dark:from-zinc-800 dark:to-zinc-400'
              : 'bg-zinc-300 dark:bg-zinc-800',
            className,
          )}
        />
        <div className="w-fit text-nowrap uppercase text-gray-600 dark:text-gray-300">
          {label}
        </div>
        <div
          className={cn(
            'h-[1px] w-full rounded-full',
            gradient
              ? 'bg-gradient-to-r from-zinc-500 to-transparent dark:from-zinc-200 dark:to-zinc-700'
              : 'bg-zinc-300 dark:bg-zinc-800',
            className,
          )}
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'h-[1px] w-full rounded-full',
        gradient
          ? 'bg-gradient-to-r from-transparent via-zinc-500 to-transparent dark:from-zinc-800 dark:via-zinc-200 dark:to-zinc-700'
          : 'bg-zinc-300 dark:bg-zinc-800',
        className,
      )}
      style={marginTopStyle}
    />
  );
};
