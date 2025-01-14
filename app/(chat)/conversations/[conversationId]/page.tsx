import { Content } from '@/components/chat/content';
import { Message } from '@/components/chat/message';
import { getChat } from '@/lib/chat';
import { generateId } from 'ai';

export default async function ConversationPage({
  params,
}: { params: Promise<{ conversationId: string }> }) {
  const conversationId = (await params).conversationId;

  const messages = await getChat(conversationId);

  return (
    <div className="p-4">
      {messages.map((message) => (
        <Message
          message={{
            ...message,
            id: generateId(),
            display: <Content content={message.content} duration={0} />,
          }}
          key={message.id}
        />
      ))}
      {messages.length === 0 && (
        <div className="flex h-full w-full flex-1 items-center justify-center">
          <div className="flex flex-col items-center">
            <div className="font-display text-3xl">No messages</div>
            <div>in this conversation</div>
          </div>
        </div>
      )}
    </div>
  );
}
