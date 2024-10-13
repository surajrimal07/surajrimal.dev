export type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot' | 'author';
};

export type FAQ = {
  question: string;
  answer: string;
};

export type ChatMessage = {
  text: string;
  sender: 'user' | 'bot' | 'author';
};

export type ChatConversation = {
  email: string;
  messages: ChatMessage[];
};

export type DBChatMessage = {
  id: number;
  email: string;
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
