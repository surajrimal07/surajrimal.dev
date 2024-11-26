import OpenAI from 'openai';

import { AIMessage, AIService, AIServiceConfig } from '@/types/ai';

export class OpenAIService implements AIService {
  private client: OpenAI;
  constructor(config: AIServiceConfig) {
    this.client = new OpenAI({
      apiKey: config.apiKey,
      baseURL: config.baseURL,
    });
  }
  async getChatResponse(
    messages: AIMessage[],
    context: string
  ): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant for a blog. Use this context to answer questions: ${context}`,
        },
        ...messages,
      ],
    });
    return response.choices[0].message.content || '';
  }
}
