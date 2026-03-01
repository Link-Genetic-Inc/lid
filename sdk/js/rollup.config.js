import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

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
        external: ['cross-fetch', 'node-fetch'],
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
        external: ['cross-fetch', 'node-fetch'],
  },
  ];
