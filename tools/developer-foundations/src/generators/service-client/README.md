# Service Client Generator

This generator creates service clients and their corresponding tests within service libraries. These are client classes for integrating with external APIs and services.

## Usage

```bash
nx generate @codestrap/developer-foundations:service-client --name=<clientName> --serviceLib=<serviceLibrary>
```

### Parameters

- `name` (required): The name of the client to generate
- `serviceLib` (required): The service library to add the client to (e.g., "google-v2")

### Examples

#### Generate a Google Suite client

```bash
nx generate @codestrap/developer-foundations:service-client --name=gsuiteClient --serviceLib=google-v2
```

This will generate:

- `packages/services/google-v2/src/lib/clients/gsuiteClient.ts`
- `packages/services/google-v2/src/lib/tests/clients/gsuiteClient.test.ts`

#### Generate a Slack client

```bash
nx generate @codestrap/developer-foundations:service-client --name=slackClient --serviceLib=slack
```

This will generate:

- `packages/services/slack/src/lib/clients/slackClient.ts`
- `packages/services/slack/src/lib/tests/clients/slackClient.test.ts`

### Index Files

The generator automatically updates or creates:

- `src/lib/clients/index.ts` - Exports all clients

## Service Library Discovery

The generator can find service libraries using various naming patterns:

- Exact match: `google-v2`
- With "services-" prefix: `services-google-v2`
- With "service-" prefix: `service-google-v2`
- By searching in `packages/services/` directory

## File Structure

After running the generator, your service library will have this structure:

```
packages/services/google-v2/
├── src/
│   └── lib/
│       ├── clients/
│       │   ├── index.ts               # Updated with new export
│       │   └── gsuiteClient.ts        # Generated client
│       └── tests/
│           └── clients/
│               └── gsuiteClient.test.ts  # Generated test
```

## Client Structure

The generated client follows this pattern:

```typescript
// Internal authentication and client creation
async function makeClient(user: string) {
  // Authentication logic, credential loading, scope setup
  const client = createApiClient({ auth, scopes });
  return { client };
}

// Public service interface
export interface GsuiteClientService {
  exampleMethod: (params: any) => Promise<any>;
}

// Configuration interface
export interface GsuiteClientConfig {
  apiKey?: string;
  baseUrl?: string;
}

// Main factory function
export async function makeGsuiteClient(
  user: string
): Promise<GsuiteClientService> {
  const { client } = await makeClient(user);

  return {
    exampleMethod: async (params: any) => {
      // Calls imported function from function catalog
      const result = await exampleFunction(client, params);
      return result;
    },
  };
}
```

## Usage Examples

After generation, you can use the client like this:

```typescript
import { makeGsuiteClient } from '@your-org/google-v2';

const service = await makeGsuiteClient('user@example.com');
const result = await service.exampleMethod({ param: 'value' });
```
