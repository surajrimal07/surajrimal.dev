'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { HelpCircle, MessageCircle, MoreVertical, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { simpleFAQs } from '@/data/chatFAQ';
import siteMetadata from '@/data/siteMetadata';
import { clearChat, saveChat } from '@/lib/chat';
import { handleChatRequest } from '@/lib/chat/chat-lib';
import { RateLimit } from '@/lib/rate-limit';
import useChatStore from '@/lib/store/chatStore';
import { sendMessage } from '@/lib/telegram';
import type { DatabaseChangePayload, Message } from '@/types/chat';
import { supabase } from '@/utils/supabase/client';
import { toastOptions } from '@/utils/toast';
import { readStreamableValue } from 'ai/rsc';
import Link from 'next/link';
import { MdArrowOutward } from 'react-icons/md';

interface ChatBoxProps {
  ipAddress: string;
}

const MessageTime = React.memo(
  ({ time, isVisible }: { time: string; isVisible: boolean }) => (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="text-xs text-gray-500"
          exit={{ opacity: 0, x: -10 }}
          initial={{ opacity: 0, x: -10 }}
        >
          {time}
        </motion.div>
      )}
    </AnimatePresence>
  ),
);
MessageTime.displayName = 'MessageTime';

const TimeSeparator = React.memo(({ time }: { time: string }) => (
  <div className="my-2 flex items-center justify-center">
    <div className="h-px flex-grow bg-gray-500" />
    <span className="mx-2 text-xs text-gray-500">{time}</span>
    <div className="h-px flex-grow bg-gray-500" />
  </div>
));
TimeSeparator.displayName = 'TimeSeparator';

const formatMessageTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

