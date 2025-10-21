import {
  Tree,
  updateJson,
  formatFiles,
  generateFiles,
  joinPathFragments,
  readProjectConfiguration,
} from '@nx/devkit';
import { libraryGenerator as nodeLibraryGenerator } from '@nx/node';
import * as path from 'node:path';
import { ServiceLibGeneratorSchema } from './schema';

export async function serviceLibGenerator(
  tree: Tree,
  options: ServiceLibGeneratorSchema
) {

  // 1) Generate a Node TS library under packages/services/<name>
  await nodeLibraryGenerator(tree, {
    name: options.name,
    directory: 'packages/services',
    linter: 'eslint',
    unitTestRunner: 'jest',
    strict: true,
    setParserOptionsProject: true,
    testEnvironment: 'node',
    // keep tags for conventions
    tags: 'type:service',
    compiler: 'tsc'
  });

  // 2) read the actual project config Nx created and use its root everywhere
  const project = readProjectConfiguration(tree, options.name);
  const projectRoot = project.root;

  // 2) Patch project.json with your release + publish targets and normalize build options
  const projectJsonPath = joinPathFragments(projectRoot, 'project.json');
  updateJson(tree, projectJsonPath, (json) => {
    // add your release block
    json.release = {
      version: {
        manifestRootsToUpdate: ['dist/{projectRoot}'],
        currentVersionResolver: 'git-tag',
        fallbackCurrentVersionResolver: 'disk',
      },
    };

    // ensure tag present
    const tags = new Set<string>(Array.isArray(json.tags) ? json.tags : []);
    tags.add('type:service');
    json.tags = Array.from(tags);

    // build options normalized to your convention
    json.targets ??= {};
    json.targets.build ??= { executor: '@nx/js:tsc', options: {} };
    json.targets.build.outputs = ['{options.outputPath}'];
    json.targets.build.options ??= {};
    json.targets.build.options.outputPath = `dist/${projectRoot}`;
    json.targets.build.options.main = `${projectRoot}/src/index.ts`;
    json.targets.build.options.tsConfig = `${projectRoot}/tsconfig.lib.json`;
    json.targets.build.options.assets = [`${projectRoot}/*.md`];
    // modern Nx adds this; make sure it’s set
    json.targets.build.options.packageJson = `${projectRoot}/package.json`;

    // add publish target
    json.targets['nx-release-publish'] = {
      options: { packageRoot: 'dist/{projectRoot}' },
    };

    // ensure jest path matches
    if (json.targets.test?.options) {
      json.targets.test.options.jestConfig = `${projectRoot}/jest.config.ts`;
    }

    return json;
  });

  // 3) Ensure Jest loads dotenv (idempotent)
  const jestPath = joinPathFragments(projectRoot, 'jest.config.ts');
  if (tree.exists(jestPath)) {
    const content = tree.read(jestPath, 'utf-8')!;
    if (!content.includes("dotenv.config();")) {
      const patched = [
        `import * as dotenv from 'dotenv';`,
        `dotenv.config();`,
        ``,
        content,
      ].join('\n');
      tree.write(jestPath, patched);
    }
  }

  // 4) (Optional) Add/override any extra files via templates
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, {
    ...options,
    tmpl: '',
    name: options.name,
    projectRoot,
    eslintBaseImport: '../../../eslint.config.mjs',
    coverageDir: `../../../coverage/${projectRoot}`,
  });

  await formatFiles(tree);
}

export default serviceLibGenerator;
