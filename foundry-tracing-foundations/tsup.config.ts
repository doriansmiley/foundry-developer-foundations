import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/**/*.ts'],
  format: ['esm'],
  outDir: 'dist',
  clean: true,
  dts: true,
  tsconfig: 'tsconfig.build.json',
});
