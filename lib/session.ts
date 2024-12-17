import type { NextRequest } from 'next/server';

import { createHash } from 'node:crypto';

import { localCache } from '@/lib/cache';

export const getSessionId = (req: NextRequest) => {
  const ipAddress = req.headers['x-forwarded-for'] || 'localhost';

  const cached = localCache.get('session-id');
  if (cached) {
    return cached as string;
  }

  const currentSessionId = createHash('md5')
    .update(ipAddress + process.env.SALT_IP_ADDRESS!, 'utf-8')
    .digest('hex');

  localCache.set('session-id', currentSessionId);

  return currentSessionId;
};
