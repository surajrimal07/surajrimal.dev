import { generateId, streamText } from 'ai';
import {
  type StreamableValue,
  createAI,
  createStreamableValue,
  getMutableAIState,
} from 'ai/rsc';
import 'server-only';
import { saveAIChat } from '../chat';
import { nebius, systemPrompt } from './chat-lib';
import type { AIActions, AIState, ServerMessage, UIState } from './type';

export async function continueConversation(
  input: string,
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
): Promise<StreamableValue<any, any>> {
  'use server';

  const history = getMutableAIState<typeof AI>('messages');

  // Update the AI state with the new user message.
  history.update([
    ...(history.get() as ServerMessage[]),
    { role: 'user', content: input, id: generateId() },
  ]);

  const stream = createStreamableValue();

  try {
    (async () => {
      console.log('system prompt', await systemPrompt(input));
      const { textStream } = streamText({
        model: nebius('meta-llama/Llama-3.2-3B-Instruct'),
        system: await systemPrompt(input),

        messages: history.get() as ServerMessage[],
        maxTokens: 250,
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
