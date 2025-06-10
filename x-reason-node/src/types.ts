import { ComputeModule } from '@palantir/compute-module';
import type { Client } from "@osdk/client";
import { Type, Static } from '@sinclair/typebox';

export const TYPES = {
    FoundryClient: Symbol.for("FoundryClient"),
    RangrClient: Symbol.for("RangrClient"),
    WeatherService: Symbol.for("WeatherService"),
    WorldDao: Symbol.for("WorldDao"),
    UserDao: Symbol.for("UserDao"),
    MachineDao: Symbol.for("MachineDao"),
    TicketDao: Symbol.for("TicketDao"),
    CommsDao: Symbol.for("CommsDao"),
    ThreadsDao: Symbol.for("ThreadsDao"),
    RfpRequestsDao: Symbol.for("RfpRequestsDao"),
    RangrRfpRequestsDao: Symbol.for("RangrRfpRequestsDao"),
    GeminiService: Symbol.for("GeminiService"),
    GeminiSearchStockMarket: Symbol.for("GeminiSearchStockMarket"),
    OfficeService: Symbol.for("OfficeService"),
    MessageService: Symbol.for("MessageService"),
};

// Schema Definitions for compute module
// IMPORTANT:  @sinclair/typebox is required!!!
// https://github.com/palantir/typescript-compute-module?tab=readme-ov-file#schema-registration
export const Schemas = {
    SendEmail: {
        input: Type.Object({
            recipients: Type.Array(Type.String()),
            subject: Type.String(),
            message: Type.String()
        }),
        output: Type.Object({
            id: Type.String(),
            threadId: Type.String(),
            labelIds: Type.Array(Type.String())
        })
    },
    ScheduleMeeting: {
        input: Type.Object({
            summary: Type.String(),
            description: Type.Optional(Type.String()),
            start: Type.String(),
            end: Type.String(),
            attendees: Type.Array(Type.String())
        }),
        output: Type.Object({
            id: Type.String(),
            htmlLink: Type.String(),
            status: Type.String()
        })
    },
    FindOptimalMeetingTime: {
        input: Type.Object({
            participants: Type.Array(Type.String()),
            timeframe_context: Type.String(),
            duration_minutes: Type.Optional(Type.Number({ default: 30 })),
            working_hours: Type.Optional(Type.Object({
                start_hour: Type.Number({ default: 9 }),
                end_hour: Type.Number({ default: 17 })
            })),
            timezone: Type.String(),
        }),
        output: Type.Object({
            suggested_times: Type.Array(Type.Object({
                start: Type.String(),
                end: Type.String(),
                score: Type.Number()
            })),
            message: Type.String()
        })
    }
};

// Types from Schemas
export type ScheduleMeetingInput = Static<typeof Schemas.ScheduleMeeting.input>;
export type ScheduleMeetingOutput = Static<typeof Schemas.ScheduleMeeting.output>;
export type SendEmailOutput = Static<typeof Schemas.SendEmail.output>;
export type SendEmailInput = Static<typeof Schemas.SendEmail.input>;
export type FindOptimalMeetingTimeInput = Static<typeof Schemas.FindOptimalMeetingTime.input>;
export type FindOptimalMeetingTimeOutput = Static<typeof Schemas.FindOptimalMeetingTime.output>;

export type MessageResponse = {
    ok: boolean,
    channel: string,
    ts: number,
    error?: string
}

export type Message = {
    channelId: string,
    message: string,
}

export interface EmailConfig {
    recipients: string[];
    defaultSubject: string;
    defaultMessage: string;
}

export interface CalendarConfig {
    attendees: string[];
    defaultSummary: string;
    defaultDescription: string;
    defaultTimeframe: string;
    defaultDuration: number;
    defaultWorkingHours: WorkingHours;
}

export interface Config {
    email: EmailConfig;
    calendar: CalendarConfig;
}

export interface WorkingHours {
    start_hour: number;
    end_hour: number;
}

export interface TimeSlot {
    start: string;
    end: string;
    score?: number;
    attendees?: string;
    id?: string;
    startLocalDate?: string;
    endLocalDate?: string;
    duration?: number;
}

export interface EmailContext {
    from: string;
    recipients: string[];
    subject: string;
    message: string;
}

