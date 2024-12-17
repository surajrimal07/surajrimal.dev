import { type NextRequest, NextResponse } from 'next/server';

import OpenAI from 'openai';
import { z } from 'zod';

import { getEmbeddings, searchSimilarDocs } from '@/lib/embeddings';
import { checkRateLimit } from '@/lib/rate-limit';
import redis from '@/utils/redis';
import { supabase } from '@/utils/supabase/client';

const CACHE_TTL = 300;

const requestSchema = z.object({
  message: z.string().min(1).max(1000),
});

// Initialize OpenAI with Mistral config
const openAIClient = new OpenAI({
  baseURL: process.env.OPENAI_BASE_URL || '',
  apiKey: process.env.OPENAI_API_KEY || '',
  defaultHeaders: {
    'Content-Type': 'application/json',
  },
});

async function getAIResponse(message: string, context: string) {
  const response = await openAIClient.chat.completions.create({
    model: 'mistral-medium',
    messages: [
      {
        role: 'system',
        content: `You are Suraj Rimal's personal AI assistant. STRICTLY respond in MAXIMUM 2 lines. If uncertain, say 'I do not know this answer.' NO speculation. Use ONLY explicitly verified facts. CRITICAL: Absolutely NO generating information not directly confirmed. Speak confidently about Suraj's life using only verified information. Below is the context:  ${context}`,
      },
      {
        role: 'user',
        content: message,
      },
    ],
    temperature: 0.1,
    max_tokens: 50,
    top_p: 0.3,
  });

  return response.choices[0].message.content;
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
        { status: 400 }
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
      const questionEmbedding = await getEmbeddings(message);
      const relevantContext = await searchSimilarDocs(questionEmbedding);
      aiResponse = await getAIResponse(message, relevantContext);
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
      { status: 500 }
    );
  }
}