const Chatbox = ({ ipAddress }: ChatBoxProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { chatEnabled, setChatEnabled } = useChatStore();
  const [newMessage, setNewMessage] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    isAuthorOnline,
    lastOnlineTimeAgo,
    isCollapsed,
    setIsCollapsed,
    updateAuthorStatus,
  } = useChatStore();
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(
    null,
  );
  interface AuthorStatusPayload {
    new: {
      last_active: string;
    };
  }

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const fetchInitialMessages = useCallback(async (ipAddress: string) => {
    const { data } = await supabase
      .from('chat_messages')
      .select('messages')
      .eq('ip_address', ipAddress)
      .single();

    if (
      data?.messages &&
      Array.isArray(data.messages) &&
      data.messages.length > 0
    ) {
      setMessages(data.messages);
    } else {
      setMessages([
        {
          id: Date.now(),
          text: 'Hello! How can I help you with my blog today?',
          sender: 'ai',
        },
      ]);
    }
  }, []);

  const handleDatabaseChange = useCallback(
    (payload: DatabaseChangePayload) => {
      const newMessages = payload.new.messages as Message[];

      if (newMessages && newMessages.length > 0) {
        const lastMessage = newMessages[newMessages.length - 1];

        if (lastMessage && lastMessage.sender === 'author') {
          updateAuthorStatus(new Date());
          setMessages((prev) => {
            if (!prev.some((msg) => msg.id === lastMessage.id)) {
              if (isCollapsed) {
                setNewMessage(true);
              }
              return [...prev, lastMessage];
            }
            return prev;
          });
        }
      }
    },
    [isCollapsed, updateAuthorStatus],
  );

  const handleFAQClick = useCallback((question: string, answer: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: question, sender: 'user' },
      { id: Date.now() + 1, text: answer, sender: 'ai' },
    ]);
  }, []);

  useEffect(() => {
    if (!isCollapsed) {
      const timer = setTimeout(() => {
        scrollToBottom();
        setNewMessage(false);
      }, 200);

      return () => clearTimeout(timer);
    }
  }, [isCollapsed, messages, scrollToBottom]);

  useEffect(() => {
    const fetchAuthorStatus = async () => {
      const { data } = await supabase
        .from('author_status')
        .select('last_active')
        .eq('id', 'author')
        .single();

      if (data) {
        updateAuthorStatus(new Date(data.last_active));
      }
    };

    fetchAuthorStatus();

    const channel = supabase
      .channel('author-status')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'author_status',
          filter: 'id=eq.author',
        },
        (payload) => {
          const newPayload = payload as unknown as AuthorStatusPayload;
          updateAuthorStatus(new Date(newPayload.new.last_active));
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [updateAuthorStatus]);

  useEffect(() => {
    if (ipAddress) {
      fetchInitialMessages(ipAddress);

      const channel = supabase
        .channel(`chat:${ipAddress}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'chat_messages',
            filter: `ip_address=eq.${ipAddress}`,
          },
          (payload) =>
            handleDatabaseChange(payload as unknown as DatabaseChangePayload),
        )
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'chat_messages',
            filter: `ip_address=eq.${ipAddress}`,
          },
          (payload) =>
            handleDatabaseChange(payload as unknown as DatabaseChangePayload),
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [ipAddress, fetchInitialMessages, handleDatabaseChange]);

  const handleSendMessage = useCallback(async () => {
    const trimmedMessage = inputMessage.trim();
    if (!trimmedMessage) return;

    // Create message object once
    const userMessage: Message = {
      id: Date.now(),
      text: trimmedMessage,
      sender: 'user',
    };

    // Update UI immediately
    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const limiter = await RateLimit();

      if (!limiter.success) {
        const rateLimited: Message = {
          id: Date.now(),
          text: "Whoa, easy there big talker! You've hit the rate limit. Give it a moment before asking more.",
          sender: 'ai',
        };
        setMessages((prev) => [...prev, rateLimited]);
        await saveChat(ipAddress, rateLimited);
        return;
      }

      // Parallel fetch of author status while saving initial message
      await Promise.all([
        Promise.allSettled([
          saveChat(ipAddress, userMessage),
          sendMessage(ipAddress, trimmedMessage),
        ]).then((results) => {
          results.forEach((result, index) => {
            if (result.status === 'rejected') {
              const operation = index === 0 ? 'saveChat' : 'sendMessage';
              console.warn(`${operation} failed:`, result.reason);
            }
          });
        }),
      ]);

      // Check author status
      if (isAuthorOnline) {
        const authorOnlineMessage: Message = {
          id: Date.now(),
          text: 'Message received. Suraj will respond soon.',
          sender: 'ai',
        };
        setMessages((prev) => [...prev, authorOnlineMessage]);
        await saveChat(ipAddress, authorOnlineMessage);
        return;
      }

      // Handle AI response
      const aiResponse = await handleChatRequest(trimmedMessage);
      const aiMessage: Message = {
        id: Date.now(),
        text: '',
        sender: 'ai',
      };

      setMessages((prev) => [...prev, aiMessage]);

      // Batch updates for better performance
      let finalText = '';

      for await (const delta of readStreamableValue(aiResponse)) {
        finalText += delta;

        // Debounce updates to reduce render cycles
        setMessages((prev) => {
          const lastMessage = prev[prev.length - 1];
          if (lastMessage.sender === 'ai' && lastMessage.id === aiMessage.id) {
            return [...prev.slice(0, -1), { ...lastMessage, text: finalText }];
          }
          return prev;
        });
      }

      // Save final message
      const finalAiMessage: Message = {
        id: aiMessage.id,
        text: finalText,
        sender: 'ai',
      };

      await saveChat(ipAddress, finalAiMessage);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now(),
        text: 'An error occurred while processing your request.',
        sender: 'ai',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  }, [inputMessage, ipAddress]);

  const handleHide = useCallback(() => {
    setChatEnabled(false);
  }, [setChatEnabled]);

  const handleMessageClick = useCallback((id: number) => {
    setSelectedMessageId((prevId) => (prevId === id ? null : id));
  }, []);

  const shouldShowTimeSeparator = useCallback(
    (currentMessage: Message, nextMessage: Message) => {
      if (!nextMessage) return false;
      const timeDiff = nextMessage.id - currentMessage.id;
      return timeDiff > 600000;
    },
    [],
  );

  const handleDeleteChat = useCallback(async () => {
    setMessages([]);

    try {
      await clearChat(ipAddress);
    } catch (error) {
      toast.error(`Error deleting chat ${error}`, toastOptions);
    }
    setShowOptions(false);
  }, [ipAddress]);

  const handleClearChat = useCallback(() => {
    setMessages([]);

    const messageCleared: Message = {
      id: Date.now(),
      text: 'Chat cleared. Start a new conversation.',
      sender: 'ai',
    };
    setMessages((prev) => [...prev, messageCleared]);

    setShowOptions(false);
  }, []);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputMessage(e.target.value);
    },
    [],
  );

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        handleSendMessage();
      }
    },
    [handleSendMessage],
  );

  const handleCollapse = useCallback(() => {
    setIsCollapsed(true);
  }, [setIsCollapsed]);

  const motionExpandedProps = useMemo(
    () => ({
      initial: { opacity: 0, scale: 0.8, y: 20 },
      animate: { opacity: 1, scale: 1, y: 0 },
      exit: { opacity: 0, scale: 0.8, y: 20 },
      transition: { duration: 0.2, ease: 'easeInOut' },
    }),
    [],
  );

  const motionRippleProps = useMemo(
    () => ({
      boxShadow: [
        '0 0 0 0 rgba(59, 130, 246, 0)',
        '0 0 0 10px rgba(59, 130, 246, 0.1)',
        '0 0 0 20px rgba(59, 130, 246, 0)',
      ],
      transition: { repeat: Number.POSITIVE_INFINITY, duration: 1.5 },
    }),
    [],
  );

  const LoadingDots = () => (
    <div className="flex items-center space-x-1 p-2">
      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.3s]" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400 [animation-delay:-0.15s]" />
      <div className="h-2 w-2 animate-bounce rounded-full bg-gray-400" />
    </div>
  );

  const renderedMessages = useMemo(() => {
    const renderedMessages = messages.map((message, index) => {
      const messageKey = `message-${message.id}-${index}`;

      return (
        <div
          key={messageKey}
          className={`flex ${
            message.sender === 'user' ? 'justify-end' : 'justify-start'
          } mb-4`}
          role="button"
          tabIndex={0}
          onClick={() => handleMessageClick(message.id)}
          onKeyPress={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleMessageClick(message.id);
            }
          }}
        >
          {message.sender === 'user' && (
            <Avatar className="mr-2 h-8 w-8">
              <AvatarImage
                alt="@user picture"
                src={'/static/images/user-chat.jpg'}
              />
              <AvatarFallback>
                {ipAddress.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          )}

          {message.sender === 'author' && (
            <Avatar className="mr-2 h-8 w-8">
              <AvatarImage
                alt="@author image"
                src={'/static/images/avatar_small.webp'}
              />
              <AvatarFallback>SR</AvatarFallback>
            </Avatar>
          )}
          {message.sender === 'ai' && (
            <div className="mr-2 flex h-8 w-8 items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
          )}

          <div className="flex max-w-[85%] flex-col">
            <div
              className={`break-words rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-primary-500 text-white'
                  : 'bg-gray-900 text-white'
              }`}
            >
              {message.text}

              {message.sender === 'ai' && (
                <span className="ml-2 text-xs text-gray-300">
                  (AI Response)
                </span>
              )}
            </div>

            <MessageTime
              isVisible={selectedMessageId === message.id}
              time={formatMessageTime(message.id)}
            />
          </div>

          {index < messages.length - 1 &&
            shouldShowTimeSeparator(message, messages[index + 1]) && (
              <TimeSeparator
                key={`separator-${messageKey}`}
                time={formatMessageTime(message.id)}
              />
            )}
        </div>
      );
    });

    if (
      isLoading &&
      messages[messages.length - 1]?.sender === 'user' &&
      !isAuthorOnline
    ) {
      renderedMessages.push(
        <div key="loading-dots" className="mb-4 flex justify-start">
          <div className="mr-2 flex h-8 w-8 items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <LoadingDots />
        </div>,
      );
    }

    return renderedMessages;
  }, [
    messages,
    isLoading,
    isAuthorOnline,
    selectedMessageId,
    shouldShowTimeSeparator,
    handleMessageClick,
  ]);

  const renderCollapsedState = useCallback(() => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return (
        <div key="collapsed-icon" className="relative">
          <Button
            className={`h-11 w-11 rounded-full p-0 ${
              isAuthorOnline ? 'bg-green-500' : 'bg-red-500'
            }`}
            onClick={() => {
              setIsCollapsed(false);
            }}
          >
            <MessageCircle className="h-5 w-5 text-white" />
            {newMessage && (
              <div className="absolute -right-1 -top-0 h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-lg shadow-red-500/50 ring-[3px] ring-white dark:ring-black" />
            )}
          </Button>
        </div>
      );
    }
    return (
      <motion.div
        key="collapsed"
        animate={{ scale: 1 }}
        className="relative"
        exit={{ scale: 0 }}
        initial={{ scale: 0 }}
        transition={{ duration: 0.2, ease: 'easeInOut' }}
      >
        <motion.div
          animate={motionRippleProps}
          className="absolute inset-0 rounded-lg"
        />

        <div
          className={clsx(
            'relative flex items-center justify-between rounded-lg px-0 py-2 shadow-lg transition-all duration-300 hover:shadow-xl',
            {
              'bg-green-800': isAuthorOnline,
              'bg-primary-600': !isAuthorOnline,
            },
          )}
        >
          <Button
            className="h-auto w-40 bg-transparent p-0 hover:bg-transparent"
            onClick={() => setIsCollapsed(false)}
          >
            <div className="flex flex-col items-start">
              <div className="flex items-center">
                <span className="font-semibold text-white">
                  Chat with {siteMetadata.headerTitle}
                </span>

                {newMessage && (
                  <Badge className="ml-1 p-0 text-xs" variant="neutral">
                    New
                  </Badge>
                )}
              </div>

              <span className="text-xs text-white opacity-80">
                Active {lastOnlineTimeAgo}
              </span>
            </div>
          </Button>

          <Button
            aria-label="Disable the chat"
            className="bg-transparent text-white hover:bg-white/20"
            size="sm"
            variant="ghost"
            onClick={handleHide}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    );
  }, [
    isAuthorOnline,
    setIsCollapsed,
    motionRippleProps,
    newMessage,
    lastOnlineTimeAgo,
    handleHide,
  ]);

  if (!chatEnabled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence mode="wait">
        {isCollapsed ? (
          renderCollapsedState()
        ) : (
          <motion.div
            key="expanded"
            {...motionExpandedProps}
            className="flex h-[60vh] w-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-black shadow-2xl sm:h-[32rem] sm:w-96 sm:max-w-[70vw]"
          >
            <div
              className={clsx('flex items-center justify-between p-1.5', {
                'bg-green-800': isAuthorOnline,
                'bg-primary-600': !isAuthorOnline,
              })}
            >
              <div className="flex flex-col">
                <div className="flex items-center">
                  <h2 className="font-bold text-white">
                    Chat with {siteMetadata.headerTitle}
                  </h2>
                  <Link
                    href="/chat"
                    className="ml-2 text-xs text-gray-200 hover:text-white flex items-center"
                  >
                    Try full chat at
                    <MdArrowOutward className="h-3 w-3 mr-1" />
                  </Link>
                </div>
                <p className="text-sm text-white">Active {lastOnlineTimeAgo}</p>
              </div>

              <Button
                className="hover:bg-white/20"
                size="icon"
                variant="ghost"
                onClick={handleCollapse}
              >
                <X className="h-4 w-4 text-white" />
              </Button>
            </div>

            <ScrollArea className="h-[calc(100%-4rem)] flex-1 overflow-y-auto p-4">
              {renderedMessages}
              <div ref={messagesEndRef} />
            </ScrollArea>

            <div className="border-t border-gray-200 p-2">
              <div className="flex space-x-2">
                <div className="flex-grow">
                  <Input
                    className="w-full"
                    placeholder="Type your message..."
                    type="text"
                    value={inputMessage}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                  />
                </div>

                <Button className="h-10 px-2 py-2" onClick={handleSendMessage}>
                  <Send className="h-4 w-4" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="h-10 px-2 py-1">
                      <HelpCircle className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-72">
                    {simpleFAQs.map((faq, index) => (
                      <DropdownMenuItem
                        // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                        key={index}
                        onClick={() => handleFAQClick(faq.question, faq.answer)}
                      >
                        {faq.question}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="relative">
                  <DropdownMenu
                    open={showOptions}
                    onOpenChange={setShowOptions}
                  >
                    <DropdownMenuTrigger asChild>
                      <Button className="h-10 w-10" size="icon" variant="ghost">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Open options</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <DropdownMenuItem onClick={handleClearChat}>
                        <span>Clear Chat</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem onClick={handleDeleteChat}>
                        <span>Delete Chat</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbox;
