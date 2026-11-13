const assert = require('node:assert/strict');
const { test } = require('node:test');
const { readFileSync, existsSync, readdirSync } = require('node:fs');
const { resolve, dirname, join } = require('node:path');

const root = resolve(__dirname, '../..');
const read = (path) => readFileSync(join(root, path), 'utf8');

test('SDK versions stay aligned without conflating policy and platform releases', () => {
  const version = JSON.parse(read('sdk/js/package.json')).version;
  assert.equal(read('sdk/python/pyproject.toml').match(/^version = "([^"]+)"/m)[1], version);
  assert.equal(read('sdk/java/pom.xml').match(/<version>([^<]+)<\/version>/)[1], version);
  assert.match(read('SECURITY.md'), /Version 1\.1/);
  assert.doesNotMatch(read('ROADMAP.md'), /not yet published/);
});

test('license documentation refers to the existing Apache license and Patent Promise', () => {
  assert.match(read('LICENSE'), /Apache License/);
  for (const path of ['README.md', 'docs/open-source.md', 'GOVERNANCE.md']) {
    assert.match(read(path), /Apache-2\.0/);
    assert.match(read(path), /PATENTS\.md/);
  }
  assert.match(read('docs/open-source.md'), /application.*not a statement/s);
});

test('IETF meeting and submitted-draft references are explicit and non-endorsing', () => {
  const readme = read('README.md');
  assert.match(readme, /IETF 127/);
  assert.match(readme, /San Francisco/);
  assert.match(readme, /18:00–20:00 CET/);
  assert.match(readme, /not an RFC/);
  const draft = read('spec/draft-linkgenetic-linkid-uri-01.md');
  assert.match(draft, /8 October 2026/);
  assert.match(draft, /11 April 2027/);
  assert.match(draft, /Repository working copy/);
  assert.match(draft, /not an immutable copy/);
});

test('no advertised root test or Docker infrastructure is required', () => {
  const docs = read('tests/README.md');
  assert.match(docs, /node --test tests\/repository/);
  assert.match(docs, /isolated|ephemeral/);
  assert.ok(existsSync(join(root, 'tests/conformance/resolution-algorithm.test.js')));
  assert.doesNotMatch(read('tests/conformance/resolution-algorithm.test.js'), /require\(['"]chai|mocks\/resolver|data\/test-data/);
});

test('release CI validates the requested tag before all registry publication jobs', () => {
  const workflow = read('.github/workflows/release.yml');
  const checks = workflow.split('\n  checks:')[1].split('\n  release-js:')[0];
  assert.match(checks, /uses: \.\/\.github\/workflows\/ci\.yml/);
  assert.match(checks, /ref: \$\{\{ inputs\.release_tag \|\| github\.ref_name \}\}/);
  for (const name of ['release-js', 'release-python', 'release-java']) {
    const job = workflow.split(`\n  ${name}:`)[1].split(/\n  [a-z][a-z-]+:/)[0];
    assert.match(job, /needs: \[preflight, checks\]/, name);
  }
  const ci = read('.github/workflows/ci.yml');
  assert.match(ci, /workflow_call:/);
  const checkoutCount = (ci.match(/uses: actions\/checkout@/g) || []).length;
  assert.equal((ci.match(/ref: \$\{\{ inputs\.ref \|\| github\.sha \}\}/g) || []).length, checkoutCount);
  assert.match(ci, /resolution-algorithm\.test\.js/);
});

test('maintenance CI targets supported runtimes without editing package minima', () => {
  const ci = read('.github/workflows/ci.yml');
  assert.match(ci, /node-version: \[22, 24, 26\]/);
  assert.doesNotMatch(ci, /node-version: \[18|python-version: \["3\.9"/);
  assert.match(read('sdk/js/README.md'), /end-of-life/);
  assert.match(read('sdk/python/README.md'), /end-of-life/);
});

test('Java packaging uses an explicit reproducible timestamp within the ZIP range', () => {
  const timestamp = read('sdk/java/pom.xml').match(/<project.build.outputTimestamp>([^<]+)<\/project.build.outputTimestamp>/)[1];
  const epoch = Date.parse(timestamp);
  assert.ok(epoch >= Date.parse('1980-01-01T00:00:02Z'));
  assert.ok(epoch <= Date.parse('2099-12-31T23:59:59Z'));
});

test('CLA signing has an explicit manual path, not a fictitious active bot', () => {
  const docs = read('docs/CONTRIBUTING.md');
  assert.match(docs, /manually disabled/);
  assert.match(docs, /maintainer verifies/);
  assert.doesNotMatch(docs, /fully automated|bot will check.*automatically/);
});

test('legacy architecture content is retained but separated from the public profile', () => {
  const html = read('spec/index.html');
  assert.match(html, /id="current-public-profile"/);
  assert.match(html, /id="legacy-design-notes"/);
  assert.match(html, /historical and non-normative/);
  assert.match(html, /not a W3C Recommendation|Not a W3C Recommendation/);
  assert.doesNotMatch(html, /linkgenetic\.github\.io\/linkid-spec|group: "linkid"/);
});

function markdownFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (['.git', 'node_modules', 'target', 'dist', 'coverage', '.pytest_cache'].includes(entry.name)) return [];
    const path = join(directory, entry.name);
    return entry.isDirectory() ? markdownFiles(path) : path.endsWith('.md') ? [path] : [];
  });
}

test('relative Markdown file links resolve within the repository', () => {
  const missing = [];
  for (const path of markdownFiles(root)) {
    for (const match of readFileSync(path, 'utf8').matchAll(/\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g)) {
      const target = match[1].replace(/^<|>$/g, '');
      if (/^(?:[a-z][a-z\d+.-]*:|#|\/\/)/i.test(target)) continue;
      // GitHub security reporting route intentionally resolves outside blob/main.
      if (target === '../../security/advisories/new') continue;
      const file = decodeURIComponent(target.split(/[?#]/)[0]);
      if (file && !existsSync(resolve(dirname(path), file))) missing.push(`${path}: ${target}`);
    }
  }
  assert.deepEqual(missing, []);
});
