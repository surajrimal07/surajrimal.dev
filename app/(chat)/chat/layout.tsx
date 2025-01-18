import ChatHeaderImage from '@/components/chat/header-image';
import type { ReactNode } from 'react';

export default function ChatLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ChatHeaderImage />
      <div className="relative">{children}</div>
    </>
  );
}


