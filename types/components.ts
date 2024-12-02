import type { ImageProps as NextImageProps } from 'next/image';

import { Authors } from 'contentlayer/generated';
import { CoreContent } from 'pliny/utils/contentlayer';
import type readingTime from 'reading-time';

import { Tables } from '@/types/database';

export interface ImageProps extends NextImageProps {
  shouldOpenLightbox?: boolean;
}

export interface ImageLightBoxProps extends Pick<NextImageProps, 'src'> {
  closeLightbox: () => void;
}

export const EMOJI_SIZES = {
  xs: 16,
  sm: 24,
  sd: 28,
  md: 32,
  lg: 48,
  xl: 56,
  xxl: 64,
  xxxl: 72,
} as const;

export type EmojiSize = keyof typeof EMOJI_SIZES | number;

export type TwemojiProps = {
  name: string;
  size?: EmojiSize;
  className?: string;
};

export interface ProjectCardProps {
  project: Tables<'projects'>;
}

export type ReadingTime = ReturnType<typeof readingTime>;

export interface BlogMetaProps {
  authorDetails?: CoreContent<Authors>[];
  date?: string;
  slug: string;
  readingTime: ReadingTime;
  language?: string;
  className?: string;
}

export interface ViewCounterProps {
  slug: string;
  className?: string;
}

export interface HomepageLink {
  emoji: string;
  event: string;
  label: string;
  href?: string;
}
