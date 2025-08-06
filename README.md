# WiP: Foundry Developer Foundations

### IMPORTANT: This project is under active development and refactoring in preparation for v0

# If you are a developer and want to learn and contribute to this project email me at dsmiley@codestrap.me and I will train you. This is a limited time offer while we build our core user and contributor base.

### IMPORTANT: This README is also under active development and not ready for use.

Do not use this code in your applications. We are looking for contributors. You can participate without a Foundry stack by following the contributor guide. We expect a v0 release in June 2025.

## Introduction

Foundry Developer Foundations is a reference implementation of the **Foundry‑backed / GitHub‑native** collaboration pattern created by CodeStrap, LLC.
The goal: let any JavaScript / TypeScript engineer contribute business logic to a Palantir Foundry deployment **without needing direct Foundry expertise or access**.

- **Foundry holds the data model and actions** – i.e. a `HelloWorldFunction` action updates the `World` ontology object.
- **GitHub holds all application code** – i.e. services, data access objects (DAO), logic, tests, CI/CD, APIs, and containers.
- **Clean implementation abstraction (DAO + Compute Module)** isolates Foundry specifics behind a function interface, so the rest of the codebase behaves like a normal Node project (using dependency injection via Inversify).
- **Foundry Mocks** an included mock Foundry instance exposes the API routes required for the application with mock responses so developers don't have to supply a Foundry stack. Simple updated the `FOUNDRY_STACK_URL` to point to your `localhost` where the mocks are running. Jest mocks are also used for unit tests.

By following this pattern you can:

1. **Unblock external teams** – they develop, run tests, and ship PRs with no Foundry account.
2. **Enforce clear contracts** – DAOs expose _entities in ⇒ entities out_; meaning you can swap backends with something like a MongoDB instance or whatever persistence store you like.
3. **Reuse familiar tooling** – npm workspaces, eslint, GitHub Actions, container builds.
4. **Deploy predictably** – a single Docker image pushed to Foundry’s registry and released via pipeline.

## Getting Started

### Prerequisites

- Node.js 22.13.0 or higher (use `nvm use` if you have nvm installed)
- npm 10.9.0 or higher

### Installation

**Common Issue**: npm install may hang during nx postinstall setup. If you're experiencing npm install issues (hanging or timeouts), run our fix script:

```bash
./scripts/fix-npm-install.sh
```

Or manually:

```bash
# Use the correct Node.js version
nvm use 22

# Clean install (skip nx postinstall to prevent hanging)
rm -rf node_modules package-lock.json .nx/installation
npm cache clean --force
export NX_WRAPPER_SKIP_INSTALL=true
npm install --no-fund --no-audit --prefer-offline

# Initialize nx after npm install completes
npx nx --version
```

### Quick Start

Checkout the [hello world](/hello-world/README.md) sample application to see an implementation of this pattern. Then explore our open source projects including Foundry Tracing Foundation and X-Reason!
