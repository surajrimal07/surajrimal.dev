'use client';

import { useCurrentPath } from '@/components/PathProvider';

export const useCurrentSlug = () => {
  const pathname = useCurrentPath();
  const slug = pathname.split('/').pop() || '';
  return slug;
};
