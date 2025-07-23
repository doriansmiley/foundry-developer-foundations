import { ComputeModule } from "@palantir/compute-module";
// Schema Definitions for compute module
// IMPORTANT:  @sinclair/typebox is required!!!
// https://github.com/palantir/typescript-compute-module?tab=readme-ov-file#schema-registration
import { Type } from "@sinclair/typebox";
import { Vickie } from "@xreason/Vickie";
import dotenv from 'dotenv';
import { ComputeModuleType, ModuleConfig } from "@xreason/types";
import { Bennie } from "./Bennie";

dotenv.config();

const Schemas = {
  askVickie: {
    input: Type.Object({
      query: Type.String(),
      userId: Type.String(),
      threadId: Type.Optional(Type.String()),
    }),
    output: Type.Object({
      status: Type.Integer(),
      message: Type.String(),
      executionId: Type.String(),
      taskList: Type.Optional(Type.String()),
      error: Type.Optional(Type.String()),
    })
  },
  askBennie: {
    input: Type.Object({
      query: Type.String(),
      userId: Type.String(),
      threadId: Type.Optional(Type.String()),
    }),
    output: Type.Object({
      status: Type.Integer(),
      message: Type.String(),
      executionId: Type.String(),
      taskList: Type.Optional(Type.String()),
      error: Type.Optional(Type.String()),
    })
  },
  createVickieTasks: {
    input: Type.Object({
      query: Type.String(),
      userId: Type.String(),
      threadId: Type.Optional(Type.String()),
    }),
    output: Type.Object({
      status: Type.Integer(),
      message: Type.String(),
      executionId: Type.String(),
      taskList: Type.Optional(Type.String()),
      error: Type.Optional(Type.String()),
    })
  },
  createBennieTasks: {
    input: Type.Object({
      query: Type.String(),
      userId: Type.String(),
      threadId: Type.Optional(Type.String()),
    }),
    output: Type.Object({
      status: Type.Integer(),
      message: Type.String(),
      executionId: Type.String(),
      taskList: Type.Optional(Type.String()),
      error: Type.Optional(Type.String()),
    })
  },
  getNextState: {
    input: Type.Object({
      plan: Type.Optional(Type.String()),
      forward: Type.Optional(Type.Boolean()),
      executionId: Type.Optional(Type.String()),
      inputs: Type.Optional(Type.String()),
      xreason: Type.Optional(Type.String()),
    }),
    output: Type.Object({
      value: Type.String(),
      theResultOfEachTask: Type.Array(Type.Object({
        taskName: Type.String(),
        taskOutput: Type.String(),
      })),
      orderTheTasksWereExecutedIn: Type.Array(Type.String()),
    })
  },
  submitRfpResponse: {
    input: Type.Object({
      rfpResponse: Type.String(),
      vendorId: Type.String(),
      machineExecutionId: Type.String(),
    }),
    output: Type.Object({
      status: Type.Integer(),
      message: Type.String(),
      machineExecutionId: Type.String(),
      error: Type.Optional(Type.String()),
      receipt: Type.Optional(Type.Object({
        id: Type.String(),
        timestamp: Type.Integer(),
      }))
    })
  },
  sendThreadMessage: {
    input: Type.Object({
      message: Type.String(),
      userId: Type.String(),
      machineExecutionId: Type.String(),
    }),
    output: Type.Object({
      appId: Type.Optional(Type.String()),
      id: Type.Readonly(Type.String()),
      messages: Type.Optional(Type.String()),
      userId: Type.Optional(Type.String()),
    })
  },
  processEmailEvent: {
    input: Type.Object({
      payload: Type.String(),
    }),
    output: Type.Object({
      status: Type.Integer(),
      message: Type.String(),
      executionId: Type.String(),
      taskList: Type.Optional(Type.String()),
      error: Type.Optional(Type.String()),
    })
  },
};

// Unified configuration for all environments
function getModuleConfig(): ModuleConfig {
  const env = process.env.NODE_ENV || 'development';

  switch (env) {
    case 'test':
      return { isTest: true };
    default: // development
      return { isTest: false };
  };
}

