# LinkID JavaScript / TypeScript SDK

[![npm](https://img.shields.io/npm/v/@linkgenetic/client)](https://www.npmjs.com/package/@linkgenetic/client)
[![License: LCL](https://img.shields.io/badge/License-LCL%20v1.0-green)](../../LICENSE)

JavaScript and TypeScript client library for the [LinkID](https://linkgenetic.com) persistent identifier system.

## Publication status

The npm package is publication-ready but is not yet published. Do not rely on
the installation command until a release is announced.

```bash
npm install @linkgenetic/client # available after publication
```

## Usage

```typescript
import { LinkIDClient } from '@linkgenetic/client';

const client = new LinkIDClient({ resolverUrl: 'https://linkid.io' });
const result = await client.resolve('linkid:b1a93fdb-ab8a-49f8-a359-33ad79e19df3');
console.log(result.data); // id, scheme, uuid, target_url, status, last_verified_at, version
```

## Requirements

- Node.js 18, 20, or 22

## License

[Apache-2.0](LICENSE). This SDK currently supports public resolution only.
