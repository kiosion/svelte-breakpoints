const fs = require('fs-extra');
const glob = require('glob');
const path = require('path');
const svelte = require('svelte/compiler');
const sveltePreprocess = require('svelte-preprocess');
const basePath = path.resolve(__dirname, '../');
const srcPath = path.resolve(basePath, 'src');
const distPath = path.resolve(basePath, 'dist');

// Credit to @Schum123 for this script
const main = () => {
  glob(path.join(srcPath, '**/*.svelte'), null, async (err, files) => {
    if (err) {
      throw err;
    }
    await Promise.all(
      files.map((filePath) => preprocessSvelte(path.resolve(filePath)))
    );
  });
  glob(path.join(distPath, '**/*.d.ts'), null, async (err, files) => {
    if (err) {
      throw err;
    }
    const tsPath = path.join(distPath, 'ts');
    await Promise.all(
      files.map(async (filePath) => {
        filePath = path.resolve(filePath);
        if (!filePath.includes(tsPath)) {
          await fs.move(filePath, filePath.replace(distPath, tsPath), {
            overwrite: true
          });
        }
      })
    );
  });
};

const preprocessSvelte = async (filePath) => {
  const srcCode = await fs.readFile(filePath, { encoding: 'utf-8' });
  let { code } = await svelte.preprocess(
    srcCode,
    sveltePreprocess({
      sourceMap: false,
      typescript: {
        compilerOptions: {
          sourceMap: false
        }
      }
    }),
    {
      filename: filePath
    }
  );
  code = code.replace(/script lang="ts"/g, 'script');
  const relativePath = filePath.split(srcPath)[1];
  const destination = path.join(distPath, relativePath);
  await fs.ensureFile(destination);
  await fs.writeFile(destination, code, { encoding: 'utf-8' });
  const tsDest = path.join(distPath, 'ts', relativePath);
  await fs.ensureFile(tsDest);
  await fs.writeFile(tsDest, srcCode, {
    encoding: 'utf-8'
  });
};

main();
