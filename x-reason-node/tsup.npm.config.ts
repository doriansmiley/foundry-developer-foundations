import { defineConfig } from 'tsup';

export default defineConfig({
    entry: ['src/**/*.ts', '!../foundry-tracing-foundations/src/computeModule.ts', '!../foundry-tracing-foundations/src/dist/computeModule.js'],
    format: ['esm', 'cjs'],
    outDir: 'dist',
    clean: true,
    dts: false,
    tsconfig: 'tsconfig.build.json',
    noExternal: [
        "@codestrap/developer-foundations.foundry-tracing-foundation",
        "@osdk/foundry.admin",
        "@osdk/client",
        "@osdk/oauth",
    ], // Specify the local dependency here
});
