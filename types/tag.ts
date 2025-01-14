import type { IconName } from '@/components/icons';

export type PopularTag = {
  id?: number;
  href: string;
  icon_type: IconName;
  slug: string;
  title: string;
  count: number;
};
