import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts', 'src/test/**/*.test.ts'],
    format: ['esm'],
    outDir: 'dist',
    clean: true,
    dts: false,
    tsconfig: 'tsconfig.json',
});
