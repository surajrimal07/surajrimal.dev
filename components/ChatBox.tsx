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
import { z } from 'zod';

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
import { LOGO_IMAGE_PATH } from '@/constants';
import { simpleFAQs } from '@/data/chatFAQ';
import siteMetadata from '@/data/siteMetadata';
import { clearChat, saveChat } from '@/lib/chat';
import { handleChatRequest } from '@/lib/chat-bot';
import useChatStore from '@/lib/store/chatStore';
import { sendMessage } from '@/lib/telegram';
import { emailSchema } from '@/lib/validation/email';
import type { DatabaseChangePayload, Message } from '@/types/chat';
import { gravatarURL } from '@/utils/gravatarHash';
import { supabase } from '@/utils/supabase/client';
import { toastOptions } from '@/utils/toast';

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

const Chatbox: React.FC = () => {
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
    email,
    setEmail,
    isEmailSubmitted,
    setIsEmailSubmitted,
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

  const fetchInitialMessages = useCallback(async (email: string) => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('messages')
      .eq('email', email)
      .single();

    if (data?.messages || !error) {
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
    if (email) {
      setIsEmailSubmitted(true);
    }
  }, [email, setIsEmailSubmitted]);

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
    if (email) {
      fetchInitialMessages(email);

      const channel = supabase
        .channel(`chat:${email}`)
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'chat_messages',
            filter: `email=eq.${email}`,
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
            filter: `email=eq.${email}`,
          },
          (payload) =>
            handleDatabaseChange(payload as unknown as DatabaseChangePayload),
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    }
  }, [email, fetchInitialMessages, handleDatabaseChange]);

  const handleEmailSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      try {
        const validatedInput = emailSchema.parse({ email });

        setEmail(validatedInput.email);
        setIsEmailSubmitted(true);

        await fetchInitialMessages(validatedInput.email);
      } catch (err) {
        if (err instanceof z.ZodError) {
          const errorMessage = err.errors[0]?.message ?? 'Invalid email format';
          toast.error(errorMessage, toastOptions);
        } else {
          toast.error('An unexpected error occurred', toastOptions);
        }
      }
    },
    [email, fetchInitialMessages, setEmail, setIsEmailSubmitted],
  );

  const handleSendMessage = useCallback(async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: inputMessage.trim(),
      sender: 'user',
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputMessage('');

    const saveAndSendMessage = async () => {
      try {
        try {
          await saveChat(email, userMessage);
        } catch (error) {
          console.error('Error saving chat:', error);
        }

        try {
          await sendMessage(email, userMessage.text);
        } catch (error) {
          console.error('Error sending message:', error);
        }

        const data = await handleChatRequest(inputMessage);

        if (!data.success) {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              text: data.error || 'Failed to send message',
              sender: 'ai',
            },
          ]);

          return;
        }

        if (data.isAutomated) {
          const aiMessage: Message = {
            id: Date.now(),
            text: data.message,
            sender: 'ai',
          };
          setMessages((prev) => [...prev, aiMessage]);
          await saveChat(email, aiMessage);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        toast.error('Failed to send message', toastOptions);
      } finally {
        setIsLoading(false);
      }
    };

    setIsLoading(true);
    saveAndSendMessage();
  }, [inputMessage, email]);

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
    setEmail('');
    setMessages([]);
    setIsEmailSubmitted(false);

    try {
      await clearChat(email);
    } catch (error) {
      toast.error(`Error deleting chat ${error}`, toastOptions);
    }
    setShowOptions(false);
  }, [email, setEmail, setIsEmailSubmitted]);

  const handleDeleteEmail = useCallback(() => {
    setEmail('');
    setMessages([]);
    setIsEmailSubmitted(false);

    setShowOptions(false);
  }, [setEmail, setIsEmailSubmitted]);

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
              <AvatarImage alt="@user image" src={gravatarURL(email)} />
              <AvatarFallback>{email.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          )}

          {message.sender === 'author' && (
            <Avatar className="mr-2 h-8 w-8">
              <AvatarImage alt="@author image" src={LOGO_IMAGE_PATH} />
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
    email,
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
                <h2 className="font-bold text-white">
                  Chat with {siteMetadata.headerTitle}
                </h2>

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

            {!isEmailSubmitted ? (
              <form
                className="flex flex-1 flex-col justify-center p-4"
                onSubmit={handleEmailSubmit}
              >
                <label
                  className="mb-2 text-sm font-medium text-gray-700"
                  htmlFor="email"
                >
                  Please enter your email to start chatting
                </label>

                <Input
                  required
                  id="email"
                  placeholder="your@email.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <Button className="mt-4" type="submit">
                  Start Chatting
                </Button>
              </form>
            ) : (
              <>
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

                    <Button
                      className="h-10 px-2 py-2"
                      onClick={handleSendMessage}
                    >
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
                            onClick={() =>
                              handleFAQClick(faq.question, faq.answer)
                            }
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
                          <Button
                            className="h-10 w-10"
                            size="icon"
                            variant="ghost"
                          >
                            <MoreVertical className="h-4 w-4" />
                            <span className="sr-only">Open options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuItem onClick={handleDeleteChat}>
                            <span>Delete Chat</span>
                          </DropdownMenuItem>

                          <DropdownMenuItem onClick={handleDeleteEmail}>
                            <span>Delete Email</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Chatbox;
