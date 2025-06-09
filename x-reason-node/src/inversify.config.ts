import "reflect-metadata";
import { Container } from "inversify";

import { TYPES } from "@xreason/types";
import { openWeatherService } from "@xreason/services/weatherService";
import { createFoundryClient } from "@xreason/services/foundryClient";
import { createRangrClient } from "@xreason/services/rangrClient";
import { makeWorldDao } from "@xreason/domain/worldDao";
import { makeUserDao } from "@xreason/domain/userDao";
import { makeMachineDao } from "@xreason/domain/machineDao";
import { geminiService } from "@xreason/services/geminiService";
import { makeCommsDao } from "@xreason/domain/commsDao";
import { gemeniStockMarketConditions } from "@xreason/services/gemeniStockMarketConditions";
import { makeThreadsDao } from "@xreason/domain/threadsDao";
import { makeRfpRequestsDao } from "@xreason/domain/rfpRequestsDao";
import { makeRangrRfpRequestsDao } from "@xreason/domain/rangrRfpRequestsDao";
import { makeTicketsDao } from "@xreason/domain/ticketsDao";
import { makeGSuiteClient } from "./services/gsuiteClient";

export const container = new Container();

container
    .bind(TYPES.FoundryClient)
    .toDynamicValue(createFoundryClient)
    .inSingletonScope();

container
    .bind(TYPES.RangrClient)
    .toDynamicValue(createRangrClient)
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
    .bind(TYPES.TicketDao)
    .toConstantValue(makeTicketsDao());

container
    .bind(TYPES.CommsDao)
    .toConstantValue(makeCommsDao());

container
    .bind(TYPES.ThreadsDao)
    .toConstantValue(makeThreadsDao());

container
    .bind(TYPES.RfpRequestsDao)
    .toConstantValue(makeRfpRequestsDao());

container
    .bind(TYPES.RangrRfpRequestsDao)
    .toConstantValue(makeRangrRfpRequestsDao());

container
    .bind(TYPES.WeatherService)
    .toConstantValue(openWeatherService);

container
    .bind(TYPES.GeminiService)
    .toConstantValue(geminiService);

container
    .bind(TYPES.GeminiSearchStockMarket)
    .toConstantValue(gemeniStockMarketConditions);

container
    .bind(TYPES.OfficeService)
    .toConstantValue(makeGSuiteClient(process.env.OFFICE_SERVICE_ACCOUNT));