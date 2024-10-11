export type Message = {
  id: number;
  text: string;
  sender: 'user' | 'bot';
};

export type FAQ = {
  question: string;
  answer: string;
};

export type ChatMessage = {
  text: string;
  sender: 'user' | 'bot';
};

export type ChatConversation = {
  email: string;
  messages: ChatMessage[];
};
