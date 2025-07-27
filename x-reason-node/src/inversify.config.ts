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
import { makeGSuiteClient } from "@xreason/services/gsuiteClient";
import { makeSlackClient } from "@xreason/services/slack";
import { embeddingsService } from "@xreason/services/embeddingsService";
import { makeMemoryRecallDao } from "@xreason/domain/memoryRecallDao";
import { makeContactsDao } from "@xreason/domain/contactsDao";
import { makeTrainingDataDao } from "@xreason/domain/trainingDataDao";
import { gpt4oService } from "@xreason/services/gpt4oService";
import { getLogger } from "./utils";
import { createLoggingService } from "./services/loggingService";
import { eiaService } from "./services/eiaService";

// TODO refactor with a service facade, or maybe just a getContainer method to allow for overriding default definitions
// a service facade could hide the implementation details but it would be a lot of work and the resulting types would not look different the inversify
// add direct imports of container would need to be refactored to import getContainer or service facade methods
// API docs https://inversify.io/docs/api/container/#rebind
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
    .bind(TYPES.MemoryRecallDao)
    .toConstantValue(makeMemoryRecallDao());

container
    .bind(TYPES.ContactsDao)
    .toConstantValue(makeContactsDao());

container
    .bind(TYPES.TrainingDataDao)
    .toConstantValue(makeTrainingDataDao());

container
    .bind(TYPES.WeatherService)
    .toConstantValue(openWeatherService);

container
    .bind(TYPES.EnergyService)
    .toConstantValue(eiaService);

container
    .bind(TYPES.GeminiService)
    .toConstantValue(geminiService);

container
    .bind(TYPES.Gpt4oService)
    .toConstantValue(gpt4oService);

container
    .bind(TYPES.EmbeddingsService)
    .toConstantValue(embeddingsService);

container
    .bind(TYPES.LoggingService)
    // perExecBytes 1 MB max size
    // globalBytes 64 MB max size
    .toConstantValue(createLoggingService(1 * 1024 * 1024, 64 * 1024 * 1024));

container
    .bind(TYPES.GeminiSearchStockMarket)
    .toConstantValue(gemeniStockMarketConditions);

// IMPORTANT use container.getAsync when retrieving!
container
    .bind(TYPES.OfficeService)
    .toConstantValue(makeGSuiteClient(process.env.OFFICE_SERVICE_ACCOUNT));

container
    .bind(TYPES.MessageService)
    .toConstantValue(makeSlackClient(process.env.SLACK_BASE_URL, process.env.SLACK_BOT_TOKEN));