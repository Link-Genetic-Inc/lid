# LinkID JavaScript / TypeScript SDK

[![npm](https://img.shields.io/npm/v/@linkgenetic/client)](https://www.npmjs.com/package/@linkgenetic/client)
[![License: LCL](https://img.shields.io/badge/License-LCL%20v1.0-green)](../../LICENSE)

JavaScript and TypeScript client library for the [LinkID](https://linkgenetic.com) persistent identifier system.

## Installation

```bash
npm install @linkgenetic/client
```

## Usage

```typescript
import { LinkIdClient } from '@linkgenetic/client';

const client = new LinkIdClient({ resolver: 'https://resolver.linkgenetic.com' });
const result = await client.resolve('linkid:7e96f229-21c3-4a3d-a6cf-ef7d8dd70f24');
console.log(result.targetUri);
```

## Requirements

- Node.js 18, 20, or 22

## License

[LCL v1.0](../../LICENSE) - free for non-commercial use.
