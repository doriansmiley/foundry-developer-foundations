# Data Access Generator

A powerful Nx generator for creating and managing data-access libraries in the foundry-developer-foundations workspace. This generator follows established patterns and can either create new data-access libraries or add DAOs to existing ones.

## Features

- ✅ **Two Operation Modes**: Create new libraries or add DAOs to existing ones
- ✅ **Smart Library Detection**: Automatically finds existing data-access libraries by tags
- ✅ **Pattern Compliance**: Follows established data-access library structure
- ✅ **Configurable Publishing**: Support for both public and private packages
- ✅ **Validation**: Comprehensive error checking and validation
- ✅ **Template Generation**: Automatic DAO and test file creation

## Usage

### Basic Syntax

```bash
npx nx g @codestrap/developer-foundations:data-access <name> [options]
```

### Add DAO to Existing Library

```bash
# Add a messages DAO to the communications library
npx nx g @codestrap/developer-foundations:data-access messages --mode=add-dao --existingLibrary=data-access-communications

# Add a products DAO to the inventory library
npx nx g @codestrap/developer-foundations:data-access products --mode=add-dao --existingLibrary=data-access-inventory
```

### Create New Data-Access Library

```bash
# Create a new public data-access library for inventory domain
npx nx g @codestrap/developer-foundations:data-access inventory --mode=new-library --domain=inventory --isPublic=true

# Create a new private data-access library for billing domain
npx nx g @codestrap/developer-foundations:data-access billing --mode=new-library --domain=billing --isPublic=false

# Create a new library with custom import path
npx nx g @codestrap/developer-foundations:data-access orders --mode=new-library --domain=orders --importPath=@custom/orders-data-access
```

## Configuration Options

| Option            | Type    | Required | Default        | Description                                                     |
| ----------------- | ------- | -------- | -------------- | --------------------------------------------------------------- |
| `name`            | string  | ✅       | -              | Name for the DAO or library                                     |
| `mode`            | string  | ❌       | `add-dao`      | Operation mode: `new-library` or `add-dao`                      |
| `domain`          | string  | ✅\*     | -              | Domain name for new libraries (required for `new-library` mode) |
| `existingLibrary` | string  | ✅\*     | -              | Target library name (required for `add-dao` mode)               |
| `isPublic`        | boolean | ❌       | `true`         | Whether the package should be publicly published                |
| `importPath`      | string  | ❌       | Auto-generated | Custom import path for the library                              |
| `directory`       | string  | ❌       | `data-access`  | Directory where library should be created                       |

\* Required depending on the mode

## Generated File Structure

### New Library Mode

When creating a new library with `--mode=new-library --domain=inventory`, the generator creates:

```
packages/data-access/inventory/
├── README.md
├── package.json                    # With proper dependencies and publishConfig
├── project.json                    # Nx project configuration with type:data-access tag
├── tsconfig.json                   # Base TypeScript configuration
├── tsconfig.lib.json              # Library-specific TypeScript config
├── tsconfig.spec.json             # Test TypeScript configuration
├── jest.config.ts                 # Jest testing configuration
├── eslint.config.mjs              # ESLint configuration
└── src/
    ├── index.ts                    # Barrel exports
    └── lib/
        ├── inventoryDao.ts         # Main DAO implementation
        └── test/
            └── inventoryDao.test.ts # Unit tests
```

### Add DAO Mode

When adding a DAO with `--mode=add-dao --existingLibrary=data-access-communications`, the generator creates:

```
packages/data-access/communications/src/lib/
├── messagesDao.ts                  # New DAO implementation
└── test/
    └── messagesDao.test.ts         # New unit tests
```

And updates:

- `src/index.ts` - Adds export for the new DAO

## Generated Code Examples

### DAO Implementation (`{name}Dao.ts`)

