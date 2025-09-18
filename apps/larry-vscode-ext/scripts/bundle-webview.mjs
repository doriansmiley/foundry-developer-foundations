import * as esbuild from 'esbuild';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const watch = process.argv.includes('--watch');
const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(scriptDir, '..');

const common = {
	entryPoints: [path.join(projectRoot, 'webview', 'index.tsx')],
	bundle: true,
	format: 'iife',
	outfile: path.join(projectRoot, 'media', 'webview.js'),
	jsxFactory: 'h',
	jsxFragment: 'Fragment',
	platform: 'browser',
	define: { 'process.env.NODE_ENV': '"development"' },
	loader: { '.png': 'file', '.svg': 'file', '.css': 'css' }
};

if (watch) {
	const ctx = await esbuild.context(common);
	await ctx.watch();
	console.log('Watching webview…');
} else {
	await esbuild.build(common);
	console.log('Built webview');
} 