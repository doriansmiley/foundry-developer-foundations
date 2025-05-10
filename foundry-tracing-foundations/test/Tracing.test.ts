import {
  collectTelemetryFetchWrapper,
  TelemetryPayload,
} from '../src/Tracing';

global.fetch = jest.fn();

describe('Tracing', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (global.fetch as jest.Mock).mockImplementation((url: string) => {
      if (/\/api\/v2\/ontologies\/ontology-c0c8a326-cd0a-4f69-a575-b0399c04b74d\/actions\/say-hello\/apply/.test(url)) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ message: 'thanks for tracing with us!' }),
        });
      }
      return Promise.reject(new Error('URL not matched'));
    });
  });

  it('should collect telemetry data', async () => {
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
    expect(result).toBeDefined();
    expect(result).toEqual({ message: 'Hello World' });
  });
});
