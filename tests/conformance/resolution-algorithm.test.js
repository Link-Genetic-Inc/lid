/**
 * Public resolve-only SDK contract checks, not certification of the extended
 * architecture notes. All requests target an isolated local HTTP fixture.
 * Build sdk/js first; no production records or external requests are used.
 */
const assert = require('node:assert/strict');
const { createServer } = require('node:http');
const { once } = require('node:events');
const { test } = require('node:test');
const { LinkIDClient } = require('../../sdk/js/dist/index.js');

const UUID = '7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24';
const ID = `linkid:${UUID}`;
const TARGET = 'https://example.org/resource';

async function fixture(run, { status = 200, html = false } = {}) {
  const requests = [];
  const server = createServer((request, response) => {
    requests.push({ method: request.method, url: request.url });
    response.writeHead(status, {
      'content-type': html ? 'text/html' : 'application/json',
      'cache-control': 'public, max-age=60',
    });
    response.end(html ? '<html>Intermediary response</html>' : JSON.stringify(
      status === 200 ? {
        id: ID, scheme: 'linkid', uuid: UUID, status: 'active',
        target_url: TARGET, last_verified_at: null, version: 1,
      } : {
        error: status === 404 ? 'not_found' : status === 410 ? 'gone' : 'policy_denied',
      },
    ));
  });
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  const origin = `http://127.0.0.1:${server.address().port}`;
  const client = new LinkIDClient({ resolverUrl: origin, retries: 0, caching: false });
  try {
    await run({ client, requests, origin });
  } finally {
    const closed = once(server, 'close');
    server.close();
    server.closeAllConnections();
    await closed;
  }
}

test('canonical identity resolves through the public UUID endpoint', async () => {
  await fixture(async ({ client, requests, origin }) => {
    const result = await client.resolve(ID);
    assert.equal(result.type, 'metadata');
    assert.equal(result.data.id, ID);
    assert.equal(result.data.target_url, TARGET);
    assert.equal(result.data.status, 'active');
    assert.equal(requests[0].method, 'GET');
    assert.equal(new URL(requests[0].url, origin).pathname, `/api/public/resolve/${UUID}`);
    assert.equal(requests.length, 1);
  });
});

test('a bare UUID uses the same public endpoint', async () => {
  await fixture(async ({ client, requests, origin }) => {
    await client.resolve(UUID);
    assert.equal(new URL(requests[0].url, origin).pathname, `/api/public/resolve/${UUID}`);
  });
});

test('malformed input is rejected without a request', async () => {
  await fixture(async ({ client, requests }) => {
    await assert.rejects(client.resolve('not-a-linkid'));
    assert.equal(requests.length, 0);
  });
});

test('404 not_found rejects instead of navigating', async () => {
  await fixture(async ({ client, requests }) => {
    await assert.rejects(client.resolve(ID), { code: 'LINKID_NOT_FOUND' });
    assert.equal(requests.length, 1);
  }, { status: 404 });
});

test('410 withdrawn rejects instead of navigating', async () => {
  await fixture(async ({ client, requests }) => {
    await assert.rejects(client.resolve(ID), { code: 'LINKID_WITHDRAWN' });
    assert.equal(requests.length, 1);
  }, { status: 410 });
});

test('403 does not produce a target or an unknown-identifier result', async () => {
  await fixture(async ({ client }) => {
    await assert.rejects(client.resolve(ID), (error) => error.code !== 'LINKID_NOT_FOUND');
  }, { status: 403 });
});

test('HTML is not accepted as JSON provenance or resolver evidence', async () => {
  await fixture(async ({ client }) => {
    await assert.rejects(client.resolve(ID));
  }, { html: true });
});

test('cache reuse and bypass are observable without touching a real registry', async () => {
  await fixture(async ({ origin, requests }) => {
    const client = new LinkIDClient({ resolverUrl: origin, caching: true });
    await client.resolve(ID);
    await client.resolve(ID);
    assert.equal(requests.length, 1);
    await client.resolve(ID, { bypassCache: true });
    assert.equal(requests.length, 2);
    await client.clearCache();
    await client.resolve(ID);
    assert.equal(requests.length, 3);
  });
});

test('unsupported public SDK registration fails locally', async () => {
  await fixture(async ({ client, requests }) => {
    await assert.rejects(client.register({ targetUri: TARGET }), /not supported/);
    assert.equal(requests.length, 0);
  });
});
