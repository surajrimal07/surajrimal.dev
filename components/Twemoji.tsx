import Image from 'next/image';
import { memo } from 'react';

import { EMOJI_SIZES, TwemojiProps } from '@/types/components';

export const Twemoji = memo(
  ({ hexcode, size = 'md', className }: TwemojiProps) => {
    const baseUrl =
      'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg';
    const emojiUrl = `${baseUrl}/${hexcode}.svg`;

    const finalSize = typeof size === 'string' ? EMOJI_SIZES[size] : size;

    return (
      <Image
        src={emojiUrl}
        alt={`Emoji ${hexcode}`}
        unoptimized={true}
        className={`inline-block ${className || ''}`}
        width={finalSize}
        height={finalSize}
        loading="lazy"
      />
    );
  },
  (prevProps, nextProps) =>
    prevProps.hexcode === nextProps.hexcode &&
    prevProps.size === nextProps.size &&
    prevProps.className === nextProps.className
);

Twemoji.displayName = 'Twemoji';

export default Twemoji;
