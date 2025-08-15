import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import {
  Tree,
  readProjectConfiguration,
  addProjectConfiguration,
} from '@nx/devkit';

import { serviceClientGenerator } from './service-client';
import { ServiceClientGeneratorSchema } from './schema';

describe('service-client generator', () => {
  let tree: Tree;
  const options: ServiceClientGeneratorSchema = {
    name: 'gsuiteClient',
    serviceLib: 'google-v2',
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
    await serviceClientGenerator(tree, options);

    const config = readProjectConfiguration(tree, 'google-v2');
    expect(config).toBeDefined();
  });

  it('should create client file in correct location', async () => {
    await serviceClientGenerator(tree, options);

    const clientPath =
      'packages/services/google-v2/src/lib/clients/gsuiteClient.ts';
    expect(tree.exists(clientPath)).toBeTruthy();

    const content = tree.read(clientPath, 'utf-8');
    expect(content).toContain('async function makeClient(user: string)');
    expect(content).toContain('export async function makeGsuiteClient');
    expect(content).toContain('GsuiteClientService');
  });

  it('should create test file in correct location', async () => {
    await serviceClientGenerator(tree, options);

    const testPath =
      'packages/services/google-v2/src/lib/tests/clients/gsuiteClient.test.ts';
    expect(tree.exists(testPath)).toBeTruthy();

    const content = tree.read(testPath, 'utf-8');
    expect(content).toContain('makeGsuiteClient');
    expect(content).toContain('GsuiteClientService');
    expect(content).toContain('GsuiteClientConfig');
    expect(content).toContain("from '../../clients/gsuiteClient'");
    expect(content).toContain("describe('GsuiteClient'");
    expect(content).toContain('mockUser');
  });

  it('should create or update clients index.ts', async () => {
    await serviceClientGenerator(tree, options);

    const indexPath = 'packages/services/google-v2/src/lib/clients/index.ts';
    expect(tree.exists(indexPath)).toBeTruthy();

    const content = tree.read(indexPath, 'utf-8');
    expect(content).toContain("export * from './gsuiteClient'");
  });

  it('should handle existing clients index.ts correctly', async () => {
    // Pre-create clients index with existing content
    const clientsIndexPath =
      'packages/services/google-v2/src/lib/clients/index.ts';
    tree.write(clientsIndexPath, "export * from './driveClient';\n");

    await serviceClientGenerator(tree, options);

    const content = tree.read(clientsIndexPath, 'utf-8');
    expect(content).toContain("export * from './driveClient'");
    expect(content).toContain("export * from './gsuiteClient'");
  });

  it('should not duplicate exports in index files', async () => {
    // Run generator twice
    await serviceClientGenerator(tree, options);
    await serviceClientGenerator(tree, options);

    const clientsIndexPath =
      'packages/services/google-v2/src/lib/clients/index.ts';
    const content = tree.read(clientsIndexPath, 'utf-8');

    // Should only have one export line
    const exportLines = content
      .split('\n')
      .filter((line) => line.includes("export * from './gsuiteClient'"));
    expect(exportLines.length).toBe(1);
  });

  it('should throw error for non-existent service library', async () => {
    const invalidOptions = { ...options, serviceLib: 'non-existent-service' };

    await expect(serviceClientGenerator(tree, invalidOptions)).rejects.toThrow(
      "Service library 'non-existent-service' not found"
    );
  });
});
