'use server';

import { NextRequest, NextResponse } from 'next/server';

import Redis from 'ioredis';

const redisUrl = process.env.REDIS_URL!;

const redisSubscriber = new Redis(redisUrl, {
  maxRetriesPerRequest: 50,
  tls: {
    rejectUnauthorized: false,
  },
});

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('clientId');
  const encoder = new TextEncoder();
  const setKey = `chat:${email}`;

  if (!email) {
    return new NextResponse('Client ID is required', { status: 400 });
  }

  const customReadable = new ReadableStream({
    async start(controller) {
      let isControllerClosed = false;

      redisSubscriber.subscribe(setKey, (err) => {
        if (err) console.error('Redis subscription error:', err);
      });

      redisSubscriber.on('message', (channel, message) => {
        if (channel === setKey && !isControllerClosed) {
          try {
            controller.enqueue(encoder.encode(`data: ${message}\n\n`));
          } catch (error) {
            console.error('Error enqueueing message:', error);
            isControllerClosed = true;
            redisSubscriber.unsubscribe(setKey);
          }
        }
      });

      redisSubscriber.on('error', (error) => {
        console.error('Redis error:', error);
        if (!isControllerClosed) {
          controller.error(error);
          isControllerClosed = true;
        }
      });

      request.signal.addEventListener('abort', () => {
        console.log('Request aborted');
        if (!isControllerClosed) {
          controller.close();
          isControllerClosed = true;
        }
        redisSubscriber.unsubscribe(setKey);
      });
    },
    cancel() {
      console.log('Stream cancelled');
      redisSubscriber.unsubscribe(setKey);
    },
  });

  return new Response(customReadable, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    },
  });
}
