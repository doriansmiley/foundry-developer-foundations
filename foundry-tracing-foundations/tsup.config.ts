import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/**/*.ts'],
    format: ['cjs'],
    outDir: 'dist',
    clean: true,
    dts: false,
    tsconfig: 'tsconfig.build.json',
});
