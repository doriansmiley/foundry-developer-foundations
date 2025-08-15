# Service Function Generator

This generator creates service functions and their corresponding tests within service libraries.

## Usage

```bash
nx generate @codestrap/developer-foundations:service-function --name=<functionName> --serviceLib=<serviceLibrary> --path=<functionPath>
```

### Parameters

- `name` (required): The name of the function to generate
- `serviceLib` (required): The service library to add the function to (e.g., "google-v2")
- `path` (required): The path within the functions directory (e.g., "gmail", "calendar")

### Examples

#### Generate a Gmail function

```bash
nx generate @codestrap/developer-foundations:service-function --name=readEmails --serviceLib=google-v2 --path=gmail
```

This will generate:

- `packages/services/google-v2/src/lib/functions/gmail/readEmails.ts`
- `packages/services/google-v2/src/lib/tests/gmail/readEmails.test.ts`

#### Generate a Calendar function

```bash
nx generate @codestrap/developer-foundations:service-function --name=createEvent --serviceLib=google-v2 --path=calendar
```

This will generate:

- `packages/services/google-v2/src/lib/functions/calendar/createEvent.ts`
- `packages/services/google-v2/src/lib/tests/calendar/createEvent.test.ts`

### Index Files

The generator automatically updates or creates:

- `src/lib/functions/index.ts` - Exports all functions
- `src/lib/functions/{path}/index.ts` - Exports functions in the specific path

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
│       ├── functions/
│       │   ├── index.ts                    # Updated with new export
│       │   └── gmail/
│       │       ├── index.ts               # Updated with new export
│       │       └── readEmails.ts          # Generated function
│       └── tests/
│           └── gmail/
│               └── readEmails.test.ts     # Generated test
```
