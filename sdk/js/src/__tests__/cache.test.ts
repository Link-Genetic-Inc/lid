import { MemoryCache } from '../cache';

describe('LinkIdCache', () => {
  let cache: MemoryCache;

  beforeEach(() => {
    jest.useFakeTimers();
    cache = new MemoryCache({ defaultTTL: 5 });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('stores and retrieves a value', async () => {
    await cache.set('linkid:abc', { targetUri: 'https://example.com' } as any);
    expect(await cache.get('linkid:abc')).toBeDefined();
  });

  it('returns null for missing key', async () => {
    expect(await cache.get('linkid:missing')).toBeNull();
  });

  it('expires entries after TTL', async () => {
    await cache.set('linkid:abc', { targetUri: 'https://example.com' } as any);
    jest.advanceTimersByTime(6000);
    expect(await cache.get('linkid:abc')).toBeNull();
  });

  it('clears all entries', async () => {
    await cache.set('linkid:abc', { targetUri: 'https://example.com' } as any);
    await cache.set('linkid:def', { targetUri: 'https://other.com' } as any);
    await cache.clear();
    expect(await cache.get('linkid:abc')).toBeNull();
    expect(await cache.get('linkid:def')).toBeNull();
  });

  it('overwrites existing entry', async () => {
    await cache.set('linkid:abc', { targetUri: 'https://old.com' } as any);
    await cache.set('linkid:abc', { targetUri: 'https://new.com' } as any);
    expect((await cache.get<any>('linkid:abc'))?.targetUri).toBe('https://new.com');
  });
});