```typescript
import type {
  FoundryClient,
  MessagesDao,
} from '@codestrap/developer-foundations-types';
import { TYPES } from '@codestrap/developer-foundations-types';
import { container } from '@codestrap/developer-foundations-di';

export function makeMessagesDao(): MessagesDao {
  const client = container.get<FoundryClient>(TYPES.FoundryClient);

  return {
    // TODO: Implement DAO methods using OSDK API calls
    upsert: async (...params) => {
      console.log(
        'stub upsert method for Messages. Implement using OSDK API calls.'
      );
      // Implementation goes here
      throw new Error('Not implemented');
    },
    delete: async (id: string) => {
      console.log(
        `stub delete method called for: ${id}. We do not support deleting messages but include the method as it is part of the interface.`
      );
      // Implementation goes here if needed
    },
    read: async (id: string) => {
      console.log(`stub read method for Messages with id: ${id}`);
      // Implementation goes here
      throw new Error('Not implemented');
    },
  };
}
```

### Test Implementation (`{name}Dao.test.ts`)

```typescript
import { makeMessagesDao } from '../messagesDao';

describe('MessagesDao', () => {
  it('should be defined', () => {
    const dao = makeMessagesDao();
    expect(dao).toBeDefined();
  });

  // TODO: Add more comprehensive tests
  describe('read', () => {
    it('should throw not implemented error', async () => {
      const dao = makeMessagesDao();
      await expect(dao.read('test-id')).rejects.toThrow('Not implemented');
    });
  });

  describe('upsert', () => {
    it('should throw not implemented error', async () => {
      const dao = makeMessagesDao();
      await expect(dao.upsert()).rejects.toThrow('Not implemented');
    });
  });
});
```

### Package Configuration (`package.json`)

```json
{
  "name": "@codestrap/developer-foundations-data-access-inventory",
  "version": "0.0.1",
  "type": "commonjs",
  "main": "./src/index.js",
  "types": "./src/index.d.ts",
  "publishConfig": {
    "access": "public"
  },
  "dependencies": {
    "@codestrap/developer-foundations-types": "*",
    "@codestrap/developer-foundations-di": "*",
    "tslib": "^2.3.0"
  }
}
```

## Available Data-Access Libraries

To see which libraries are available for adding DAOs, run the generator without specifying `--existingLibrary`:

```bash
npx nx g @codestrap/developer-foundations:data-access myDao --mode=add-dao
```

This will show an error message listing all available data-access libraries:

```
Please specify an existing library using --existingLibrary. Available libraries: data-access-communications, data-access-crm, data-access-hello-world, data-access-platform, data-access-project-management, data-access-sales
```

## Error Handling

The generator includes comprehensive validation:

### Missing Domain (New Library Mode)

```bash
npx nx g @codestrap/developer-foundations:data-access test --mode=new-library
# Error: Domain is required when creating a new library. Please provide --domain=<domain-name>
```

### Missing Existing Library (Add DAO Mode)

```bash
npx nx g @codestrap/developer-foundations:data-access test --mode=add-dao
# Error: Please specify an existing library using --existingLibrary. Available libraries: ...
```

### Invalid Library Name

```bash
npx nx g @codestrap/developer-foundations:data-access test --mode=add-dao --existingLibrary=non-existent
# Error: Library non-existent not found.
```

### Wrong Library Type

```bash
npx nx g @codestrap/developer-foundations:data-access test --mode=add-dao --existingLibrary=regular-library
# Error: regular-library is not a data-access library.
```

## Development Notes

### Dependencies

New libraries automatically include these dependencies:

- `@codestrap/developer-foundations-types`: Type definitions
- `@codestrap/developer-foundations-di`: Dependency injection container
- `tslib`: TypeScript runtime library

### Project Tags

All generated libraries include the `type:data-access` tag for easy identification and filtering.

### Naming Conventions

- **Library Name**: `data-access-{domain}`
- **Package Name**: `@codestrap/developer-foundations-data-access-{domain}`
- **DAO Function**: `make{CapitalizedName}Dao()`
- **DAO Interface**: `{CapitalizedName}Dao`

### File Organization

- Main DAO files go in `src/lib/`
- Test files go in `src/lib/test/`
- All DAOs are exported from `src/index.ts`

## Testing

Run the generator tests:

```bash
npx nx test developer-foundations
```

The test suite covers:

- ✅ New library creation (public/private)
- ✅ Adding DAOs to existing libraries
- ✅ Custom import paths
- ✅ Validation scenarios
- ✅ Template rendering
- ✅ Export management
