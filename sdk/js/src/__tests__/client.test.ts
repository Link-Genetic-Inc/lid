import { LinkIdClient } from '../client';
import { LinkIdError, ErrorCode } from '../errors';

const RESOLVER = 'https://resolver.linkgenetic.com';
const VALID_ID = 'linkid:7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24';

describe('LinkIdClient', () => {
  let client: LinkIdClient;

  beforeEach(() => {
    client = new LinkIdClient({ resolver: RESOLVER });
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('creates instance with resolver URL', () => {
      expect(client).toBeInstanceOf(LinkIdClient);
    });

    it('throws on missing resolver', () => {
      expect(() => new LinkIdClient({} as any)).toThrow();
    });
  });

  describe('resolve()', () => {
    it('returns resolution result on success', async () => {
      const mockResult = { linkId: VALID_ID, targetUri: 'https://example.com', contentType: 'text/html' };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockResult,
      });

      const result = await client.resolve(VALID_ID);
      expect(result.targetUri).toBe('https://example.com');
    });

    it('throws LinkIdError on 404', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        json: async () => ({ error: 'not found' }),
      });

      await expect(client.resolve(VALID_ID)).rejects.toThrow(LinkIdError);
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
    const err = new LinkIdError('not found', ErrorCode.NOT_FOUND);
    expect(err.code).toBe(ErrorCode.NOT_FOUND);
    expect(err).toBeInstanceOf(Error);
  });
});
