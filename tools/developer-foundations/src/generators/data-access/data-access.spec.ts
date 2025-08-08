import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing';
import {
  Tree,
  readProjectConfiguration,
  addProjectConfiguration,
} from '@nx/devkit';

import { dataAccessGenerator } from './data-access';
import { DataAccessGeneratorSchema } from './schema';

describe('data-access generator', () => {
  let tree: Tree;

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace();
  });

  describe('new-library mode', () => {
    describe('public library creation', () => {
      const options: DataAccessGeneratorSchema = {
        name: 'inventory',
        mode: 'new-library',
        domain: 'inventory',
        isPublic: true,
      };

      it('should create a new public data-access library with correct structure', async () => {
        await dataAccessGenerator(tree, options);

        // Check project configuration
        const config = readProjectConfiguration(tree, 'data-access-inventory');
        expect(config).toBeDefined();
        expect(config.name).toBe('data-access-inventory');
        expect(config.root).toBe('packages/data-access/inventory');
        expect(config.tags).toContain('type:data-access');

        // Check package.json
        const packageJson = JSON.parse(
          tree.read('packages/data-access/inventory/package.json', 'utf-8')
        );
        expect(packageJson.name).toBe(
          '@codestrap/developer-foundations-data-access-inventory'
        );
        expect(packageJson.publishConfig?.access).toBe('public');
        expect(packageJson.dependencies).toEqual({
          '@codestrap/developer-foundations-types': '*',
          '@codestrap/developer-foundations-di': '*',
          tslib: '^2.3.0',
        });

        // Check DAO file
        const daoContent = tree.read(
          'packages/data-access/inventory/src/lib/inventoryDao.ts',
          'utf-8'
        );
        expect(daoContent).toContain(
          'export function makeInventoryDao(): InventoryDao'
        );
        expect(daoContent).toContain('import type {');
        expect(daoContent).toContain('FoundryClient,');
        expect(daoContent).toContain('InventoryDao,');

        // Check test file
        const testContent = tree.read(
          'packages/data-access/inventory/src/lib/test/inventoryDao.test.ts',
          'utf-8'
        );
        expect(testContent).toContain(
          "import { makeInventoryDao } from '../inventoryDao'"
        );
        expect(testContent).toContain("describe('InventoryDao'");

        // Check index.ts exports
        const indexContent = tree.read(
          'packages/data-access/inventory/src/index.ts',
          'utf-8'
        );
        expect(indexContent).toContain("export * from './lib/inventoryDao'");

        // Verify default files are removed
        expect(
          tree.exists('packages/data-access/inventory/src/lib/inventory.ts')
        ).toBe(false);
        expect(
          tree.exists(
            'packages/data-access/inventory/src/lib/inventory.spec.ts'
          )
        ).toBe(false);
      });
    });

    describe('private library creation', () => {
      const options: DataAccessGeneratorSchema = {
        name: 'billing',
        mode: 'new-library',
        domain: 'billing',
        isPublic: false,
      };

      it('should create a new private data-access library without publishConfig', async () => {
        await dataAccessGenerator(tree, options);

        const packageJson = JSON.parse(
          tree.read('packages/data-access/billing/package.json', 'utf-8')
        );
        expect(packageJson.publishConfig).toBeUndefined();
      });
    });

    describe('custom import path', () => {
      const options: DataAccessGeneratorSchema = {
        name: 'orders',
        mode: 'new-library',
        domain: 'orders',
        importPath: '@custom/orders-data-access',
        isPublic: true,
      };

      it('should use custom import path', async () => {
        await dataAccessGenerator(tree, options);

        const packageJson = JSON.parse(
          tree.read('packages/data-access/orders/package.json', 'utf-8')
        );
        expect(packageJson.name).toBe('@custom/orders-data-access');
      });
    });

    describe('validation', () => {
      it('should throw error when domain is missing', async () => {
        const options: DataAccessGeneratorSchema = {
          name: 'test',
          mode: 'new-library',
          // domain is missing
        };

        await expect(dataAccessGenerator(tree, options)).rejects.toThrow(
          'Domain is required when creating a new library'
        );
      });
    });
  });

  describe('add-dao mode', () => {
    beforeEach(() => {
      // Set up existing data-access libraries for testing
      addProjectConfiguration(tree, 'data-access-communications', {
        name: 'data-access-communications',
        root: 'packages/data-access/communications',
        projectType: 'library',
        sourceRoot: 'packages/data-access/communications/src',
        tags: ['type:data-access'],
        targets: {},
      });

      addProjectConfiguration(tree, 'data-access-crm', {
        name: 'data-access-crm',
        root: 'packages/data-access/crm',
        projectType: 'library',
        sourceRoot: 'packages/data-access/crm/src',
        tags: ['type:data-access'],
        targets: {},
      });

      addProjectConfiguration(tree, 'regular-library', {
        name: 'regular-library',
        root: 'packages/regular-library',
        projectType: 'library',
        sourceRoot: 'packages/regular-library/src',
        tags: ['type:library'], // Not a data-access library
        targets: {},
      });

      // Create existing index.ts files
      tree.write(
        'packages/data-access/communications/src/index.ts',
        "export * from './lib/commsDao';\nexport * from './lib/threadsDao';\n"
      );

      tree.write(
        'packages/data-access/crm/src/index.ts',
        "export * from './lib/contactsDao';\n"
      );
    });

    describe('adding DAO to existing library', () => {
      const options: DataAccessGeneratorSchema = {
        name: 'messages',
        mode: 'add-dao',
        existingLibrary: 'data-access-communications',
      };

      it('should add DAO and test files to existing library', async () => {
        await dataAccessGenerator(tree, options);

        // Check DAO file was created
        const daoContent = tree.read(
          'packages/data-access/communications/src/lib/messagesDao.ts',
          'utf-8'
        );
        expect(daoContent).toContain(
          'export function makeMessagesDao(): MessagesDao'
        );

        // Check test file was created
        const testContent = tree.read(
          'packages/data-access/communications/src/lib/test/messagesDao.test.ts',
          'utf-8'
        );
        expect(testContent).toContain(
          "import { makeMessagesDao } from '../messagesDao'"
        );

        // Check index.ts was updated
        const indexContent = tree.read(
          'packages/data-access/communications/src/index.ts',
          'utf-8'
        );
        expect(indexContent).toContain("export * from './lib/commsDao'");
        expect(indexContent).toContain("export * from './lib/threadsDao'");
        expect(indexContent).toContain("export * from './lib/messagesDao'");
      });

      it('should not duplicate exports in index.ts', async () => {
        // Add the DAO twice
        await dataAccessGenerator(tree, options);
        await dataAccessGenerator(tree, options);

        const indexContent = tree.read(
          'packages/data-access/communications/src/index.ts',
          'utf-8'
        );

        // Count occurrences of the export line
        const exportLine = "export * from './lib/messagesDao'";
        const occurrences = (
          indexContent.match(
            new RegExp(exportLine.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')
          ) || []
        ).length;
        expect(occurrences).toBe(1);

        // Also verify the content includes all expected exports
        expect(indexContent).toContain("export * from './lib/commsDao'");
        expect(indexContent).toContain("export * from './lib/threadsDao'");
        expect(indexContent).toContain("export * from './lib/messagesDao'");
      });
    });

    describe('validation for add-dao mode', () => {
      it('should throw error when no data-access libraries exist', async () => {
        // Create a clean tree with no data-access libraries
        const cleanTree = createTreeWithEmptyWorkspace();

        const options: DataAccessGeneratorSchema = {
          name: 'test',
          mode: 'add-dao',
        };

        await expect(dataAccessGenerator(cleanTree, options)).rejects.toThrow(
          'No data-access libraries found'
        );
      });

      it('should throw error when existingLibrary is not specified', async () => {
        const options: DataAccessGeneratorSchema = {
          name: 'test',
          mode: 'add-dao',
          // existingLibrary not specified
        };

        await expect(dataAccessGenerator(tree, options)).rejects.toThrow(
          'Please specify an existing library using --existingLibrary'
        );
      });

      it('should throw error when specified library does not exist', async () => {
        const options: DataAccessGeneratorSchema = {
          name: 'test',
          mode: 'add-dao',
          existingLibrary: 'non-existent-library',
        };

        await expect(dataAccessGenerator(tree, options)).rejects.toThrow(
          'Library non-existent-library not found'
        );
      });

      it('should throw error when specified library is not a data-access library', async () => {
        const options: DataAccessGeneratorSchema = {
          name: 'test',
          mode: 'add-dao',
          existingLibrary: 'regular-library',
        };

        await expect(dataAccessGenerator(tree, options)).rejects.toThrow(
          'regular-library is not a data-access library'
        );
      });

      it('should list available libraries in error message', async () => {
        const options: DataAccessGeneratorSchema = {
          name: 'test',
          mode: 'add-dao',
        };

        try {
          await dataAccessGenerator(tree, options);
          fail('Expected error to be thrown');
        } catch (error) {
          expect(error.message).toContain('data-access-communications');
          expect(error.message).toContain('data-access-crm');
          expect(error.message).not.toContain('regular-library');
        }
      });
    });
  });

  describe('default mode behavior', () => {
    it('should default to add-dao mode when mode is not specified', async () => {
      // Set up an existing data-access library
      addProjectConfiguration(tree, 'data-access-test', {
        name: 'data-access-test',
        root: 'packages/data-access/test',
        projectType: 'library',
        sourceRoot: 'packages/data-access/test/src',
        tags: ['type:data-access'],
        targets: {},
      });

      tree.write('packages/data-access/test/src/index.ts', '');

      const options: DataAccessGeneratorSchema = {
        name: 'defaultDao',
        existingLibrary: 'data-access-test',
        // mode not specified, should default to 'add-dao'
      };

      await dataAccessGenerator(tree, options);

      // Should create DAO in existing library
      expect(
        tree.exists('packages/data-access/test/src/lib/defaultDaoDao.ts')
      ).toBe(true);
    });
  });

  describe('template rendering', () => {
    beforeEach(() => {
      addProjectConfiguration(tree, 'data-access-test', {
        name: 'data-access-test',
        root: 'packages/data-access/test',
        projectType: 'library',
        sourceRoot: 'packages/data-access/test/src',
        tags: ['type:data-access'],
        targets: {},
      });

      tree.write('packages/data-access/test/src/index.ts', '');
    });

    it('should properly capitalize DAO names in templates', async () => {
      const options: DataAccessGeneratorSchema = {
        name: 'userProfile',
        mode: 'add-dao',
        existingLibrary: 'data-access-test',
      };

      await dataAccessGenerator(tree, options);

      const daoContent = tree.read(
        'packages/data-access/test/src/lib/userProfileDao.ts',
        'utf-8'
      );
      expect(daoContent).toContain('makeUserProfileDao(): UserProfileDao');
      expect(daoContent).toContain('UserProfileDao,');

      const testContent = tree.read(
        'packages/data-access/test/src/lib/test/userProfileDao.test.ts',
        'utf-8'
      );
      expect(testContent).toContain('makeUserProfileDao');
      expect(testContent).toContain("describe('UserProfileDao'");
    });
  });
});
