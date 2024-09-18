'use client';

import { usePathname } from 'next/navigation';

export const useCurrentSlug = () => {
  const pathname = usePathname();
  const slug = pathname.split('/').pop() || '';
  return slug;
};
