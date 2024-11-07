'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { Send } from 'lucide-react';
import toast from 'react-hot-toast';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LOGO_IMAGE_PATH } from '@/constants';
import { updateAuthorStatus } from '@/lib/telegram';
import { DBChatMessage, Message } from '@/types/chat';
import { gravatarURL } from '@/utils/gravatarHash';
import { supabase } from '@/utils/supabase/client';
import { timeAgo } from '@/utils/timeAgo';
import { toastOptions } from '@/utils/toast';

export default function AdminChat() {
  const [conversations, setConversations] = useState<{
    [email: string]: Message[];
  }>({});
  const [activeEmail, setActiveEmail] = useState<string | null>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [totalActive, setTotalActive] = useState(0);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const isClientActive = useCallback((messages: Message[]) => {
    const clientMessages = messages.filter((msg) => msg.sender !== 'author');
    if (clientMessages.length === 0) return false;

    const lastClientMessage = clientMessages[clientMessages.length - 1];
    const lastMessageTime = new Date(lastClientMessage.id);
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);

    return lastMessageTime > fiveMinutesAgo;
  }, []);

  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector(
        '[data-radix-scroll-area-viewport]'
      );
      if (scrollElement) {
        scrollElement.scrollTo({
          top: scrollElement.scrollHeight,
          behavior: 'smooth',
        });
      }
    }
  }, []);

  const fetchConversations = useCallback(async () => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('Error fetching conversations:', error);
    } else {
      const conversationsMap = (data as DBChatMessage[]).reduce(
        (acc, item) => {
          acc[item.email] = item.messages;
          return acc;
        },
        {} as { [email: string]: Message[] }
      );
      setConversations(conversationsMap);
    }
  }, []);

  useEffect(() => {
    fetchConversations();

    const channel = supabase
      .channel('admin-chat')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'chat_messages' },
        () => {
          fetchConversations();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [fetchConversations]);

  useEffect(() => {
    const activeCount = Object.values(conversations).reduce(
      (count, messages) => {
        return count + (isClientActive(messages) ? 1 : 0);
      },
      0
    );
    setTotalActive(activeCount);
  }, [conversations, isClientActive]);

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom();
    }, 100);
    return () => clearTimeout(timer);
  }, [conversations, activeEmail, scrollToBottom]);

  const handleSendReply = async () => {
    if (activeEmail && replyMessage.trim()) {
      const newMessage: Message = {
        id: Date.now(),
        text: replyMessage.trim(),
        sender: 'author',
      };

      const updatedMessages = [...conversations[activeEmail], newMessage];

      const { error } = await supabase
        .from('chat_messages')
        .update({ messages: updatedMessages })
        .eq('email', activeEmail);

      if (error) {
        toast.error(`Error sending reply: ${error.message}`, toastOptions);
      } else {
        await updateAuthorStatus();
        setConversations((prev) => ({
          ...prev,
          [activeEmail]: updatedMessages,
        }));
        setReplyMessage('');
      }
    }
  };

  const getLastClientReplyTime = useCallback((messages: Message[]) => {
    const clientMessages = messages.filter((msg) => msg.sender !== 'author');
    if (clientMessages.length > 0) {
      const lastClientMessage = clientMessages[clientMessages.length - 1];
      return timeAgo(new Date(lastClientMessage.id));
    }
    return null;
  }, []);

  const lastReplyTime = useMemo(() => {
    if (!activeEmail || !conversations[activeEmail]) return null;
    return getLastClientReplyTime(conversations[activeEmail]);
  }, [activeEmail, conversations, getLastClientReplyTime]);

  return (
    <div className="container mx-auto">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/admin">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Chat - Active {totalActive}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="mt-4 flex h-[calc(100vh-8rem)] overflow-hidden rounded-lg border bg-background">
        <div className="w-64 flex-shrink-0 border-r">
          <div className="border-b p-3 text-sm font-semibold">
            Conversations - {Object.keys(conversations).length}
          </div>
          <ScrollArea className="h-[calc(100%-3rem)]">
            {Object.entries(conversations).map(([email, messages]) => (
              <Button
                key={email}
                onClick={() => {
                  setActiveEmail(email);
                }}
                variant={activeEmail === email ? 'secondary' : 'ghost'}
                className="h-auto w-full justify-start rounded-none px-3 py-2"
              >
                <Avatar className="mr-2 h-8 w-8">
                  <AvatarImage src={gravatarURL(email)} alt={email} />
                  <AvatarFallback>
                    {email.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="overflow-hidden text-left">
                  <div className="flex items-center gap-1">
                    <div className="truncate text-sm font-medium">{email}</div>
                    {isClientActive(messages) && (
                      <span className="h-2 w-2 flex-shrink-0 rounded-full bg-green-500" />
                    )}
                  </div>
                  <div className="truncate text-xs text-muted-foreground">
                    {messages[messages.length - 1]?.text}
                  </div>
                </div>
              </Button>
            ))}
          </ScrollArea>
        </div>
        <div className="flex flex-1 flex-col">
          {activeEmail ? (
            <>
              <div className="flex items-center justify-between border-b p-3">
                <span className="text-sm font-semibold">
                  Chat with {activeEmail}
                </span>
                {lastReplyTime && (
                  <span className="text-xs text-muted-foreground">
                    Last reply: {lastReplyTime}
                  </span>
                )}
              </div>
              <ScrollArea className="flex-1" ref={scrollAreaRef}>
                <div className="p-4">
                  {conversations[activeEmail].map((message) => (
                    <div
                      key={message.id}
                      className={`mb-4 flex items-start ${
                        message.sender === 'author'
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >
                      {message.sender !== 'author' && (
                        <Avatar className="mr-2 h-8 w-8">
                          <AvatarImage
                            src={gravatarURL(activeEmail)}
                            alt={activeEmail}
                          />
                          <AvatarFallback>
                            {activeEmail.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}
                      <div
                        className={`max-w-[70%] rounded-lg p-2 text-sm ${
                          message.sender === 'author'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-secondary'
                        }`}
                      >
                        {message.text}
                      </div>
                      {message.sender === 'author' && (
                        <Avatar className="ml-2 h-8 w-8">
                          <AvatarImage
                            src={LOGO_IMAGE_PATH}
                            alt="@author image"
                          />
                          <AvatarFallback>SR</AvatarFallback>
                        </Avatar>
                      )}
                    </div>
                  ))}
                </div>
              </ScrollArea>
              <div className="w-full border-t p-3">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSendReply();
                  }}
                  className="flex w-full gap-2"
                >
                  <div className="flex-grow">
                    <Input
                      value={replyMessage}
                      onChange={(e) => setReplyMessage(e.target.value)}
                      placeholder="Type your reply..."
                      className="w-full"
                    />
                  </div>
                  <Button type="submit" size="lg" className="flex-shrink-0">
                    <Send className="h-5 w-5" />
                  </Button>
                </form>
              </div>
            </>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">
                Select a conversation to start chatting
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
