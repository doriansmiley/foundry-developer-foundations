# Foundry Developer Foundations

## Introduction

Foundry Developer Foundations is a reference implementation of the **Foundry‑backed / GitHub‑native** collaboration pattern created by CodeStrap, LLC.
The goal: let any JavaScript / TypeScript engineer contribute business logic to a Palantir Foundry deployment **without needing direct Foundry expertise or access**.

* **Foundry holds the data model and actions** – a single `HelloWorldFunction` action updates the `World` ontology object.
* **GitHub holds all application code** – weather lookup, greeting logic, tests, CI/CD, and the containerised Compute Module.
* **Clean implementation abstraction (DAO + Compute Module)** isolates Foundry specifics behind a function interface, so the rest of the codebase behaves like a normal Node project (using dependency injection via Inversify).
* **Foundry Mocks** an included mock Foundry instance exposes the API routes required for the application with mock responses so developers don't have to supply a Foundry stack. Simple updated the `FOUNDRY_STACK_URL` to point to your `localhost` where the mocks are running.

By following this pattern you can:

1. **Unblock external teams** – they develop, run tests, and ship PRs with no Foundry account.
2. **Enforce clear contracts** – DAOs expose *entities in ⇒ entities out*; meaning you can swap backends with something like a MongoDB instance or whatever persistence store you like.
3. **Reuse familiar tooling** – npm workspaces, eslint, GitHub Actions, container builds.
4. **Deploy predictably** – a single Docker image pushed to Foundry’s registry and released via pipeline.

## Getting Started
Checkout the [hello world](/hello-world/README.md) sample application to see an implementation of this pattern. Then explore our open source projects including Foundry Tracing Foundation and X-Reason!