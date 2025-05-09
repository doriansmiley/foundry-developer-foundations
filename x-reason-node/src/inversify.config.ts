import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "@xreason/types";
import { openWeatherService } from "@xreason/services/weatherService";
import { createFoundryClient } from "@xreason/services/foundryClient";
import { makeWorldDao } from "@xreason/domain/worldDao";
import { makeUserDao } from "@xreason/domain/userDao";

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