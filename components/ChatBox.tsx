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
import { clearChat } from '@/lib/chat';
import useChatStore from '@/lib/hooks/chatState';
import { sendMessage } from '@/lib/telegram';
import { emailSchema } from '@/lib/validation/email';
import { DatabaseChangePayload, Message } from '@/types/chat';
import { gravatarURL } from '@/utils/gravatarHash';
import { supabase } from '@/utils/supabase/client';
import { toastOptions } from '@/utils/toast';

interface MessageTimeProps {
  time: string;
  isVisible: boolean;
}

interface TimeSeparatorProps {
  time: string;
}

interface AuthorStatusPayload {
  new: {
    last_active: string;
  };
}

const MessageTime: React.FC<MessageTimeProps> = React.memo(
  ({ time, isVisible }) => (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className="text-xs text-gray-500"
        >
          {time}
        </motion.div>
      )}
    </AnimatePresence>
  )
);

MessageTime.displayName = 'MessageTime';

const TimeSeparator: React.FC<TimeSeparatorProps> = React.memo(({ time }) => (
  <div className="my-2 flex items-center justify-center">
    <div className="h-px flex-grow bg-gray-500"></div>
    <span className="mx-2 text-xs text-gray-500">{time}</span>
    <div className="h-px flex-grow bg-gray-500"></div>
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
  const [selectedMessageId, setSelectedMessageId] = useState(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const fetchInitialMessages = useCallback(async (email: string) => {
    const { data, error } = await supabase
      .from('chat_messages')
      .select('messages')
      .eq('email', email)
      .single();

    if ((data && data.messages) || !error) {
      setMessages(data.messages);
    } else {
      setMessages([
        {
          id: Date.now(),
          text: 'Hello! How can I help you with my blog today?',
          sender: 'bot',
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
    [isCollapsed, updateAuthorStatus]
  );

  const handleFAQClick = useCallback((question: string, answer: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: question, sender: 'user' },
      { id: Date.now() + 1, text: answer, sender: 'bot' },
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
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isCollapsed, messages, scrollToBottom]);

  //author status
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
        }
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
            handleDatabaseChange(payload as unknown as DatabaseChangePayload)
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
            handleDatabaseChange(payload as unknown as DatabaseChangePayload)
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
          const errorMessage = err.errors[0].message;
          toast.error(errorMessage, toastOptions);
        } else {
          toast.error('An unexpected error occurred', toastOptions);
        }
      }
    },
    [email, fetchInitialMessages, setEmail, setIsEmailSubmitted]
  );

  const handleSendMessage = useCallback(async () => {
    if (inputMessage.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        text: inputMessage.trim(),
        sender: 'user',
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputMessage('');

      await sendMessage(email, userMessage.text);

      if (!isAuthorOnline && !isCollapsed) {
        const botMessage: Message = {
          id: Date.now() + 1,
          text: 'Author is currently offline. He will reply as soon as possible.',
          sender: 'bot',
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    }
  }, [inputMessage, email, isAuthorOnline, isCollapsed]);

  const handleHide = useCallback(() => {
    setChatEnabled(false);
  }, [setChatEnabled]);

  const handleMessageClick = useCallback((id) => {
    setSelectedMessageId((prevId) => (prevId === id ? null : id));
  }, []);

  const shouldShowTimeSeparator = useCallback((currentMessage, nextMessage) => {
    if (!nextMessage) return false;
    const timeDiff = nextMessage.id - currentMessage.id;
    return timeDiff > 600000;
  }, []);

  const handleDeleteChat = async () => {
    setEmail('');
    setMessages([]);
    setIsEmailSubmitted(false);

    try {
      await clearChat(email);
    } catch (error) {
      toast.error(`Error deleting chat ${error}`, toastOptions);
    }

    setShowOptions(false);
  };

  const handleDeleteEmail = () => {
    setEmail('');
    setMessages([]);
    setIsEmailSubmitted(false);
    setShowOptions(false);
  };

  const renderMessages = useMemo(() => {
    return messages.map((message, index) => (
      <React.Fragment key={message.id}>
        <div
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
              <AvatarImage src={gravatarURL(email)} alt="@user image" />
              <AvatarFallback>{email.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
          )}

          {message.sender === 'author' && (
            <Avatar className="mr-2 h-8 w-8">
              <AvatarImage src={LOGO_IMAGE_PATH} alt="@author image" />
              <AvatarFallback>SR</AvatarFallback>
            </Avatar>
          )}

          {message.sender === 'bot' && (
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
            </div>
            <MessageTime
              time={formatMessageTime(message.id)}
              isVisible={selectedMessageId === message.id}
            />
          </div>
        </div>

        {shouldShowTimeSeparator(message, messages[index + 1]) && (
          <TimeSeparator time={formatMessageTime(message.id)} />
        )}
      </React.Fragment>
    ));
  }, [
    messages,
    email,
    handleMessageClick,
    selectedMessageId,
    shouldShowTimeSeparator,
  ]);

  const renderCollapsedState = () => {
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      return (
        <div key="collapsed-icon" className="relative">
          <Button
            onClick={() => {
              setIsCollapsed(false);
            }}
            className={`h-12 w-12 rounded-full p-0 ${isAuthorOnline ? 'bg-green-500' : 'bg-red-500'}`}
          >
            <MessageCircle className="h-6 w-6 text-white" />
          </Button>
        </div>
      );
    } else {
      return (
        <motion.div
          key="collapsed"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0 }}
          transition={{ duration: 0.2, ease: 'easeInOut' }}
        >
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(59, 130, 246, 0)',
                '0 0 0 10px rgba(59, 130, 246, 0.1)',
                '0 0 0 20px rgba(59, 130, 246, 0)',
              ],
            }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="absolute inset-0 rounded-lg"
          />
          <div
            className={clsx(
              'relative flex items-center justify-between rounded-lg px-0 py-2 shadow-lg transition-all duration-300 hover:shadow-xl',
              {
                'bg-green-800': isAuthorOnline,
                'bg-primary-600': !isAuthorOnline,
              }
            )}
          >
            <Button
              onClick={() => setIsCollapsed(false)}
              className="h-auto w-40 bg-transparent p-0 hover:bg-transparent"
            >
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <span className="font-semibold text-white">
                    Chat with {siteMetadata.headerTitle}
                  </span>
                  {newMessage && (
                    <Badge variant="neutral" className="ml-1 p-0 text-xs">
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
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                handleHide();
              }}
              className="bg-transparent text-white hover:bg-white/20"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      );
    }
  };

  if (!chatEnabled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence mode="wait">
        {isCollapsed ? (
          renderCollapsedState()
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="sm:max-w-70 flex h-[32rem] w-96 flex-col overflow-hidden rounded-lg border border-gray-200 bg-black shadow-2xl"
          >
            <div
              className={clsx('flex items-center justify-between p-2', {
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
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(true)}
                className="hover:bg-white/20"
              >
                <X className="h-4 w-4 text-white" />
              </Button>
            </div>

            {!isEmailSubmitted ? (
              <form
                onSubmit={handleEmailSubmit}
                className="flex flex-1 flex-col justify-center p-4"
              >
                <label
                  htmlFor="email"
                  className="mb-2 text-sm font-medium text-gray-700"
                >
                  Please enter your email to start chatting
                </label>
                <Input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button className="mt-4" type="submit">
                  Start Chatting
                </Button>
              </form>
            ) : (
              <>
                <ScrollArea className="h-[calc(100%-4rem)] flex-1 overflow-y-auto p-4">
                  {renderMessages}
                  <div ref={messagesEndRef} />
                </ScrollArea>
                <div className="border-t border-gray-200 p-2">
                  <div className="flex space-x-2">
                    <div className="flex-grow">
                      <Input
                        type="text"
                        placeholder="Type your message..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) =>
                          e.key === 'Enter' && handleSendMessage()
                        }
                        className="w-full"
                      />
                    </div>
                    <Button
                      onClick={handleSendMessage}
                      className="h-10 px-2 py-2"
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
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10"
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
