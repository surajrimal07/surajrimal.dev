import { IconName } from '@/components/social-icons';

export type PopularTag = {
  id?: number;
  href: string;
  icon_type: IconName;
  slug: string;
  title: string;
  count: number;
};
