# agents-vickie-bennie

This library was generated with [Nx](https://nx.dev).

## Building

Run `nx build agents-vickie-bennie` to build the library.

## Running unit tests

Run `nx test agents-vickie-bennie` to execute the unit tests via [Jest](https://jestjs.io).

Running e2e tests e.g
`E2E=true nx run agents-vickie-bennie:test --testFile=researchAssistant.e2e.test.ts`

## Building docker image locally

- Run `npm install` in root monorepo
- Build vickie-bennie image: `nx run agents-vickie-bennie:build`
- Build docker image:
  `docker build -t vickie-bennie:latest -f packages/agents/vickie-bennie/Dockerfile .`
