import { curry } from 'ramda';

import {
  comsProgrammer,
  comsAiTrasition,
  comsEvaluate,
  comsFunctionCatalog,
  comsSolver,
  contextAiTrasition,
  contextEvaluate,
  contextFunctionCatalog,
  contextProgrammer,
  contextSolver,
  salesProgrammer,
  salesAiTrasition,
  salesEvaluate,
  salesFunctionCatalog,
  salesSolver,
  googleServiceExpertArchitectProgrammer,
  googleServiceExpertArchitectAiTrasition,
  googleServiceExpertArchitectEvaluate,
  googleServiceExpertArchitectFunctionCatalog,
  googleServiceExpertArchitectSolver,
} from '../reasoning';

// Define the shape of the clients map
export type XReasonEngine = (config: Record<string, any>) => {
  programmer: typeof comsProgrammer;
  aiTransition: typeof comsAiTrasition;
  evaluate: typeof comsEvaluate;
  functionCatalog: typeof comsFunctionCatalog;
  solver: typeof comsSolver;
};

export enum SupportedEngines {
  COMS = 'coms',
  CONTEXT = 'context',
  SALES = 'sales',
  GOOGLE_SERVICE_EXPERT = 'google_service_expert',
  GOOGLE_SERVICE_EXPERT_ARCHITECT = 'google_service_expert_architect',
}

export enum SupportTrainingDataTypes {
  SOLVER = 'solver',
  PROGRAMMER = 'programmer',
}

// in your factor injectionb factory
const factory = curry((map, key, config) => {
  const supportedKeys = Object.keys(SupportedEngines).map((item) =>
    item.toLowerCase()
  );

  if (!supportedKeys.includes(key)) {
    throw new Error('unsupported key ${key}');
  }

  return map[key](config);
});

// in your config
const clients = {
  coms: (config: Record<string, any>) => {
    console.log(`config for comms xreason is: ${config}`);

    return {
      programmer: comsProgrammer,
      aiTransition: comsAiTrasition,
      evaluate: comsEvaluate,
      functionCatalog: comsFunctionCatalog,
      solver: comsSolver,
    };
  },
  context: (config: Record<string, any>) => {
    console.log(`config for context xreason is: ${config}`);

    return {
      programmer: contextProgrammer,
      aiTransition: contextAiTrasition,
      evaluate: contextEvaluate,
      functionCatalog: contextFunctionCatalog,
      solver: contextSolver,
    };
  },
  sales: (config: Record<string, any>) => {
    console.log(`config for sales xreason is: ${config}`);

    return {
      programmer: salesProgrammer,
      aiTransition: salesAiTrasition,
      evaluate: salesEvaluate,
      functionCatalog: salesFunctionCatalog,
      solver: salesSolver,
    };
  },
  google_service_expert_architect: (config: Record<string, any>) => {
    return {
      programmer: googleServiceExpertArchitectProgrammer,
      aiTransition: googleServiceExpertArchitectAiTrasition,
      evaluate: googleServiceExpertArchitectEvaluate,
      functionCatalog: googleServiceExpertArchitectFunctionCatalog,
      solver: googleServiceExpertArchitectSolver,
    };
  },
  // TODO add more implementations
};

export default factory(clients) as (key: SupportedEngines) => XReasonEngine;
