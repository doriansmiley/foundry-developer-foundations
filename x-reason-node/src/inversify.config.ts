import "reflect-metadata";
import { Container } from "inversify";
import { TYPES } from "@xreason/types";
import { openWeatherService } from "@xreason/services/weatherService";
import { createFoundryClient } from "@xreason/services/foundryClient";
import { makeWorldDao } from "@xreason/domain/worldDao";
import { makeUserDao } from "@xreason/domain/userDao";
import { makeMachineDao } from "@xreason/domain/machineDao";
import { geminiService } from "@xreason/services/geminiService";
import { makeCommsDao } from "@xreason/domain/commsDao";
import { gemeniStockMarketConditions } from "@xreason/services/gemeniStockMarketConditions";

export const container = new Container();

container
    .bind(TYPES.FoundryClient)
    .toDynamicValue(createFoundryClient)
    .inSingletonScope();

container
    .bind(TYPES.WorldDao)
    .toConstantValue(makeWorldDao());

container
    .bind(TYPES.UserDao)
    .toConstantValue(makeUserDao());

container
    .bind(TYPES.MachineDao)
    .toConstantValue(makeMachineDao());

container
    .bind(TYPES.CommsDao)
    .toConstantValue(makeCommsDao());

container
    .bind(TYPES.WeatherService)
    .toConstantValue(openWeatherService);

container
    .bind(TYPES.GeminiService)
    .toConstantValue(geminiService);

container
    .bind(TYPES.GeminiSearchStockMarket)
    .toConstantValue(gemeniStockMarketConditions);