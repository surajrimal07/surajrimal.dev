'use client';

import { Separator } from '@/components/ui/separator';
import { RateLimitError } from '@/lib/chat/error';
import type { UIState } from '@/lib/chat/type';
import { useActions, useUIState } from '@/lib/hooks/use-ai';
import type { Question } from '@/types/chat';
import { generateId } from 'ai';
import { readStreamableValue } from 'ai/rsc';
import { AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { Content } from './content';
import { Conversation } from './conversation';
import { EmptyConversation } from './empty-conversation';
import InfoDialog from './info-dialog';
import { Loader } from './loader';
import { PromptForm } from './prompt-form';

type ChatProps = {
  questions: Question[];
};

export default function Chat({ questions }: ChatProps) {
  const [messages, setMessages] = useUIState();
  const { continueConversation } = useActions();
  const [isLoading, setIsLoading] = useState(false);

  async function addMessage(input: string) {
    const value = input.trim();
    if (!value) return;

    // Add user message to the state
    const newMessages: UIState = [
      ...messages,
      { id: generateId(), display: value, role: 'user' },
    ];

    setMessages(newMessages);
    setIsLoading(true);

    // Add a placeholder assistant message
    const assistantMessageId = generateId();
    setMessages((prev) => [
      ...prev,
      {
        id: assistantMessageId,
        display: <Loader />,
        role: 'assistant',
      },
    ]);

    try {
      // Get the assistant's response
      const result = await continueConversation(value);

      let textContent = '';

      for await (const delta of readStreamableValue(result)) {
        textContent = `${textContent}${delta}`;

        setMessages([
          ...newMessages,
          {
            id: assistantMessageId,
            role: 'assistant',
            display: <Content content={textContent} />,
          },
        ]);
      }
    } catch (error) {
      setMessages([
        ...newMessages,
        {
          id: assistantMessageId,
          role: 'error',
          display:
            error instanceof RateLimitError
              ? `Whoa, easy there big talker! You've hit the rate limit. Give it a moment before asking more. ${error.error}`
              : 'Oops, something went wrong!',
        },
      ]);
    }
    setIsLoading(false);
  }

  return (
    <div className="relative flex h-full w-full flex-col items-center">
      <AnimatePresence initial={false}>
        {messages.length === 0 && (
          <EmptyConversation
            addMessage={addMessage}
            questions={questions}
            key="empty"
          />
        )}
        <Conversation messages={messages} key="conversation" />
      </AnimatePresence>
      <Separator />
      <div className="flex w-full justify-between p-1 sm:p-4">
        <InfoDialog className="hidden sm:flex" />
        <PromptForm addMessage={addMessage} isLoading={isLoading} />
        <div />
      </div>
    </div>
  );
}
