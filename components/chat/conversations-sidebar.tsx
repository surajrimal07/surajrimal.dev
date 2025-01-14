'use client';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { formatDates } from '@/utils/time';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Button } from '../ui/button';

interface ConversationsSidebarProps {
  conversations: {
    id: string;
    created_at: Date | null;
    preview: string | null;
    location: string;
  }[];
}

export function ConversationsSidebar({
  conversations,
}: ConversationsSidebarProps) {
  const params = useParams();
  const conversationId = params.conversationId;

  return (
    <Sidebar collapsible="offcanvas" className="overflow-hidden">
      <SidebarHeader className="gap-3.5 border-b p-4 font-display text-xl font-semibold">
        Conversations
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="px-0">
          <SidebarGroupContent>
            {conversations.map((conversation) => (
              <Link
                href={`/conversations/${conversation.id}`}
                key={conversation.id}
                className={cn(
                  'flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                  conversationId === conversation.id &&
                    'bg-background text-primary',
                )}
              >
                <div className="flex w-full items-end gap-2">
                  <span className="font-medium">
                    {conversation.location ? conversation.location : ''}
                  </span>
                  <span className="ml-auto text-xs">
                    {/* biome-ignore lint/style/noNonNullAssertion: <explanation> */}
                    {formatDates(conversation.created_at!)}
                  </span>
                </div>
                <span className="line-clamp-2 w-[260px] whitespace-break-spaces text-xs">
                  {conversation.preview}
                </span>
              </Link>
            ))}
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Button variant="link">
          <Link href="/chat">Suraj&apos; AI</Link>
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
