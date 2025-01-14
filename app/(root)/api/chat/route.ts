import { type NextRequest, NextResponse } from 'next/server';

import { z } from 'zod';

import { checkRateLimit } from '@/lib/rate-limit';
import redis from '@/utils/redis';
import { supabase } from '@/utils/supabase/client';

const CACHE_TTL = 300;

const requestSchema = z.object({
  message: z.string().min(1).max(1000),
});

const url = 'https://chat.surajrimal.dev/api/chat/completions';
const headers = {
  Authorization:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImNmZTBmYmQ3LTFkNTgtNGE5Yi1hOGIyLTFmOWUxMmUwZmVhNiJ9.wfPX5vOCOwg0t-WxNO46I_mh6_Fp9lNIkZAaob48lXU',
  'Content-Type': 'application/json',
};

async function getAIResponse(message: string) {
  const payload = {
    model: 'suraj-chatbot',
    messages: [{ role: 'user', content: message }],
    files: [{ type: 'collection', id: 'c97ee20c-772b-414e-a5c5-289911278f47' }],
  };

  const response = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Failed to fetch AI response');
  }

  const responseJson = await response.json();

  return responseJson.choices[0].message.content;
}

export interface ValidatedChatData {
  email: string;
  message: string;
  ipAddress: string;
}

export async function POST(req: NextRequest) {
  try {
    // 1. Rate limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const limiter = await checkRateLimit(ip);
    if (!limiter.success) {
      return NextResponse.json({ error: limiter.error }, { status: 429 });
    }

    // 2. Input validation
    const body = await req.json();
    const validated = requestSchema.safeParse(body);
    if (!validated.success) {
      return NextResponse.json(
        { error: 'Please check your message again' },
        { status: 400 },
      );
    }

    // 4. Process request
    const { message } = validated.data;

    // 3. Check cache first
    const cacheKey = `chat:${message}`;
    const cachedResponse = await redis.get(cacheKey);
    if (cachedResponse) {
      return NextResponse.json(cachedResponse);
    }

    // 5. Parallel processing where possible
    const authorStatus = await supabase
      .from('author_status')
      .select('last_active')
      .eq('id', 'author')
      .single();

    // 6. Early return for offline author
    const isAuthorOnline =
      authorStatus?.data &&
      Date.now() - new Date(authorStatus.data.last_active).getTime() <
        5 * 60 * 1000;

    // 7. Generate AI response if author is offline
    let aiResponse: string | null = null;

    if (!isAuthorOnline) {
      aiResponse = await getAIResponse(message);
    }

    // 8. Prepare response
    const response = {
      success: true,
      message: aiResponse || 'Message received. Author will respond soon.',
      isAutomated: !!aiResponse,
    };

    // 9. Cache the response
    await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(response));

    return NextResponse.json(response);
  } catch (error) {
    console.error('Chat API Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
