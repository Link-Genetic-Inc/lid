import { LinkIDClient } from '../client';
import { LinkIDError } from '../errors';

const RESOLVER = 'https://resolver.linkgenetic.com';
const VALID_ID = 'linkid:7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24';

describe('LinkIdClient', () => {
  let client: LinkIDClient;

  beforeEach(() => {
    client = new LinkIDClient({ resolverUrl: RESOLVER });
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('creates instance with resolver URL', () => {
      expect(client).toBeInstanceOf(LinkIDClient);
    });

    it('throws on missing resolver', () => {
      expect(() => new LinkIDClient({} as any)).not.toThrow();
    });
  });

  describe('resolve()', () => {
    it('returns resolution result on success', async () => {
      const mockResult = { id: VALID_ID, scheme: 'linkid', uuid: VALID_ID.slice(7), target_url: 'https://example.com', status: 'active', last_verified_at: null, version: 1 };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResult,
        redirected: false,
        headers: { get: () => null },
      });

      const result = await client.resolve(VALID_ID);
      expect((result as any).data.target_url).toBe('https://example.com');
    });

    it('throws LinkIdError on 404', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ error: 'not found' }),
        headers: { get: () => null },
      });

      await expect(client.resolve(VALID_ID)).rejects.toThrow(LinkIDError);
    });

    it('throws on invalid linkid format', async () => {
      await expect(client.resolve('not-a-linkid')).rejects.toThrow();
    });

    it('throws on network error', async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new TypeError('Failed to fetch'));
      await expect(client.resolve(VALID_ID)).rejects.toThrow();
    });
  });
});

describe('LinkIdError', () => {
  it('has correct error code', () => {
    const err = new LinkIDError('not found', 'NOT_FOUND');
    expect(err.code).toBe('NOT_FOUND');
    expect(err).toBeInstanceOf(Error);
  });
});
