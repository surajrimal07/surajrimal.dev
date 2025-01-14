import type { NextRequest } from 'next/server';

// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import { createHash } from 'crypto';

import { localCache } from '@/lib/cache';

export const getSessionId = (req: NextRequest) => {
  const ipAddress = req.headers['x-forwarded-for'] || 'localhost';

  const cached = localCache.get('session-id');
  if (cached) {
    return cached as string;
  }

  const currentSessionId = createHash('md5')
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    .update(ipAddress + process.env.SALT_IP_ADDRESS!, 'utf-8')
    .digest('hex');

  localCache.set('session-id', currentSessionId);

  return currentSessionId;
};

export function hashIpAddress(ipAddress: string): string {
  const cacheKey = `ip-hash-${ipAddress}`;
  const cached = localCache.get(cacheKey);
  if (cached) return cached as string;

  const salt = process.env.IP_HASH_SALT || 'default-salt';

  const hash = createHash('md5')
    .update(`${ipAddress}${salt}`)
    .digest('hex')
    .slice(0, 8);

  localCache.set(cacheKey, hash);
  return hash;
}
