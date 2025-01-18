import type { ReactNode } from 'react';

import GuestbookHeaderImage from '@/components/guestbook/HeaderImage';

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <GuestbookHeaderImage />
      <div className="relative">{children}</div>
    </>
  );
}
