import { z } from 'zod';

import type { Message } from '@/types/chat';
import redis from '@/utils/redis';
import { supabase } from '@/utils/supabase/client';

type DatabaseMessage = {
  id: number;
  text: string;
  sender: 'user' | 'bot' | 'author';
};

export async function saveChat(
  email: string,
  newMessage: Message,
): Promise<void> {
  const { data: existingData, error: fetchError } = await supabase
    .from('chat_messages')
    .select('messages')
    .eq('email', email)
    .single();

  let messages: DatabaseMessage[] = [];

  if (fetchError && fetchError.code === 'PGRST116') {
    const { error: insertError } = await supabase.from('chat_messages').insert([
      {
        email,
        messages: [
          {
            id: newMessage.id,
            text: newMessage.text,
            sender: newMessage.sender,
          },
        ],
      },
    ]);

    if (insertError) {
      console.error('Error inserting new chat:', insertError);
    }
    return;
  }
  if (fetchError) {
    console.error('Error fetching conversation:', fetchError);
    return;
  }

  if (existingData && Array.isArray(existingData.messages)) {
    messages = [...existingData.messages];
  }

  messages.push({
    id: newMessage.id,
    text: newMessage.text,
    sender: newMessage.sender,
  });

  const { error: updateError } = await supabase
    .from('chat_messages')
    .update({ messages })
    .eq('email', email);

  if (updateError) {
    console.error('Error updating chat messages:', updateError);
  }
}

export async function loadChat(email: string): Promise<Message[]> {
  if (!email) {
    return [];
  }

  const { data, error } = await supabase
    .from('chat_messages')
    .select('messages')
    .eq('email', email)
    .single();

  if (error && error.code !== 'PGRST116') {
    console.error('Error loading chat messages:', error);
    return [];
  }

  if (!data || !Array.isArray(data.messages)) {
    return [];
  }

  return data.messages.map((message: DatabaseMessage) => ({
    id: message.id,
    text: message.text,
    sender: message.sender,
  }));
}

export async function clearChat(email: string): Promise<void> {
  const { error } = await supabase
    .from('chat_messages')
    .update({ messages: [] })
    .eq('email', email);

  if (error) {
    console.error('Error clearing chat history:', error);
  }
}

const CACHE_TTL = 300; // Cache TTL in seconds
const requestSchema = z.object({
  message: z.string().min(1).max(1000),
});

export async function handleChatRequest(message: string) {
  try {
    // 2. Input Validation
    const validated = requestSchema.safeParse({ message });
    if (!validated.success) {
      return { error: 'Invalid message input', status: 400 };
    }

    // 3. Check Cache
    const cacheKey = `chat:${message}`;
    const cachedResponse = await redis.get(cacheKey);
    if (typeof cachedResponse === 'string') return JSON.parse(cachedResponse);

    // 4. Check Author Status
    const { data: authorStatus } = await supabase
      .from('author_status')
      .select('last_active')
      .eq('id', 'author')
      .single();

    const isAuthorOnline =
      authorStatus?.last_active &&
      Date.now() - new Date(authorStatus.last_active).getTime() < 5 * 60 * 1000;

    const responsePayload = {
      success: true,
      message: 'Message received. Author will respond soon.',
      isAutomated: false,
    };

    if (isAuthorOnline) {
      return responsePayload;
    }

    const headers = {
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmZTBmYmQ3LTFkNTgtNGE5Yi1hOGIyLTFmOWUxMmUwZmVhNiJ9.wfPX5vOCOwg0t-WxNO46I_mh6_Fp9lNIkZAaob48lXU',
      'Content-Type': 'application/json',
    };

    const payload = {
      model: 'suraj-chatbot',
      messages: [{ role: 'user', content: message }],
      files: [
        { type: 'collection', id: 'c97ee20c-772b-414e-a5c5-289911278f47' },
      ],
    };

    const response = await fetch(
      'https://chat.surajrimal.dev/api/chat/completions',
      {
        method: 'POST',
        headers,
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      return responsePayload;
    }

    const responseJson = await response.json();

    // 6. Prepare Response
    const aiResponse = {
      success: true,
      message: responseJson.choices[0]?.message?.content,
      isAutomated: !!response,
    };

    // 7. Cache the Response
    await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(aiResponse));

    return aiResponse;
  } catch (error) {
    console.error('Error handling chat request:', error);
    const responsePayload = {
      success: true,
      message: 'Message received. Author will respond soon.',
      isAutomated: false,
    };
    return responsePayload;
  }
}
