import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "@tracing/types";
import { openWeatherService } from "@tracing/services/weatherService";
import { createFoundryClient } from "@tracing/services/foundryClient";
import { makeWorldDao } from "@tracing/domain/worldDao";
import { makeUserDao } from "@tracing/domain/userDao";

export const container = new Container();

container
    .bind(TYPES.FoundryClient)
    .toDynamicValue(createFoundryClient)
    .inSingletonScope();

container
    .bind(TYPES.WorldDao)
    .toDynamicValue((ctx) =>
        makeWorldDao(ctx.get(TYPES.FoundryClient)),
    );

container
    .bind(TYPES.UserDao)
    .toDynamicValue((ctx) =>
        makeUserDao(ctx.get(TYPES.FoundryClient)),
    );

container
    .bind(TYPES.WeatherService)
    .toConstantValue(openWeatherService);