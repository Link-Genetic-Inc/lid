# LinkID JavaScript / TypeScript SDK

[![npm](https://img.shields.io/npm/v/@linkgenetic/client)](https://www.npmjs.com/package/@linkgenetic/client)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache--2.0-green)](LICENSE)

JavaScript and TypeScript client library for the [LinkID](https://linkgenetic.com) persistent identifier system.

## Publication status

Version 1.0.1 is published on
[npm](https://www.npmjs.com/package/@linkgenetic/client).

```bash
npm install @linkgenetic/client
```

## Usage

```typescript
import { LinkIDClient } from '@linkgenetic/client';

const client = new LinkIDClient({ resolverUrl: 'https://linkid.io' });
const result = await client.resolve('linkid:b1a93fdb-ab8a-49f8-a359-33ad79e19df3');
console.log(result.data); // id, scheme, uuid, target_url, status, last_verified_at, version
```

## Requirements

- Current maintenance CI targets Node.js 22, 24 and 26 LTS.
- Published 1.0.1 metadata accepts Node.js 18+, but Node.js 18 and 20 are
  end-of-life and are not recommended or covered by the refreshed CI.
- Maintenance changes are unreleased; they do not replace the immutable 1.0.1 package.

## License

[Apache-2.0](LICENSE). This SDK currently supports public resolution only.
