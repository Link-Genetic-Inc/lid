/**
 * Validate the actual Rollup output, not a separate TypeScript compilation.
 * No external requests, production data or optional node-fetch peer required.
 */
const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { resolve } = require('node:path');
const { spawnSync } = require('node:child_process');
const { test } = require('node:test');

const sdk = resolve(__dirname, '../../sdk/js');
const cjs = resolve(sdk, 'dist/index.js');
const esm = resolve(sdk, 'dist/index.esm.js');

test('CommonJS bundle retains the declared polyfill import, not its private dependency', () => {
  const output = readFileSync(cjs, 'utf8');
  assert.match(output, /require\(['"]cross-fetch\/polyfill['"]\)/);
  assert.doesNotMatch(output, /require\(['"]node-fetch['"]\)/);
});

test('ES module bundle retains the declared polyfill import, not its private dependency', () => {
  const output = readFileSync(esm, 'utf8');
  assert.match(output, /import\s+['"]cross-fetch\/polyfill['"]/);
  assert.doesNotMatch(output, /from\s+['"]node-fetch['"]|import\s+['"]node-fetch['"]/);
});

test('package entry loads and restores fetch through its declared dependency', () => {
  const check = spawnSync(process.execPath, ['-e', `
    const assert = require('node:assert/strict');
    globalThis.fetch = undefined;
    const { LinkIDClient } = require(${JSON.stringify(cjs)});
    assert.equal(typeof globalThis.fetch, 'function');
    assert.equal(typeof LinkIDClient, 'function');
    new LinkIDClient({ resolverUrl: 'https://example.invalid' });
  `], { encoding: 'utf8', timeout: 10000 });
  assert.ifError(check.error);
  assert.equal(check.status, 0, `${check.stdout}\n${check.stderr}`);
});
