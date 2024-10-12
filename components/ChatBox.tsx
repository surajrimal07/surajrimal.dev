'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { HelpCircle, Send, X } from 'lucide-react';

import usePlaySound from '@/components/PlaySound';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LOGO_IMAGE_PATH } from '@/constants';
import { simpleFAQs } from '@/data/chatFAQ';
import { loadChat } from '@/lib/chat';
import useChatStore from '@/lib/hooks/chatState';
import { sendMessage } from '@/lib/telegram';
import { Message } from '@/types/chat';

const Chatbox: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [email, setEmail] = useState('');
  const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showFAQ, setShowFAQ] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { chatEnabled, setChatEnabled } = useChatStore();
  const [newMessage, setNewMessage] = useState(false);
  const [isAuthorOnline, setIsAuthorOnline] = useState(false);

  const { playSound } = usePlaySound({
    filePath: '/static/sounds/message.mp3',
    volume: 0.7,
  });

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (!isCollapsed) {
      const timer = setTimeout(() => {
        scrollToBottom();
        setNewMessage(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isCollapsed, messages, scrollToBottom]);

  const listenSSE = useCallback(
    (callback: (event: MessageEvent) => void, email: string) => {
      const eventSource = new EventSource(
        `/api/stream?clientId=${encodeURIComponent(email)}`,
        {
          withCredentials: true,
        }
      );

      eventSource.onmessage = callback;

      return () => {
        eventSource.close();
      };
    },
    []
  );

  useEffect(() => {
    if (email) {
      const cleanup = listenSSE((event) => {
        setIsAuthorOnline(true);
        const data = JSON.parse(event.data);
        if (data.text) {
          setMessages((prev) => [
            ...prev,
            { id: Date.now(), text: data.text, sender: 'bot' },
          ]);
          if (isCollapsed) {
            playSound();
            setNewMessage(true);
          }
        }
      }, email);

      return cleanup;
    }
  }, [email, isCollapsed, listenSSE, playSound]);

  useEffect(() => {
    const savedEmail = localStorage.getItem('chatboxEmail');
    if (savedEmail) {
      setEmail(savedEmail);
      setIsEmailSubmitted(true);
      loadChat(savedEmail).then(setMessages);
    }
  }, []);

  useEffect(() => {
    if (isEmailSubmitted) {
      loadChat(email).then((loadedMessages) => {
        setMessages(
          loadedMessages.length > 0
            ? loadedMessages
            : [
                {
                  id: 1,
                  text: 'Hello! How can I help you with my blog today?',
                  sender: 'bot',
                },
              ]
        );
      });
    }
  }, [isEmailSubmitted, email]);

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('chatboxEmail', email);
    setIsEmailSubmitted(true);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        text: inputMessage.trim(),
        sender: 'user',
      };
      setMessages((prev) => [...prev, userMessage]);
      setInputMessage('');
      await sendMessage(email, userMessage.text);
    }
  };

  const handleFAQClick = useCallback((question: string, answer: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: question, sender: 'user' },
      { id: Date.now() + 1, text: answer, sender: 'bot' },
    ]);
    setShowFAQ(false);
  }, []);

  const handleHide = () => {
    setChatEnabled(false);
  };

  if (!chatEnabled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence mode="wait">
        {isCollapsed ? (
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
              transition={{
                repeat: Infinity,
                duration: 1.5,
              }}
              className="absolute inset-0 rounded-lg"
            />
            <div className="relative flex items-center justify-between rounded-lg bg-gradient-to-r from-rose-400 to-primary-500 px-0 py-2 shadow-lg transition-all duration-300 hover:shadow-xl">
              <Button
                onClick={() => setIsCollapsed(false)}
                className="h-auto w-40 bg-transparent p-0 hover:bg-transparent"
              >
                <div className="flex flex-col items-start">
                  <div className="flex items-center">
                    <span className="font-semibold text-white">
                      Chat with the Me
                    </span>
                    {newMessage && (
                      <Badge variant="neutral" className="ml-1 p-0 text-xs">
                        New
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-white opacity-80">
                    I am online now
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
        ) : (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="flex h-[32rem] w-80 flex-col overflow-hidden rounded-lg border border-gray-200 bg-black shadow-2xl"
          >
            <div className="flex items-center justify-between bg-gradient-to-r from-rose-400 to-primary-500 p-2">
              <h2 className="font-bold text-white">Chat with the Me</h2>
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
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
                    >
                      {message.sender === 'user' && (
                        <Avatar className="mr-2 h-8 w-8">
                          <AvatarFallback>
                            {email.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                      )}

                      {message.sender === 'bot' && (
                        <>
                          {isAuthorOnline ? (
                            <Avatar className="mr-2 h-8 w-8">
                              <AvatarImage
                                src={LOGO_IMAGE_PATH}
                                alt="@author image"
                              />
                              <AvatarFallback>SR</AvatarFallback>
                            </Avatar>
                          ) : (
                            <div className="mr-2 flex h-8 w-8 items-center justify-center">
                              <span className="text-2xl">🤖</span>
                            </div>
                          )}
                        </>
                      )}

                      <div
                        className={`max-w-[80%] rounded-lg p-3 ${
                          message.sender === 'user'
                            ? 'bg-primary-500 text-white'
                            : 'bg-gray-900 text-white'
                        }`}
                      >
                        {message.text}
                      </div>
                    </div>
                  ))}
                  {/* {isTyping && (
                    <div className="mb-4 flex justify-start">
                      <div className="mr-2 flex h-8 w-8 items-center justify-center">
                        <span className="text-2xl">🤖</span>
                      </div>
                      <div className="rounded-lg bg-gray-900 p-3 text-gray-800">
                        <div className="flex space-x-2">
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500"></div>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 delay-100"></div>
                          <div className="h-2 w-2 animate-bounce rounded-full bg-gray-500 delay-200"></div>
                        </div>
                      </div>
                    </div>
                  )} */}
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
                    <div className="relative">
                      <Button
                        onClick={() => setShowFAQ(!showFAQ)}
                        className="h-10 px-2 py-1"
                      >
                        <HelpCircle className="h-4 w-4" />
                      </Button>
                      <AnimatePresence>
                        {showFAQ && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute bottom-full right-0 z-10 mb-2 w-72 rounded-lg border border-gray-200 bg-black p-2 shadow-lg"
                          >
                            {simpleFAQs.map((faq, index) => (
                              <Button
                                key={index}
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  handleFAQClick(faq.question, faq.answer)
                                }
                                className="mb-1 w-full justify-start text-left text-xs"
                              >
                                {faq.question}
                              </Button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
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
