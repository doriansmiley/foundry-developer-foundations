import { Trace } from '@codestrap/developer-foundations.foundry-tracing-foundation';

import { SupportedEngines } from "@xreason/reasoning/factory";
import { Text2Action } from "@xreason/Text2Action";
import { extractJsonFromBackticks, uuidv4 } from "@xreason/utils";
import { GeminiService, MachineDao, RfpRequestsDao, Threads, ThreadsDao, TYPES, RfpResponseReceipt, RfpRequestResponse, RfpResponsesResult } from '@xreason/types';
import { container } from "@xreason/inversify.config";
import { StateConfig } from '@xreason/reasoning';


interface VickieResponse {
    status: number;
    message: string;
    executionId: string;
    taskList?: string;
    error?: string;
}

// use classes to take advantage of trace decorator
export class Vickie extends Text2Action {
    @Trace({
        resource: {
            service_name: 'vickie',
            service_instance_id: 'production',
            telemetry_sdk_name: 'xreason-functions',
            telemetry_sdk_version: '7.0.2',
            host_hostname: 'codestrap.usw-3.palantirfoundry.com',
            host_architecture: 'prod',
        },
        operationName: 'vickie',
        kind: 'Server',
        samplingDecision: 'RECORD_AND_SAMPLE',
        samplingRate: 1.0,
        attributes: { endpoint: `/api/v2/ontologies/${process.env.ONTOLOGY_ID}/queries/vickie/execute` }
    })
    public async askVickie(query: string, userId: string, threadId?: string): Promise<VickieResponse> {
        let generatedTaskList: undefined | string = undefined;
        let newThread = false;

        // we only want to trigger task list generation if this is a new thread
        if (!threadId) {
            newThread = true;
            // create a new solution with our solver
            const { status, taskList, executionId } = await this.createComsTasksList(query, userId, threadId);
            // if we get a bad response skip calling execute task list
            if (status !== 200 || !taskList) {
                return {
                    status,
                    executionId,
                    message: `You are missing required information: ${taskList}. Please fix your shit and resend.`,
                };
            }
            // threadId and executionId are identical. 
            // If threadId is defined there must be an associated state machine execution where executionId === threadId
            // if its not defined we need to create a new task list and generate a new machine execution which will happen automatically
            // when this.getNextState is called.
            // The orchestrator will program a new solution if there's no machine matching the executionId
            threadId = executionId;
            generatedTaskList = taskList;
        }

        // if task list is defined and there's no machine where machineExecutionId === threadId, a new solution will be generated
        // else the exiting machine will be rehydrated and the next state sent back
        // TODO we need to append the user query as input to getNextState so its interpolated onto the context
        // ideally what would happen is we check if the user query is relevant to an existing state then update it
        // then when the orchestrator rehydrates the machine is can reason about what state to retry based on the new information
        // this replaces the need for the text2ActionInstance.sendThreadMessage handler which was a hack to void doing this
        // you'll likely need to provide training data for transition for each engine to the model can learn what to do
        // Once done you'll need to copy this pattern to Vickie's askVickie method
        const results = await this.getNextState(generatedTaskList, true, threadId, undefined, SupportedEngines.COMS)
        // construct the response
        const system = `You are a helpful AI executive assistant named Vickie.
        You are professional in your tone, personable, and always start your messages with the phrase, "Hi, I'm Vickie, Code's AI Executive Assistant" or similar.
        You can get creative on your greeting, taking into account the dat of the week. Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}. 
        You can also take into account the time of year such as American holidays like Halloween, Thanksgiving, Christmas, etc. 
        You always obey the users instructions and understand the people you work for are busy executives and sometimes need help in their personal lives
        These tasks are not beneath you. At CodeStrap, where you work we adopt the motto made famous by Kim Scott: we move couches.
        It means we all pull together to get things done.
        The current local date/time is ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}.
        The current day/time in your timezone is: ${new Date().toString()}`;
        const user = `
                Based on the following user query
                ${query}
        
                And the results of the state machine execution that was generated to service their request
                The value attribute contains the current state
                The theResultOfEachTask attribute contains the output of state executions
                The orderTheTasksWereExecutedIn lets you know what order the states were executed in. States can be executed multiple times if they are retied.
                ${JSON.stringify(results)}
        
                Generate a response to the user query based on the results of the state machine execution 
                Be sure to structure your response so that it's readable by a human.
                For example if the state machine execution includes facts and figures use a table to format them
                Use lists to structure information hierarchies suck as task list execution and there results
                `;

        const geminiService = container.get<GeminiService>(TYPES.GeminiService);

        const response = await geminiService(user, system);

        let result = extractJsonFromBackticks(response);
        if (newThread) {
            // putting Execution Id in the thread is useful for debugging as users may need to supply it
            result = `# Execution Id: ${threadId}
        ### Response from Vickie
        ${result}
        `;
        } else {
            result = `### Response from Vickie
        ${result}`;
        }

        // persist the constructed response to the the threads object
        const threadsDao = container.get<ThreadsDao>(TYPES.ThreadsDao);

        const messages = `### User Query:
        ${query}
        
        ${result}`;
        // create or update with a summary of the results
        // if there is an existing thread messages are appended to the existing history
        await threadsDao.upsert(messages, 'bennie', threadId)

        // return the structured response
        return {
            status: 200,
            executionId: threadId,
            // Send back the incremental response to avoid sending huge threads back
            // Can also support streaming outputs in the future
            message: result,
        };
    }

    @Trace({
        resource: {
            service_name: 'vickie',
            service_instance_id: 'production',
            telemetry_sdk_name: 'xreason-functions',
            telemetry_sdk_version: '7.0.2',
            host_hostname: 'codestrap.usw-3.palantirfoundry.com',
            host_architecture: 'prod',
        },
        operationName: 'createComsTasksList',
        kind: 'Server',
        samplingDecision: 'RECORD_AND_SAMPLE',
        samplingRate: 1.0,
        attributes: { endpoint: `/api/v2/ontologies/${process.env.ONTOLOGY_ID}/queries/createComsTasksList/execute` }
    })
    public async createComsTasksList(query: string, userId: string, threadId?: string): Promise<VickieResponse> {
        console.log('createComsTasksList called')
        // if no threadId create one
        // call the solver to get back the task list. 
        const taskList = await this.createTaskList(query, userId, SupportedEngines.COMS)
        // If incomplete information is provided the solver will return Missing Infromation
        // If the request is unsupported the solver will return Usupported Questions
        // If it's a complete supported query the solver will return a well formatted task list that we can use to execute
        return {
            status: 200,
            message: 'Task list created',
            // we match the threadID and threadId and executionId so we can associate conversations between agents and machine executions
            executionId: threadId || uuidv4(),
            taskList,
        };
    }
}