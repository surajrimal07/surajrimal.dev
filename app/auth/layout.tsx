import { ReactNode } from 'react';

import HeaderImage from '@/components/auth/HeaderImage';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <HeaderImage />
      <div className="relative">{children}</div>
    </>
  );
}
