export type Message = {
  id: number;
  text: string;
  sender: 'user' | 'ai' | 'author';
};

export type Question = {
  content: string;
};

export interface ChatResponse {
  success: boolean;
  message: string;
  isAutomated: boolean;
}

export type FAQ = {
  question: string;
  answer: string;
};

export type ChatMessage = {
  text: string;
  sender: 'user' | 'ai' | 'author';
};

export type ChatConversation = {
  ipAddress: string;
  messages: ChatMessage[];
};

export type DBChatMessage = {
  id: number;
  ip_address: string;
  messages: Message[];
  created_at: string;
  updated_at: string;
};

export type DatabaseChangePayload = {
  commit_timestamp: string;
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
  new: DBChatMessage;
  old: DBChatMessage | null;
  schema: string;
  table: string;
};
