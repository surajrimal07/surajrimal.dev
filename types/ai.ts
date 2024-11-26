export interface AIServiceConfig {
  apiKey: string;
  baseURL?: string;
  model?: string;
}

export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface AIService {
  getChatResponse(messages: AIMessage[], context: string): Promise<string>;
}
