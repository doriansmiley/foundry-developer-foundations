import dotenv from 'dotenv';
import { collectTelemetryFetchWrapper } from '../src/Tracing';
import { mockPayload } from './__fixtures__/telemetryPayload';

// Load environment variables
dotenv.config();
// Mock setup must be before imports
import { TestModule } from '../src/types';
import { computeModule } from '../src/computeModule';

// Cast computeModule to TestModule since we're in test environment
const testModule = computeModule as TestModule;

describe('Compute Module Registration', () => {
  beforeEach(() => {
    process.env.GSUITE_SERVICE_ACCOUNT = 'test-service-account';
    process.env.OSDK_CLIENT_ID = 'test-client-id';
    process.env.OSDK_CLIENT_SECRET = 'test-client-secret';
    process.env.FOUNDRY_STACK_URL = 'test-foundry-stack-url';
    process.env.ONTOLOGY_RID = 'test-ontology-rid';

    // Register operations with actual handlers
    testModule.register('Trace', collectTelemetryFetchWrapper);

    // Register responsive handler
    testModule.on('responsive', () => {
      console.log(`${process.env.LOG_PREFIX} Module is now responsive`);
    });
  });

  it('should create trace segments', async () => {
    const operations = ['Trace'];

    // Initial check
    operations.forEach((op) => {
      expect(testModule.listeners[op]).toBeDefined();
      expect(testModule.listeners[op].type).toBe('response');
    });

    // Simulate multiple responsive events
    for (let i = 0; i < 3; i++) {
      const responsiveHandler = testModule.listeners['responsive'];
      if (responsiveHandler) {
        responsiveHandler();
      }

      // Verify after each event
      operations.forEach((op) => {
        expect(testModule.listeners[op]).toBeDefined();
        expect(testModule.listeners[op].type).toBe('response');
      });
    }

    // Execute calendar operations
    const result = await testModule.listeners['Trace'].listener(
      JSON.stringify(mockPayload)
    );

    expect(result).toBeDefined();
  }, 10000);
});