export interface CalendarContext {
    summary: string;
    description?: string;
    start: string;
    end: string;
    attendees: string[];
}

export interface OptimalTimeContext {
    participants: string[];
    timeframe_context: string;
    duration_minutes?: number;
    working_hours?: WorkingHours;
    timezone?: string;
}

export interface TimeRange {
    startTime: Date;
    endTime: Date;
}

export interface BusyPeriod {
    start: string;
    end: string;
}

export type AvailableTime = {
    start: string; // Available start time
    end: string; // IANA time zone (e.g., "America/New_York")
    availableAttendees: string[]; // Attendees available at this time
    unavailableAttendees: string[]; // Attendees unavailable at this time
};

export type ProposedTimes = {
    times: AvailableTime[]; // Array of available time slots
    subject: string; // Meeting subject or title
    agenda?: string; // Optional agenda
    durationInMinutes: number; // Meeting duration in minutes
    allAvailable: boolean; // are all required attendees available
};

export type MeetingRequest = {
    participants: Array<string>;
    subject: string;
    timeframe_context: 'user defined exact date/time' | 'as soon as possible' | 'this week' | 'next week';
    localDateString?: string,
    duration_minutes: number;
    working_hours: {
        start_hour: number;
        end_hour: number;
    }
}

export type Meeting = {
    "id": string;
    "status": string;
    "htmlLink": string;
}

export interface GeminiParameters {
    "stopSequences"?: Array<string>;
    "temperature"?: number;
    "maxTokens"?: number;
    "topP"?: number;
    "extractJsonString"?: boolean;
};

export interface GeminiService {
    (user: string, system: string, params?: GeminiParameters): Promise<string>;
}

export interface Token {
    readonly access_token: string;
    readonly expires_in: number;
    readonly refresh_token?: string;
    readonly expires_at: number;
}

export interface BaseOauthClient {
    (): Promise<string>;
    getTokenOrUndefined: () => string | undefined;
    signIn: () => Promise<Token>;
    signOut: () => Promise<void>;
}

export interface FoundryClient {
    client: Client;
    auth: BaseOauthClient;
    ontologyRid: string;
    url: string;
    getUser: () => Promise<User>;
}

export interface RangrClient {
    client: Client;
    auth: BaseOauthClient;
    ontologyRid: string;
    url: string;
    getUser: () => Promise<User>;
}

// Basic example of calling other services besides Foundry.
export interface WeatherService {
    (city: string): Promise<string>;
}

export interface GeminiSearchStockMarket {
    (userQuery: string): Promise<string>;
}

export interface APIError extends Error {
    response?: {
        data: any;
    };
}

export interface ModuleConfig {
    isTest?: boolean;
}

export interface TestModule {
    listeners: Record<string, any>;
    on(event: string, handler: Function): TestModule;
    register(operation: string, handler: Function): TestModule;
}

export type ComputeModuleType = TestModule | ComputeModule<any>;

export interface GreetingInput {
    message: string;
    userId: string;
}

export interface GreetingResult {
    id: string;
    greeting: string;
}

export interface User {
    id: string;
    username: string;
    givenName?: string;
    familyName?: string;
    email?: string;
    organization?: string;
    attributes: Record<string, any>;
}

export interface MachineExecutions {
    /** Current State */
    /** holds the current state of the state machine */
    currentState: string | undefined;
    /** Id */
    /** The uuid of the machine execution. It uniquely identifies the machine. */
    readonly id: string;
    /** Logs */
    /** Holds the execution logs from a machine execution. The logs are generated by the TypeScript functions */
    logs: string | undefined;
    /** Machine */
    /** Holds the state machine generated for the solution. The machine is a JSON string using the x-reason JSON schema. */
    machine: string | undefined;
    /** State */
    /** The current state of the state machine execution */
    state: string | undefined;
}

export interface Communications {
    /** Channel */
    channel: string | undefined;
    /** Completion Error Task List */
    completionErrorTaskList: string | undefined;
    /** Created On */
    createdOn: number | undefined;
    /** Formatted Message */
    formattedMessage: string | undefined;
    /** Id */
    readonly id: string;
    /** Machine */
    /** Holds the generated state machine for the given task list */
    machine: string | undefined;
    /** Owner */
    owner: string | undefined;
    /** Question Prompt */
    questionPrompt: string | undefined;
    /** Status */
    /** The current status of the tasks to perform. Must be one of Open, Accepted, or Rejected */
    status: string | undefined;
    /** Task List */
    taskList: string | undefined;
    /** Tokens */
    tokens: number | undefined;
    /** type */
    type: string | undefined;
}

