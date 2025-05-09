import { Tracing, TelemetryPayload } from '../Tracing';
import {
  Objects,
  OpenTracingEventModel as SpanEvents,
  OpenTracingLinkModel as SpanLinks,
  OpenTracingResourceModel as Resources,
  OpenTracingSpanModel as Spans,
} from '@foundry/ontology-api';
import {
  whenObjectSet,
  verifyOntologyEditFunction,
} from '@foundry/functions-testing-lib';
import { Timestamp } from '@foundry/functions-api';
import { Uuid } from '@foundry/functions-utils';

describe('Tracing', () => {
  let tracing: Tracing;

  beforeEach(() => {
    tracing = new Tracing();
    jest.spyOn(Uuid, 'random').mockReturnValue('mocked-uuid');
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

    // 1) No existing resource → create
    whenObjectSet(
      Objects.search()
        .openTracingResourceModel()
        .filter((r) => r.resourceId.exactMatch('resource-1'))
        .orderByRelevance()
        .takeAsync(1)
    ).thenReturn([]);

    // 2) No existing span → create
    whenObjectSet(
      Objects.search()
        .openTracingSpanModel()
        .filter((s) => s.spanId.exactMatch('span-1'))
        .orderByRelevance()
        .take(1)
    ).thenReturn([]);

    // 3) No existing event → create
    whenObjectSet(
      Objects.search()
        .openTracingEventModel()
        .filter((e) => e.eventId.exactMatch('mocked-uuid'))
        .orderByRelevance()
        .take(1)
    ).thenReturn([]);

    // 4) No existing link → create
    whenObjectSet(
      Objects.search()
        .openTracingLinkModel()
        .filter((l) => l.linkId.exactMatch('mocked-uuid'))
        .orderByRelevance()
        .take(1)
    ).thenReturn([]);

    const result = await verifyOntologyEditFunction(() =>
      tracing.collectTelemetry(JSON.stringify(mockPayload))
    );

    result
      // Resource
      .createsObject({
        objectType: Resources,
        properties: {
          resourceId: 'resource-1',
          serviceName: 'test-service',
        },
      })
      // Span
      .createsObject({
        objectType: Spans,
        properties: {
          spanId: 'span-1',
          traceId: 'trace-1',
          name: 'test-span',
          startTime: Timestamp.fromJsDate(
            new Date('2023-05-01T00:00:00Z')
          ),
          endTime: Timestamp.fromJsDate(
            new Date('2023-05-01T00:00:01Z')
          ),
          traceparent: 'traceparent-1',
          traceFlags: 1,
          kind: 'Client',
          statusCode: 'OK',
          samplingDecision: 'RECORD',
        },
      })
      // Event (now also checking name, spanId, timestamp)
      .createsObject({
        objectType: SpanEvents,
        properties: {
          eventId: 'mocked-uuid',
          spanId: 'span-1',
          name: 'test-event',
          timestamp: Timestamp.fromJsDate(
            new Date('2023-05-01T00:00:00.500Z')
          ),
        },
      })
      // Link (now also checking sourceSpanId and attributes)
      .createsObject({
        objectType: SpanLinks,
        properties: {
          linkId: 'mocked-uuid',
          sourceSpanId: 'span-1',
          linkedTraceId: 'trace-2',
          linkedSpanId: 'span-2',
        },
      })
      .hasNoMoreEdits();
  });
});
