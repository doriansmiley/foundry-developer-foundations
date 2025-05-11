# Foundry Tracing Foundations

## Introduction
Foundry Tracing Foundations is a Foundry native implementation of open tracing. Tracing spans are stored in the ontology where Foundry native tooling is used to assemble reports and interactive applications to view application performance.

## Getting Started
1. First download and install the [Foundry Tracing Foundations](#) Marketplace application on your Foundry stack. We are working on mocks for Foundry but have not published them yet. Once the mocks are done you no longer will require a Foundry stack.
1. Run `npm install`
1. Create a `.env` file and set the following values
```
FOUNDRY_STACK_URL=<your stack url>
OSDK_CLIENT_SECRET=<your osdk client secret>
OSDK_CLIENT_ID=<your osdk client id>
OPEN_WEATHER_API_KEY=<an open wheahter API key https://home.openweathermap.org/>
LOG_PREFIX=foundry-developer-foundations
```
1. Run `npm run build` to verify you can build
1. Run `npm run lint` to verify your eslint setup
1. Run `npm run test` to test the code
1. Run `npm run docker:build` to build the docker container
1. Create a compute module and follow the instructions to deploy your docker container. Update the content of `buildAndPublish.sh` with your deploy commands from the compute module dashboard in Foundry.

## Example usage
Usee the class decorators to setup traces. This will cause the main parent trace to be setup and attach all child spans to it. We'll be creating a functional version soon.
```typescript
import { Trace, TraceSpan } from '@trace/Decorators';

export class DecoratorTest {
    @Trace({
        resource: {
            service_name: 'vickie',
            service_instance_id: 'production',
            telemetry_sdk_name: 'xreason-functions',
            telemetry_sdk_version: '6.1.1',
            host_hostname: 'codestrap.usw-3.palantirfoundry.com',
            host_architecture: 'prod',
        },
        operationName: 'vickieForAutomate',
        kind: 'Server',
        samplingDecision: 'RECORD_AND_SAMPLE',
        samplingRate: 1.0,
        attributes: { endpoint: '/api/v2/ontologies/ontology-c0c8a326-cd0a-4f69-a575-b0399c04b74d/queries/vickieForAutomate/execute' }
    })
    public async testDecorator(): Promise<string> {
        await this.childSegment();
        return 'segments traces';
    }

    @TraceSpan({ operationName: 'loadUser', kind: 'Internal' })
    public async childSegment(): Promise<string> {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve('test');
            }, 500)
        });
    }
}
```
