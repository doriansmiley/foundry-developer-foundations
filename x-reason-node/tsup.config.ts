import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/**/*.ts'],
    format: ['cjs'],
    outDir: 'dist',
    clean: true,
    dts: false,
    tsconfig: 'tsconfig.build.json',
    noExternal: [
        "@codestrap/developer-foundations.foundry-tracing-foundation",
        "@osdk/foundry.admin",
        "@osdk/client",
        "@osdk/oauth",
    ], // specifically include these modules so we don't wind up trying to require esm modules
});
