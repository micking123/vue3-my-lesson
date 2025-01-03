// 打包
// node dev.js 要打包的名字 -f 打包格式

import minimist from 'minimist';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { createRequire }  from 'module';
import esbuild from 'esbuild';

const __dirname = dirname(fileURLToPath(import.meta.url)); //获取当前文件的目录路径
const args = minimist(process.argv.slice(2));
const require = createRequire(import.meta.url);
console.log(args)
const target = args._[0] || 'reactivity';
const format = args.f || 'iife';
console.log(format)
const entry = resolve(__dirname, `../packages/${target}/src/index.ts`);
const pkg = require(`../packages/${target}/package.json`);

esbuild.context({
    entryPoints: [entry],
    outfile: resolve(__dirname, `../packages/${target}/dist/${target}.js`),
    bundle: true,
    platform: 'browser',
    sourcemap: true,
    format,
    globalName: pkg.buildOptions?.name
}).then((ctx) => {
    console.log('start dev');
    return ctx.watch();
})