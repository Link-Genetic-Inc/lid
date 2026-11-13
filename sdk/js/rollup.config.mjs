import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

// Keep declared runtime packages and their subpath imports external.
// Otherwise cross-fetch/polyfill is bundled while its private node-fetch
// dependency becomes an undeclared top-level require in the published output.
const external = (id) => ['cross-fetch', 'node-fetch'].some(
  (name) => id === name || id.startsWith(`${name}/`)
);

export default [
  // CommonJS (Node.js)
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.js',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
    external,
  },
  // ES Module
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'es',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
    ],
    external,
  },
];