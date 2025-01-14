import { LRUCache } from 'lru-cache';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const localCache = new LRUCache<string, any>({
  max: 1000,
  ttl: 1000 * 60 * 120,
});
