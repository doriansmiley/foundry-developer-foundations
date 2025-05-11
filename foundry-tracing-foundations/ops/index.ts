import path from 'path';
import dotenv from 'dotenv';
import { writeGreeting } from '../src/writeGreeting';
import {
  collectTelemetryFetchWrapper,
  TelemetryPayload,
} from '../src/Tracing';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../.env') });

async function sendTestGreeting(city?: string): Promise<void> {
  try {
    console.log('🚀 Starting greeting test...\n');

    const result = await writeGreeting(city ?? 'San Francisco');
    console.log('writeGreeting returned:', JSON.stringify(result, null, 2));
    process.exit(0);
  } catch (error) {
    console.error('\n💥 Test failed:', error);
    process.exit(1);
  }
}

async function testCollectTelemetry(): Promise<void> {
  const mockPayload: TelemetryPayload = {
    resource: {
      resource_id: 'resource-1',
      service_name: 'test-service',
    },
    spans: [
      {
        trace_id: 'trace-1',
        span_id: 'span-1',
        name: 'test-span',
        start_time: '2023-05-01T00:00:00Z',
        end_time: '2023-05-01T00:00:01Z',
        traceparent: 'traceparent-1',
        trace_flags: 1,
        kind: 'Client',
        status_code: 'OK',
        sampling_decision: 'RECORD',
      },
    ],
    events: [
      {
        span_id: 'span-1',
        name: 'test-event',
        timestamp: '2023-05-01T00:00:00.500Z',
      },
    ],
    links: [
      {
        source_span_id: 'span-1',
        linked_trace_id: 'trace-2',
        linked_span_id: 'span-2',
      },
    ],
  };

  const result = await collectTelemetryFetchWrapper(JSON.stringify(mockPayload));
  console.log(`testCollectTelemetry returned ${result}`)
}

// Only run CLI code when this file is executed directly
if (require.main === module) {
  // Handle command line arguments based on the operation
  const operation = process.argv[2];
  const [arg1, arg2, arg3, arg4] = process.argv.slice(3);

  switch (operation) {
    case 'greet':
      sendTestGreeting(arg1);
      break;
    case 'telemetry':
      testCollectTelemetry();
      break;
    default:
      console.error('Invalid operation. Available operations: email, schedule, find-time');
      process.exit(1);
  }
} 