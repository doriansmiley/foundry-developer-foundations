import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import {
  Tree,
  readProjectConfiguration,
  addProjectConfiguration,
} from '@nx/devkit';

import { serviceFunctionGenerator } from './service-function';
import { ServiceFunctionGeneratorSchema } from './schema';

describe('service-function generator', () => {
  let tree: Tree;
  const options: ServiceFunctionGeneratorSchema = {
    name: 'readEmails',
    serviceLib: 'google-v2',
    path: 'gmail',
  };

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();

    // Add a mock service project
    addProjectConfiguration(tree, 'google-v2', {
      root: 'packages/services/google-v2',
      projectType: 'library',
      sourceRoot: 'packages/services/google-v2/src',
      targets: {
        build: {
          executor: '@nx/js:tsc',
          outputs: ['{options.outputPath}'],
          options: {
            outputPath: 'dist/packages/services/google-v2',
            tsConfig: 'packages/services/google-v2/tsconfig.lib.json',
            packageJson: 'packages/services/google-v2/package.json',
          },
        },
      },
      tags: ['type:service'],
    });

    // Create the basic directory structure
    tree.write(
      'packages/services/google-v2/src/index.ts',
      'export * from "./lib";'
    );
    tree.write('packages/services/google-v2/src/lib/index.ts', '');
    tree.write(
      'packages/services/google-v2/package.json',
      JSON.stringify(
        {
          name: '@codestrap/developer-foundations-google-v2',
          version: '0.0.1',
        },
        null,
        2
      )
    );
  });

  it('should run successfully', async () => {
    await serviceFunctionGenerator(tree, options);

    const config = readProjectConfiguration(tree, 'google-v2');
    expect(config).toBeDefined();
  });

  it('should create function file in correct location', async () => {
    await serviceFunctionGenerator(tree, options);

    const functionPath =
      'packages/services/google-v2/src/lib/functions/gmail/readEmails.ts';
    expect(tree.exists(functionPath)).toBeTruthy();

    const content = tree.read(functionPath, 'utf-8');
    expect(content).toContain('export async function readEmails');
    expect(content).toContain('ReadEmails function for gmail services');
    expect(content).toContain('props: any): Promise<any>');
  });

  it('should create test file in correct location', async () => {
    await serviceFunctionGenerator(tree, options);

    const testPath =
      'packages/services/google-v2/src/lib/tests/gmail/readEmails.test.ts';
    expect(tree.exists(testPath)).toBeTruthy();

    const content = tree.read(testPath, 'utf-8');
    expect(content).toContain(
      "import { readEmails } from '../../functions/gmail/readEmails'"
    );
    expect(content).toContain("describe('readEmails'");
    expect(content).toContain('mockProps');
  });

  it('should create or update functions index.ts', async () => {
    await serviceFunctionGenerator(tree, options);

    const indexPath = 'packages/services/google-v2/src/lib/functions/index.ts';
    expect(tree.exists(indexPath)).toBeTruthy();

    const content = tree.read(indexPath, 'utf-8');
    expect(content).toContain("export * from './gmail/readEmails'");
  });

  it('should create or update path-specific index.ts', async () => {
    await serviceFunctionGenerator(tree, options);

    const pathIndexPath =
      'packages/services/google-v2/src/lib/functions/gmail/index.ts';
    expect(tree.exists(pathIndexPath)).toBeTruthy();

    const content = tree.read(pathIndexPath, 'utf-8');
    expect(content).toContain("export * from './readEmails'");
  });

  it('should handle existing function index.ts correctly', async () => {
    // Pre-create functions index with existing content
    const functionsIndexPath =
      'packages/services/google-v2/src/lib/functions/index.ts';
    tree.write(functionsIndexPath, "export * from './calendar/createEvent';\n");

    await serviceFunctionGenerator(tree, options);

    const content = tree.read(functionsIndexPath, 'utf-8');
    expect(content).toContain("export * from './calendar/createEvent'");
    expect(content).toContain("export * from './gmail/readEmails'");
  });

  it('should not duplicate exports in index files', async () => {
    // Run generator twice
    await serviceFunctionGenerator(tree, options);
    await serviceFunctionGenerator(tree, options);

    const functionsIndexPath =
      'packages/services/google-v2/src/lib/functions/index.ts';
    const content = tree.read(functionsIndexPath, 'utf-8');

    // Should only have one export line
    const exportLines = content
      .split('\n')
      .filter((line) => line.includes("export * from './gmail/readEmails'"));
    expect(exportLines.length).toBe(1);
  });

  it('should throw error for non-existent service library', async () => {
    const invalidOptions = { ...options, serviceLib: 'non-existent-service' };

    await expect(
      serviceFunctionGenerator(tree, invalidOptions)
    ).rejects.toThrow("Service library 'non-existent-service' not found");
  });
});
