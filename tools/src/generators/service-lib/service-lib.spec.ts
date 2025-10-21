import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import {
  Tree,
  readProjectConfiguration,
} from '@nx/devkit';

import { serviceLibGenerator } from './service-lib';
import { ServiceLibGeneratorSchema } from './schema';

describe('service-lib generator', () => {
  let tree: Tree;
  const options: ServiceLibGeneratorSchema = { name: 'test' };
  const root = 'packages/services/test';

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  it('should register project configuration', async () => {
    await serviceLibGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');
    expect(config).toBeDefined();
    expect(config.name).toBe('test');
    expect(config.root).toBe(root);
    expect(config.sourceRoot).toBe(`${root}/src`);
    expect(config.projectType).toBe('library');
    expect(config.tags).toContain('type:service');

    // custom release metadata
    const rel = (config as any).release;
    expect(rel).toBeDefined();
    expect(rel.version).toBeDefined();
    expect(rel.version.manifestRootsToUpdate).toEqual(['dist/{projectRoot}']);
    expect(rel.version.currentVersionResolver).toBe('git-tag');
    expect(rel.version.fallbackCurrentVersionResolver).toBe('disk');
  });

  it('should configure targets correctly', async () => {
    await serviceLibGenerator(tree, options);
    const config = readProjectConfiguration(tree, 'test');

    // build target
    expect(config.targets?.build?.executor).toBe('@nx/js:tsc');
    expect(config.targets?.build?.outputs).toEqual(['{options.outputPath}']);
    expect(config.targets?.build?.options?.outputPath).toBe(`dist/${root}`);
    expect(config.targets?.build?.options?.main).toBe(`${root}/src/index.ts`);
    expect(config.targets?.build?.options?.tsConfig).toBe(`${root}/tsconfig.lib.json`);
    expect(config.targets?.build?.options?.assets).toEqual([`${root}/*.md`]);
    expect(config.targets?.build?.options?.packageJson).toBe(`${root}/package.json`);

    // nx-release-publish
    expect(config.targets?.['nx-release-publish']?.options?.packageRoot).toBe('dist/{projectRoot}');

    // test target
    expect(config.targets?.test?.executor).toBe('@nx/jest:jest');
    expect(config.targets?.test?.options?.jestConfig).toBe(`${root}/jest.config.ts`);
    expect(config.targets?.test?.outputs).toEqual(['{workspaceRoot}/coverage/{projectRoot}']);
  });

  it('should scaffold required files', async () => {
    await serviceLibGenerator(tree, options);

    // existence checks
    [
      `${root}/eslint.config.mjs`,
      `${root}/jest.config.ts`,
      `${root}/tsconfig.json`,
      `${root}/tsconfig.lib.json`,
      `${root}/tsconfig.spec.json`,
      `${root}/src/index.ts`,
    ].forEach((p) => expect(tree.exists(p)).toBe(true));

    // content checks: jest loads dotenv
    const jestCfg = tree.read(`${root}/jest.config.ts`, 'utf-8')!;
    expect(jestCfg).toContain("import * as dotenv from 'dotenv'");
    expect(jestCfg).toContain('dotenv.config();');
    expect(jestCfg).toContain(`displayName: 'test'`);
    expect(jestCfg).toContain(`coverageDirectory: '../../../coverage/${root}'`);

    // content checks: eslint uses JSONC parser
    const eslintCfg = tree.read(`${root}/eslint.config.mjs`, 'utf-8')!;
    expect(eslintCfg).toContain("await import('jsonc-eslint-parser')");
    expect(eslintCfg).toContain("import baseConfig from '../../../eslint.config.mjs'");
  });
});
