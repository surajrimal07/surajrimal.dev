import kebabCase from '@/utils/kebabCase';

import type { TwemojiProps } from '@/types/index';

export function Twemoji({ emoji, size = 'twa-lg', className }: TwemojiProps) {
  const cls = `inline-block twa ${size} twa-${kebabCase(emoji)} ${className || ''}`;

  return <i className={cls.trim()} />;
}

export default Twemoji;
