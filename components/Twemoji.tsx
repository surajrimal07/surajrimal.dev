import Image from 'next/image';

import { EMOJI_SIZES, TwemojiProps } from '@/types/components';

export default function Twemoji({
  name,
  size = 'md',
  className,
}: TwemojiProps) {
  const emoji = `/twemoji-cache/${name}.svg`;

  const finalSize = typeof size === 'string' ? EMOJI_SIZES[size] : size;

  return (
    <Image
      src={emoji}
      alt={`Emoji ${name}`}
      className={`inline-block ${className || ''}`}
      width={finalSize}
      height={finalSize}
      loading="eager"
    />
  );
}
