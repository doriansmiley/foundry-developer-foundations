// Payload interfaces
import { container } from "@tracing/inversify.config";
import { TYPES, FoundryClient } from "@tracing/types";
export interface ResourceModel {
    resource_id: string;
    service_name: string;
    service_instance_id?: string;
    telemetry_sdk_name?: string;
    telemetry_sdk_version?: string;
    host_hostname?: string;
    host_architecture?: string;
    process_pid?: number;
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
    trace_flags: number;
    kind: string;
    status_code: string;
    status_message?: string;
    error_code?: string;
    sampling_decision: string;
    sampling_rate?: number;
    http_method?: string;
    http_status_code?: number;
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
        const client = container.get<FoundryClient>(TYPES.FoundryClient);
        const token = await client.auth.signIn();
        const apiKey = token.access_token;

        const url = `${client.url}/api/v2/ontologies/ontology-c0c8a326-cd0a-4f69-a575-b0399c04b74d/actions/say-hello/apply`;

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

        const apiResults = await fetch(`${url}/api/v2/ontologies/ontology-c0c8a326-cd0a-4f69-a575-b0399c04b74d/actions/collect-telemetry/apply`, {
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
}