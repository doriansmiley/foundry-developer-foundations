import { ComputeModule } from '@palantir/compute-module';
import type { Client } from "@osdk/client";

export const TYPES = {
    FoundryClient: Symbol.for("FoundryClient"),
    WeatherService: Symbol.for("WeatherService"),
    UserDao: Symbol.for("UserDao"),
    TelemtryDao: Symbol.for("TelemtryDao"),
};

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

export interface User {
    id: string;
    username: string;
    givenName?: string;
    familyName?: string;
    email?: string;
    organization?: string;
    attributes: Record<string, any>;
}

export type TelemtryDao = (inputJSON: string) => Promise<string>;
export type UserDao = () => Promise<User>;