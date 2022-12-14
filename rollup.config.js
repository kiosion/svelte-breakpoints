import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import execute from 'rollup-plugin-execute';
import pkg from './package.json' assert { type: 'json' };

const name = pkg.name
  .replace(/^(@\S+\/)?(svelte-)?(\S+)/, '$3')
  .replace(/^\w/, (m) => m.toUpperCase())
  .replace(/-\w/g, (m) => m[1].toUpperCase());

export default [
  {
    input: 'src/index.ts',
    output: [
      { file: pkg.module, format: 'es', sourcemap: true },
      {
        file: pkg.main,
        format: 'umd',
        name,
        sourcemap: true,
        exports: 'named',
        plugins: [
          execute([
            'tsc --outDir ./dist --declaration',
            'node scripts/preprocess.cjs'
          ])
        ]
      }
    ],
    plugins: [
      svelte({
        preprocess: sveltePreprocess()
      }),
      resolve(),
      typescript()
    ]
  }
];