export interface Threads {
    /** appId */
    appId: string | undefined;
    /** id */
    readonly id: string;
    /** messages */
    messages: string | undefined;
    /** userId */
    userId: string | undefined;
}

/** Holds rfp requests */
export interface RfpRequests {
    /** Created On */
    createdOn: number;
    /** id */
    readonly id: string;
    /** machineExecutionId */
    machineExecutionId: string | undefined;
    /** rfp */
    rfp: string | undefined;
    /** rfpResponse */
    rfpResponse: string | undefined;
    /** vendorId */
    vendorId: string | undefined;
}

export interface Tickets {
    /** Ticket Id */
    readonly alertId: string;
    /** Ticket Title */
    alertTitle: string | undefined;
    /** Ticket Type */
    alertType: string | undefined;
    /** Assignee */
    assignees: string | undefined;
    /** createdOn */
    createdOn: number;
    /** Description */
    description: string | undefined;
    /** Machine */
    /** Holds the generated state machine based on the Task List */
    machine: string | undefined;
    /** modifiedOn */
    modifiedOn: number;
    /** points */
    points: number;
    /** Severity */
    severity: string | undefined;
    /** Status */
    status: string | undefined;
}

export type OfficeService = {
    getAvailableMeetingTimes: (meetingRequest: MeetingRequest) => Promise<FindOptimalMeetingTimeOutput>,
    scheduleMeeting: (meeting: CalendarContext) => Promise<ScheduleMeetingOutput>,
    sendEmail: (email: EmailContext) => Promise<SendEmailOutput>,
}

export type MessageService = {
    sendMessage: (message: Message) => Promise<MessageResponse>,
}

/** Holds rfp responses */
export type RfpRequestResponse = {
    status: number;
    message: string;
    machineExecutionId: string;
    vendorName: string;
    vendorId: string;
    received: boolean;
    response?: string;
    error?: string;
    receipt?: {
        id: string,
        timestamp: Date,
    };
}

export type TicketsDao = {
    upsert: (
        id: string,
        alertTitle: string,
        alertType: string,
        description: string,
        severity: string,
        status: string,
        points?: number,
        assignees?: string,
    ) => Promise<Tickets>,
    delete: (id: string) => Promise<void>,
    read: (id: string) => Promise<Tickets>,
};

export type WorldDao = (input: GreetingInput) => Promise<GreetingResult>;

export type UserDao = () => Promise<User>;

export type MachineDao = {
    upsert: (id: string, stateMachine: string, state: string, logs: string) => Promise<MachineExecutions>,
    delete: (machineExecutionId: string) => Promise<void>,
    read: (machineExecutionId: string) => Promise<MachineExecutions>,
};

export type CommsDao = {
    upsert: (
        channel: string,
        formattedMessage: string,
        status: string,
        taskList: string,
        comType: string,
        owner: string,
        questionPrompt?: string,
        tokens?: number,
        id?: string,) => Promise<Communications>,
    delete: (id: string) => Promise<void>,
    read: (id: string) => Promise<Communications>,
};

export type ThreadsDao = {
    upsert: (messages: string, appId: string, id?: string) => Promise<Threads>,
    delete: (id: string) => Promise<void>,
    read: (id: string) => Promise<Threads>,
};

//RfpRequestsDao
export type RfpRequestsDao = {
    upsert: (
        rfp: string,
        rfpVendorResponse: string,
        vendorId: string,
        machineExecutionId: string,
        id?: string,
    ) => Promise<RfpRequests>,
    delete: (id: string) => Promise<void>,
    read: (id: string) => Promise<RfpRequests>,
    search: (machineExecutionId: string, vendorId: string,) => Promise<RfpRequests>,
};

//RfpRequestsDao
export type RangrRequestsDao = {
    submit: (
        rfp: string,
        machineExecutionId: string,
    ) => Promise<RfpRequestResponse>,
};