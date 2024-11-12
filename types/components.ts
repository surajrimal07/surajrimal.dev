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

export type TwemojiProps = {
  emoji: string;
  size?: string;
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
