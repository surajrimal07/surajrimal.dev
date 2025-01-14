import type { StreamableValue } from 'ai/rsc/dist';
import type { ReactNode } from 'react';

export type UIState = ChatMessage[];

export type ServerMessage = {
  role: 'user' | 'assistant';
  content: string;
  id: string;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'error';
  display: ReactNode;
};

export type AIState = {
  id: string;
  messages: ServerMessage[];
  location: string;
};

export type AIActions = {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  continueConversation: (input: string) => Promise<StreamableValue<any, any>>;
};

export interface Conversation {
  id: string;
  created_at: Date | null;
  preview: string | null;
  location: string;
}
