import 'reflect-metadata';
import { Container } from 'inversify';

import { TYPES } from '@codestrap/developer-foundations-types';
import { openWeatherService } from '@codestrap/developer-foundations-services-weather';
import {
  getFoundryClient,
  geminiService,
  gpt4oService,
  embeddingsService,
} from '@codestrap/developer-foundations-services-palantir';
import { getRangrClient } from '@codestrap/developer-foundations-services-rangr';
import { makeWorldDao } from '@codestrap/developer-foundations-services-palantir';
import {
  makeUserDao,
  makeContactsDao,
} from '@codestrap/developer-foundations-services-palantir';
import {
  makeMachineDao,
  makeMemoryRecallDao,
  makeTrainingDataDao,
} from '@codestrap/developer-foundations-services-palantir';
import {
  makeCommsDao,
  makeThreadsDao,
} from '@codestrap/developer-foundations-services-palantir';
import {
  makeGSuiteClientV2,
  researchAssistant,
} from '@codestrap/developer-foundations-services-google';
import {
  makeRfpRequestsDao,
  makeRangrRfpRequestsDao,
} from '@codestrap/developer-foundations-services-rangr';
import { makeTicketsDao } from '@codestrap/developer-foundations-services-palantir';
import { makeSlackClient } from '@codestrap/developer-foundations-services-slack';
import { createLoggingService } from '@codestrap/developer-foundations-utils';
import { eiaService } from '@codestrap/developer-foundations-services-eia';

const container = new Container();

// TODO refactor with a service facade, or maybe just a getContainer method to allow for overriding default definitions
// a service facade could hide the implementation details but it would be a lot of work and the resulting types would not look different the inversify
// add direct imports of container would need to be refactored to import getContainer or service facade methods
// API docs https://inversify.io/docs/api/container/#rebind

container
  .bind(TYPES.FoundryClient)
  .toDynamicValue(getFoundryClient)
  .inSingletonScope();

container
  .bind(TYPES.RangrClient)
  .toDynamicValue(getRangrClient)
  .inSingletonScope();

container.bind(TYPES.WorldDao).toConstantValue(makeWorldDao());

container.bind(TYPES.UserDao).toConstantValue(makeUserDao());

container.bind(TYPES.MachineDao).toConstantValue(makeMachineDao());

container.bind(TYPES.TicketDao).toConstantValue(makeTicketsDao());

container.bind(TYPES.CommsDao).toConstantValue(makeCommsDao());

container.bind(TYPES.ThreadsDao).toConstantValue(makeThreadsDao());

container.bind(TYPES.RfpRequestsDao).toConstantValue(makeRfpRequestsDao());

container
  .bind(TYPES.RangrRfpRequestsDao)
  .toConstantValue(makeRangrRfpRequestsDao());

container.bind(TYPES.MemoryRecallDao).toConstantValue(makeMemoryRecallDao());

container.bind(TYPES.ContactsDao).toConstantValue(makeContactsDao());

container.bind(TYPES.TrainingDataDao).toConstantValue(makeTrainingDataDao());

container.bind(TYPES.WeatherService).toConstantValue(openWeatherService);

container.bind(TYPES.EnergyService).toConstantValue(eiaService);

container.bind(TYPES.GeminiService).toConstantValue(geminiService);

container.bind(TYPES.Gpt4oService).toConstantValue(gpt4oService);

container.bind(TYPES.EmbeddingsService).toConstantValue(embeddingsService);

container
  .bind(TYPES.LoggingService)
  // perExecBytes 1 MB max size
  // globalBytes 64 MB max size
  .toConstantValue(createLoggingService(1 * 1024 * 1024, 64 * 1024 * 1024));

container
  .bind(TYPES.ResearchAssistant)
  .toConstantValue(researchAssistant);

// IMPORTANT use container.getAsync when retrieving!
container
  .bind(TYPES.OfficeService)
  .toConstantValue(makeGSuiteClientV2(process.env.OFFICE_SERVICE_ACCOUNT));

container
  .bind(TYPES.MessageService)
  .toConstantValue(
    makeSlackClient(process.env.SLACK_BASE_URL, process.env.SLACK_BOT_TOKEN)
  );

export { container };
