import { createOpenAICompatible } from '@ai-sdk/openai-compatible';

import { generateId, streamText } from 'ai';
import {
  type StreamableValue,
  createAI,
  createStreamableValue,
  getMutableAIState,
} from 'ai/rsc';
import { headers } from 'next/headers';
import 'server-only';
import { saveAIChat } from '../chat';
import { checkRateLimit } from '../rate-limit';
import { RateLimitError } from './error';
import { systemPrompt } from './prompt';
import type { AIActions, AIState, ServerMessage, UIState } from './type';

export async function continueConversation(
  input: string,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
): Promise<StreamableValue<any, any>> {
  'use server';

  // Implement rate limit based on the request's IP
  const header = await headers();
  const ip = (header.get('x-forwarded-for') ?? '127.0.0.2').split(',')[0];

  const { success, error, remaining } = await checkRateLimit(ip);
  if (!success) {
    throw new RateLimitError(remaining, error);
  }

  const history = getMutableAIState<typeof AI>('messages');

  // Update the AI state with the new user message.
  history.update([
    ...(history.get() as ServerMessage[]),
    { role: 'user', content: input, id: generateId() },
  ]);

  const stream = createStreamableValue();

  const nebius = createOpenAICompatible({
    name: 'nebius',
    apiKey: process.env.NEBIUS_API_KEY,
    baseURL: process.env.NEBIUS_URL,
  });

  try {
    (async () => {
      const { textStream } = streamText({
        model: nebius('meta-llama/Llama-3.2-3B-Instruct'),
        system: await systemPrompt(),
        messages: history.get() as ServerMessage[],
        onFinish(event) {
          history.done([
            ...(history.get() as ServerMessage[]),
            { role: 'assistant', content: event.text, id: generateId() },
          ]);
        },
      });

      for await (const text of textStream) {
        stream.update(text);
      }

      stream.done();
    })();

    return stream.value;
  } catch (error) {
    stream.done();
    throw new Error('Failed to send message');
  }
}

// Create the AI provider with the initial states and allowed actions
export const AI = createAI<AIState, UIState, AIActions>({
  initialAIState: { messages: [], id: generateId(), location: '' },
  initialUIState: [],
  actions: {
    continueConversation,
  },
  onSetAIState: async ({ state, done }) => {
    'use server';

    if (done) {
      await saveAIChat(state);
    }
  },
});
