import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/index.ts'],
    format: ['esm', 'cjs'],
    outDir: 'dist',
    clean: true,
    dts: true,
    tsconfig: 'tsconfig.build.json',
    noExternal: [
        "@osdk/foundry.admin",
        "@osdk/client",
        "@osdk/oauth",
    ]
});
