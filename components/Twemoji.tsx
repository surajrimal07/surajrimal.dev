import Image from 'next/image';

import { EMOJI_SIZES, TwemojiProps } from '@/types/components';

export function Twemoji({ hexcode, size = 'md', className }: TwemojiProps) {
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
}

export default Twemoji;
