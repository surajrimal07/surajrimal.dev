import type { ReactNode } from 'react';

import GuestbookHeaderImage from '@/components/guestbook/HeaderImage';

//new changes mf

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GuestbookHeaderImage />
      <div className="relative">{children}</div>
    </>
  );
}