function createComputeModule(): ComputeModuleType {
  const config = getModuleConfig();

  if (config.isTest) {
    const mockModule = {
      listeners: {} as Record<string, any>,
      on: function (event: string, handler: Function) {
        this.listeners[event] = handler;
        handler();
        return this;
      },
      register: function (operation: string, handler: Function) {
        this.listeners[operation] = { type: 'response', listener: handler };
        return this;
      }
    };
    console.log('returning mock module');
    return mockModule;
  }

  const vickie = new Vickie();
  const bennie = new Bennie();

  // IMPORTANT: wrap all execution in try catch so you do not crash the container!
  // node exists on unhandled exceptions
  const module = new ComputeModule({
    logger: console,
    sources: {},
    definitions: {
      askVickie: Schemas.askVickie,
      askBennie: Schemas.askBennie,
      createVickieTasks: Schemas.createVickieTasks,
      createBennieTasks: Schemas.createBennieTasks,
      getNextState: Schemas.getNextState,
      submitRfpResponse: Schemas.submitRfpResponse,
      sendThreadMessage: Schemas.sendThreadMessage,
      processEmailEvent: Schemas.processEmailEvent,
    },
  })
    .register("processEmailEvent", async ({ payload }) => {
      try {
        const { data, publishTime, subscription } = JSON.parse(payload) as { data: string, publishTime: string, subscription: string };
        const result = await vickie.processEmailEvent(data, publishTime, subscription);
        return result;
      } catch (e) {
        console.log((e as Error).stack);
        return {
          status: 500,
          message: `Error: ${(e as Error).message}`,
          executionId: 'error',
          taskList: 'error',
          error: `Error: ${(e as Error).message}`,
        };
      }
    })
    .register("sendThreadMessage", async ({ message, userId, machineExecutionId }) => {
      try {
        const result = await bennie.sendThreadMessage(message, userId, machineExecutionId);
        return result;
      } catch (e) {
        console.log((e as Error).stack);
        return {
          appId: 'error',
          id: 'error',
          messages: `Error: ${(e as Error).message}`,
          userId: 'error',
        }
      }
    })
    .register("submitRfpResponse", async ({ rfpResponse, vendorId, machineExecutionId }) => {
      try {
        const result = await bennie.submitRfpResponse(rfpResponse, vendorId, machineExecutionId);
        return result;
      } catch (e) {
        console.log((e as Error).stack);
        return {
          status: 500,
          message: (e as Error).message,
          machineExecutionId: 'error',
          error: `Error: ${(e as Error).message}`,
          receipt: {
            id: 'error',
            timestamp: new Date().getTime(),
          }
        };
      }
    })
    .register("getNextState", async ({ plan, forward, executionId, inputs, xreason }) => {
      try {
        const result = await vickie.getNextState(plan, forward, executionId, inputs, xreason);

        if (typeof result.value !== 'string') {
          result.value = JSON.stringify(result.value);
        }

        result.theResultOfEachTask.forEach(item => {
          if (typeof item.taskOutput !== 'string') {
            item.taskOutput = JSON.stringify(item.taskOutput);
          }
        })

        console.log(`getNextState returned: ${JSON.stringify(result, null, 2)}`);

        return {
          value: result.value as string,
          theResultOfEachTask: result.theResultOfEachTask,
          orderTheTasksWereExecutedIn: result.orderTheTasksWereExecutedIn,
        };
      } catch (e) {
        console.log((e as Error).stack);
        return {
          value: `Error: ${(e as Error).message}`,
          theResultOfEachTask: [],
          orderTheTasksWereExecutedIn: [],
        };
      }

    })
    .register("createVickieTasks", async ({ query, userId, threadId }) => {
      try {
        const result = await vickie.createComsTasksList(query, userId, threadId);
        return result;
      } catch (e) {
        console.log((e as Error).stack);
        return {
          status: 500,
          message: `Error: ${(e as Error).message}`,
          executionId: 'error',
          taskList: 'error',
          error: `Error: ${(e as Error).message}`,
        };
      }
    })
    .register("createBennieTasks", async ({ query, userId, threadId }) => {
      try {
        const result = await bennie.createSalesTasksList(query, userId, threadId);
        return result;
      } catch (e) {
        console.log((e as Error).stack);
        return {
          status: 500,
          message: `Error: ${(e as Error).message}`,
          executionId: 'error',
          taskList: 'error',
          error: `Error: ${(e as Error).message}`,
        };
      }
    })
    .register("askVickie", async ({ query, userId, threadId }) => {
      try {
        const result = await vickie.askVickie(query, userId, threadId);
        return result;
      } catch (e) {
        console.log((e as Error).stack);
        return {
          status: 500,
          message: `Error: ${(e as Error).message}`,
          executionId: 'error',
          taskList: 'error',
          error: `Error: ${(e as Error).message}`,
        };
      }
    })
    .register("askBennie", async ({ query, userId, threadId }) => {
      try {
        const result = await bennie.askBennie(query, userId, threadId);
        return result;
      } catch (e) {
        console.log((e as Error).stack);
        return {
          status: 500,
          message: `Error: ${(e as Error).message}`,
          executionId: 'error',
          taskList: 'error',
          error: `Error: ${(e as Error).message}`,
        };
      }
    }).on("responsive", () => console.log("Bennie is ready"));

  module.on("responsive", () => {
    console.log(`${process.env.LOG_PREFIX} Foundry Developer Foundations X-Reason module is now responsive`);
  });

  return module;
}

const computeModule = createComputeModule();

export { computeModule };
