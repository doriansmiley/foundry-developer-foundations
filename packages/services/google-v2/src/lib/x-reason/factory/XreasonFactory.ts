import { curry } from 'ramda';

import {
  googleProgrammer,
  googleAiTrasition,
  googleEvaluate,
  googleFunctionCatalog,
  googleSolver,
  // TODO: Add more context implementations as needed
} from '../context';

// Define the shape of the clients map
export type XReasonEngine = (config: Record<string, any>) => {
  programmer: typeof googleProgrammer;
  aiTransition: typeof googleAiTrasition;
  evaluate: typeof googleEvaluate;
  functionCatalog: typeof googleFunctionCatalog;
  solver: typeof googleSolver;
};

export enum SupportedEngines {
  GOOGLE = 'google',
  // TODO: Add more Google-specific engines as needed
  // GOOGLE_CALENDAR = 'google_calendar',
  // GOOGLE_DOCS = 'google_docs',
  // GOOGLE_DRIVE = 'google_drive',
}

export enum SupportTrainingDataTypes {
  SOLVER = 'solver',
  PROGRAMMER = 'programmer',
}

// Factory pattern implementation
const factory = curry((map, key, config) => {
  const supportedKeys = Object.keys(SupportedEngines).map((item) =>
    item.toLowerCase()
  );

  if (!supportedKeys.includes(key)) {
    throw new Error(`unsupported key ${key}`);
  }

  return map[key](config);
});

// Configuration for different Google service engines
const clients = {
  google: (config: Record<string, any>) => {
    console.log(`config for google xreason is: ${JSON.stringify(config)}`);

    return {
      programmer: googleProgrammer,
      aiTransition: googleAiTrasition,
      evaluate: googleEvaluate,
      functionCatalog: googleFunctionCatalog,
      solver: googleSolver,
    };
  },
  // TODO: Add more Google-specific implementations
};

export default factory(clients) as (key: SupportedEngines) => XReasonEngine;
