import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "@tracing/types";
import { createFoundryClient } from "@tracing/services/foundryClient";
import { makeUserDao } from "@tracing/domain/userDao";
import { makeTelemetryDao } from "./domain/telemetryDao";

export const container = new Container();

container
    .bind(TYPES.FoundryClient)
    .toDynamicValue(createFoundryClient)
    .inSingletonScope();

container
    .bind(TYPES.UserDao)
    .toDynamicValue((ctx) =>
        makeUserDao(ctx.get(TYPES.FoundryClient)),
    );

container
    .bind(TYPES.TelemtryDao)
    .toDynamicValue((ctx) =>
        makeTelemetryDao(ctx.get(TYPES.FoundryClient)),
    );