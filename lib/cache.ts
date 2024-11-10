import { LRUCache } from 'lru-cache';

export const localCache = new LRUCache<string, any>({
  max: 1000,
  ttl: 1000 * 60 * 60,
});
