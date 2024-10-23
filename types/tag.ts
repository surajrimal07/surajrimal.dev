import { BrandIconType } from '@/components/BrandIcon';

export type PopularTag = {
  id?: number;
  href: string;
  icon_type: BrandIconType;
  slug: string;
  title: string;
  count: number;
};
