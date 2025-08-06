import 'reflect-metadata';
import { Container } from 'inversify';
import { TYPES } from './types';
import { createFoundryClient } from './services/foundryClient';
import { makeUserDao } from './domain/userDao';
import { makeTelemetryDao } from './domain/telemetryDao';

export const container = new Container();

container
  .bind(TYPES.FoundryClient)
  .toDynamicValue(createFoundryClient)
  .inSingletonScope();

container
  .bind(TYPES.UserDao)
  .toDynamicValue((ctx) => makeUserDao(ctx.get(TYPES.FoundryClient)));

container
  .bind(TYPES.TelemtryDao)
  .toDynamicValue((ctx) => makeTelemetryDao(ctx.get(TYPES.FoundryClient)));
