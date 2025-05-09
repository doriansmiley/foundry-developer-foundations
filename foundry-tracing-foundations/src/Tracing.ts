import { Edits, OntologyEditFunction, Integer, Timestamp, Query, ExternalSystems } from "@foundry/functions-api";
import { FoundryApis } from "@foundry/external-systems/sources";

import {
    Objects,
    OpenTracingEventModel as SpanEvents,
    OpenTracingLinkModel as SpanLinks,
    OpenTracingResourceModel as Resources,
    OpenTracingSpanModel as Spans,
} from "@foundry/ontology-api";
import { Uuid } from "@foundry/functions-utils";

// Payload interfaces
export interface ResourceModel {
    resource_id: string;
    service_name: string;
    service_instance_id?: string;
    telemetry_sdk_name?: string;
    telemetry_sdk_version?: string;
    host_hostname?: string;
    host_architecture?: string;
    process_pid?: Integer;
}

export const SpanKind = {
    Client: 'Client',
    Server: 'Server',
    Internal: 'Internal',
    Producer: 'Producer',
    Consumer: 'Consumer'
} as const;

export const StatusCode = {
    UNSET: 'UNSET',
    OK: 'OK',
    ERROR: 'ERROR'
} as const;

export const SamplingDecision = {
    DROP: 'DROP',
    RECORD: 'RECORD',
    RECORD_AND_SAMPLE: 'RECORD_AND_SAMPLE'
} as const;

export interface SpanModel {
    trace_id: string;
    span_id: string;
    parent_span_id?: string;
    name: string;
    start_time: string;
    end_time: string;
    traceparent: string;
    tracestate?: string;
    trace_flags: Integer;
    kind: string;
    status_code: string;
    status_message?: string;
    error_code?: string;
    sampling_decision: string;
    sampling_rate?: Integer;
    http_method?: string;
    http_status_code?: Integer;
    db_system?: string;
    db_statement?: string;
    messaging_system?: string;
    messaging_destination?: string;
    attributes?: string;
}

export interface EventModel {
    event_id?: string;
    span_id: string;
    name: string;
    timestamp: string;
    attributes?: string;
}

export interface LinkModel {
    link_id?: string;
    source_span_id: string;
    linked_trace_id: string;
    linked_span_id: string;
    attributes?: string;
}

export interface TelemetryPayload {
    resource: ResourceModel;
    spans: SpanModel[];
    events: EventModel[];
    links: LinkModel[];
}

export class Tracing {
    public async collectTelemetryFetchWrapper(inputJSON: string): Promise<string> {
        const apiKey = FoundryApis.getSecret('additionalSecretOsdkToken');

        const baseUrl = FoundryApis.getHttpsConnection().url;
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        };

        const body = JSON.stringify({
            parameters: {
                inputJSON,
            },
            options: {
                returnEdits: "ALL"
            }
        });

        const apiResults = await fetch(`${baseUrl}/api/v2/ontologies/ontology-c0c8a326-cd0a-4f69-a575-b0399c04b74d/actions/collect-telemetry/apply`, {
            method: 'POST',
            headers,
            body,
        });

        const apiResponse = await apiResults.json() as any;

        if (apiResponse.errorCode) {
            console.log(`errorInstanceId: ${apiResponse.errorCode} errorName: ${apiResponse.errorName} errorCode: ${apiResponse.errorCode}`);
            throw new Error(`An error occured while calling update machine errorInstanceId: ${apiResponse.errorInstanceId} errorCode: ${apiResponse.errorCode}`);
        }

