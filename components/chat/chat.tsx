'use client';

import { Separator } from '@/components/ui/separator';
import { RateLimitError } from '@/lib/chat/error';
import type { UIState } from '@/lib/chat/type';
import { useActions, useUIState } from '@/lib/hooks/use-ai';
import type { RateLimitResult } from '@/lib/rate-limit';
import type { Question } from '@/types/chat';
import { generateId } from 'ai';
import { readStreamableValue } from 'ai/rsc';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Content } from './content';
import { Conversation } from './conversation';
import { EmptyConversation } from './empty-conversation';
import InfoDialog from './info-dialog';
import { Loader } from './loader';
import { PromptForm } from './prompt-form';
import RateLimit from './rate-limit';

type ChatProps = {
  questions: Question[];
};

export default function Chat({ questions }: ChatProps) {
  const [messages, setMessages] = useUIState();
  const { continueConversation } = useActions();
  const [isLoading, setIsLoading] = useState(false);
  const [rateLimit, setRateLimit] = useState<RateLimitResult>({
    success: false,
    remaining_soft: 0,
    remaining_hard: 0,
  });

  useEffect(() => {
    async function initRateLimit() {
      const initialLimit = await RateLimit();
      setRateLimit(initialLimit);
    }

    initRateLimit();
  }, []);

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
      //check rate limit
      console.time('api-response');

      const limits = await RateLimit(true);
      if (!limits.success) {
        throw new RateLimitError(
          limits.remaining_soft,
          limits.remaining_hard,
          limits.retryAfter,
          limits.error,
        );
      }

      setRateLimit(limits);
      console.timeLog('api-response');

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

    console.timeLog('api-response');

    console.timeEnd('api-response');
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
        <InfoDialog className="hidden sm:flex" rateLimit={rateLimit} />
        <PromptForm addMessage={addMessage} isLoading={isLoading} />
        <div />
      </div>
    </div>
  );
}
