# GSuite Client V3

## Overview
This is the third iteration of the GSuite client for Google Drive integration.
It adds support for Drive file search delegates and aligns with the new service binding pattern.

## Key differences from V2
- Introduces `searchDriveFiles` delegate
- Refactored to reduce coupling with Gmail service

## Usage
Import via the service index:

```ts
import { searchDriveFiles } from '@foundry/services/google';

```
See searchDriveFiles.test.ts for usage examples and expected behavior.

