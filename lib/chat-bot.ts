'use server';

import redis from '@/utils/redis';
import { supabase } from '@/utils/supabase/client';
import { z } from 'zod';

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
      Authorization: `Bearer ${process.env.CHAT_TOKEN}`,
      'Content-Type': 'application/json',
    };

    const payload = {
      model: process.env.CHAT_MODEL,
      messages: [{ role: 'user', content: message }],
      files: [{ type: 'collection', id: process.env.CHAT_COLLECTION_ID }],
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
