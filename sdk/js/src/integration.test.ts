import { LinkIDClient } from './client';

const enabled = process.env.LINKID_INTEGRATION === '1';
const testLive = enabled ? test : test.skip;

testLive('resolves the public contract', async () => {
  const client = new LinkIDClient({
    resolverUrl: process.env.LINKID_RESOLVER || 'https://linkid.io',
    caching: false,
  });
  const result: any = await client.resolve(
    process.env.LINKID_TEST_ID || 'linkid:b1a93fdb-ab8a-49f8-a359-33ad79e19df3',
  );
  expect(result.type).toBe('metadata');
  expect(result.data).toEqual(expect.objectContaining({
    id: expect.any(String),
    scheme: expect.any(String),
    uuid: expect.any(String),
    target_url: expect.any(String),
    status: expect.any(String),
    version: expect.any(String),
  }));
  expect(result.data).toHaveProperty('last_verified_at');
});