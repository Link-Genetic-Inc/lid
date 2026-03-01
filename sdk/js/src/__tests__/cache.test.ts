import { LinkIdCache } from '../cache';

describe('LinkIdCache', () => {
  let cache: LinkIdCache;

  beforeEach(() => {
    jest.useFakeTimers();
    cache = new LinkIdCache({ ttlMs: 5000 });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('stores and retrieves a value', () => {
    cache.set('linkid:abc', { targetUri: 'https://example.com' } as any);
    expect(cache.get('linkid:abc')).toBeDefined();
  });

  it('returns null for missing key', () => {
    expect(cache.get('linkid:missing')).toBeNull();
  });

  it('expires entries after TTL', () => {
    cache.set('linkid:abc', { targetUri: 'https://example.com' } as any);
    jest.advanceTimersByTime(6000);
    expect(cache.get('linkid:abc')).toBeNull();
  });

  it('clears all entries', () => {
    cache.set('linkid:abc', { targetUri: 'https://example.com' } as any);
    cache.set('linkid:def', { targetUri: 'https://other.com' } as any);
    cache.clear();
    expect(cache.get('linkid:abc')).toBeNull();
    expect(cache.get('linkid:def')).toBeNull();
  });

  it('overwrites existing entry', () => {
    cache.set('linkid:abc', { targetUri: 'https://old.com' } as any);
    cache.set('linkid:abc', { targetUri: 'https://new.com' } as any);
    expect(cache.get('linkid:abc')?.targetUri).toBe('https://new.com');
  });
});