        return JSON.stringify(apiResponse);
    }

    public async collectTelemetry(inputJSON: string): Promise<void> {
        const payload = JSON.parse(inputJSON) as TelemetryPayload;

        // gymnastics because funciotns does not support union types
        for (const span of payload.spans) {
            if (!Object.values(SpanKind).includes(span.kind as keyof typeof SpanKind)) {
                throw new Error(`Invalid span kind: ${span.kind}`);
            }
            if (!Object.values(StatusCode).includes(span.status_code as keyof typeof StatusCode)) {
                throw new Error(`Invalid status code: ${span.status_code}`);
            }
            if (!Object.values(SamplingDecision).includes(span.sampling_decision as keyof typeof SamplingDecision)) {
                throw new Error(`Invalid sampling decision: ${span.sampling_decision}`);
            }
        }

        // Resource
        const resId = payload.resource.resource_id;
        const matchedResouces = Objects.search().openTracingResourceModel()
            .filter(resource => resource.resourceId.exactMatch(resId))
            .orderByRelevance()
            .take(1);

        let resource = matchedResouces?.[0]

        if (!resource) {
            resource = Objects.create().openTracingResourceModel(resId);
        }

        resource.serviceName = payload.resource.service_name;
        resource.serviceInstanceId = payload.resource.service_instance_id;
        resource.telemetrySdkName = payload.resource.telemetry_sdk_name;
        resource.telemetrySdkVersion = payload.resource.telemetry_sdk_version;
        resource.hostHostname = payload.resource.host_hostname;
        resource.hostArchitecture = payload.resource.host_architecture;
        resource.processPid = payload.resource.process_pid;

        // Spans
        for (const span of payload.spans) {
            const matchedSpans = Objects.search().openTracingSpanModel()
                .filter(item => item.spanId.exactMatch(span.span_id))
                .orderByRelevance()
                .take(1);

            let s = matchedSpans?.[0];
            // if the span doesn't exist create it with the associated traceID
            // I assume spanId and traceId are both unique for each span record
            if (!s) {
                s = Objects.create().openTracingSpanModel(span.span_id);
                s.traceId = span.trace_id;
            }

            s.parentSpanId = span.parent_span_id;
            s.name = span.name;
            s.startTime = Timestamp.fromJsDate(new Date(span.start_time));
            s.endTime = Timestamp.fromJsDate(new Date(span.end_time));
            s.traceparent = span.traceparent;
            s.tracestate = span.tracestate;
            s.traceFlags = span.trace_flags;
            s.kind = span.kind;
            s.statusCode = span.status_code;
            s.statusMessage = span.status_message;
            s.errorCode = span.error_code;
            s.samplingDecision = span.sampling_decision;
            s.samplingRate = span.sampling_rate;
            s.httpMethod = span.http_method;
            s.httpStatusCode = span.http_status_code;
            s.dbSystem = span.db_system;
            s.dbStatement = span.db_statement;
            s.messagingSystem = span.messaging_system;
            s.messagingDestination = span.messaging_destination;
            s.attributes = span.attributes ? JSON.stringify(JSON.parse(span.attributes)) : undefined
        }

        // Events
        for (const ev of payload.events) {
            const evId = ev.event_id || Uuid.random();
            const matchedEvents = Objects.search().openTracingEventModel()
                .filter(item => item.eventId.exactMatch(evId))
                .orderByRelevance()
                .take(1);

            let pe = matchedEvents?.[0];

            if (!pe) {
                pe = Objects.create().openTracingEventModel(evId)
            };

            pe.name = ev.name;
            pe.spanId = ev.span_id;
            pe.timestamp = Timestamp.fromJsDate(new Date(ev.timestamp));
            pe.attributes = ev.attributes ? JSON.stringify(JSON.parse(ev.attributes)) : undefined;
        }

        // Links
        for (const link of payload.links) {
            const linkId = link.link_id || Uuid.random();
            const matchedLinks = Objects.search().openTracingLinkModel()
                .filter(item => item.linkId.exactMatch(linkId))
                .orderByRelevance()
                .take(1);

            let pl = matchedLinks?.[0];

            if (!pl) {
                pl = Objects.create().openTracingLinkModel(linkId)
            };

            pl.sourceSpanId = link.source_span_id;
            pl.linkedTraceId = link.linked_trace_id;
            pl.linkedSpanId = link.linked_span_id;
            pl.attributes = link.attributes ? JSON.stringify(JSON.parse(link.attributes)) : undefined;
        }
    }
}