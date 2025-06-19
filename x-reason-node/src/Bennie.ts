import { Trace } from '@codestrap/developer-foundations.foundry-tracing-foundation';

import { SupportedEngines } from "@xreason/reasoning/factory";
import { Text2Action } from "@xreason/Text2Action";
import { extractJsonFromBackticks, uuidv4 } from "@xreason/utils";
import { GeminiService, MachineDao, RfpRequestsDao, Threads, ThreadsDao, TYPES, RfpResponseReceipt, RfpRequestResponse, RfpResponsesResult } from '@xreason/types';
import { container } from "@xreason/inversify.config";
import { StateConfig } from '@xreason/reasoning';

interface SalesForgeTaskListResponse {
    status: number;
    message: string;
    executionId: string;
    taskList?: string;
    error?: string;
}

export class SalesForge {
    private text2ActionInstance: Text2Action;

    constructor() {
        this.text2ActionInstance = new Text2Action();
    }

    @Trace({
        resource: {
            service_name: 'bennie',
            service_instance_id: 'production',
            telemetry_sdk_name: 'xreason-functions',
            telemetry_sdk_version: '7.0.2',
            host_hostname: 'codestrap.usw-3.palantirfoundry.com',
            host_architecture: 'prod',
        },
        operationName: 'askBennie',
        kind: 'Server',
        samplingDecision: 'RECORD_AND_SAMPLE',
        samplingRate: 1.0,
        attributes: { endpoint: `/api/v2/ontologies/${process.env.ONTOLOGY_ID}/queries/askBennie/execute` }
    })
    public async askBennie(query: string, userId: string, threadId?: string): Promise<SalesForgeTaskListResponse> {
        // if threadId is defined look it up, else create a new thread in the ontology using fetch
        // create a new threadId in the ontology threads object if one isn't supplied or not found
        // call createSalesTasksList with the full thread history
        const { status, taskList, executionId } = await this.createSalesTasksList(query, userId, threadId);
        // if we get a bad response skip calling execute task list
        if (status !== 200 || !taskList) {
            return {
                status,
                executionId,
                message: `You are missing required infromation: ${taskList}. Please fix your shit and resend.`,
            };
        }
        // execute the task list
        const results = await this.text2ActionInstance.executeTaskList(taskList, true, executionId, undefined, SupportedEngines.SALES)
        // construct the response
        const system = `You are a helpful AI sales assistant named Bennie tasked with ensuring tasks lists related to sales activities are properly defined with all required identitying information such as vendor names, RFP details, customer contact infromation such as email addresses, slack channel IDs, etc.
You are professional in your tone, personable, and always start your messages with the phrase, "Hi, I'm Bennie, Code's AI Sales Associate" or similar. 
You can get creative on your greeting, taking into account the dat of the week. Today is ${new Date().toLocaleDateString('en-US', { weekday: 'long' })}. 
You can also take into account the time of year such as American holidays like Halloween, Thanksgiving, Christmas, etc. 
You always obey the users instructions and understand the people you work for are busy executives and sometimes need help in their personal lives
These tasks are not beneith you. At CodeStrap, where you work we adopt the motto made famous by Kim Scott: we move couches.
It means we all pull together to get things done.
The current local date/time is ${new Date().toLocaleString("en-US", { timeZone: "America/Los_Angeles" })}.
The current day/time in your timezone is: ${new Date().toString()}`;
        const user = `
        Based on the following user query
        ${query}

        And the results of the execution of their request
        ${results}

        Summarize the results.
        `;

        const geminiService = container.get<GeminiService>(TYPES.GeminiService);

        const response = await geminiService(user, system);

        let result = extractJsonFromBackticks(response);
        result = `# Technical details
ExecutionID: ${executionId}

# Summary
${result}`;

        // persist the constructed response to the the threads object
        const threadsDao = container.get<ThreadsDao>(TYPES.ThreadsDao);

        const messages = `# User Query:
${query}

${result}`;

        await threadsDao.upsert(messages, 'bennie', executionId)

        // return the structured response
        return {
            status: 200,
            executionId,
            message: result,
        };
    }

    @Trace({
        resource: {
            service_name: 'bennie',
            service_instance_id: 'production',
            telemetry_sdk_name: 'xreason-functions',
            telemetry_sdk_version: '7.0.2',
            host_hostname: 'codestrap.usw-3.palantirfoundry.com',
            host_architecture: 'prod',
        },
        operationName: 'createSalesTasksList',
        kind: 'Server',
        samplingDecision: 'RECORD_AND_SAMPLE',
        samplingRate: 1.0,
        attributes: { endpoint: `/api/v2/ontologies/${process.env.ONTOLOGY_ID}/queries/createSalesTasksList/execute` }
    })
    public async createSalesTasksList(query: string, userId: string, threadId?: string): Promise<SalesForgeTaskListResponse> {
        console.log('createSalesTasksList called')
        // if no threadId create one
        // call the solver to get back the task list. 
        const taskList = await this.text2ActionInstance.createTaskList(query, userId, SupportedEngines.SALES)
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

    /**
     * A dedicated webhook callback for RFP submissions
     * Extract parameters from query param using an LLM. 
     * The client is expected to send the machine exection ID (which is the same as the orignal threadID) back in it's responses. 
     * We will have passed this ID to exteranl agents as part of createSalesTasks invocation above
     * If no machine exection ID is found throw ERROR
     * Use an LLM to extract the required parameters for an RFP from the provided query param such as:
        * Volume of staffing (we use Tech Leads, Engineers, and Engagement Directors)
        * Rate Card / how much it’s going to cost. Monthly for long term, one time for short term where short term is < 2 months
        * Available Start Date
     * if any required parameters are missing return a a textual response stating what is missing along with a machine execution ID
     * Once all required parameters are retireved execute the request
     */
    @Trace({
        resource: {
            service_name: 'bennie',
            service_instance_id: 'production',
            telemetry_sdk_name: 'xreason-functions',
            telemetry_sdk_version: '7.0.2',
            host_hostname: 'codestrap.usw-3.palantirfoundry.com',
            host_architecture: 'prod',
        },
        operationName: 'submitRfpResponse',
        kind: 'Server',
        samplingDecision: 'RECORD_AND_SAMPLE',
        samplingRate: 1.0,
        attributes: { endpoint: `/api/v2/ontologies/${process.env.ONTOLOGY_ID}/queries/submitRfpResponse/execute` }
    })
    public async submitRfpResponse(rfpResponse: string, vendorId: string, machineExecutionId: string): Promise<RfpResponseReceipt> {
        // rehydrate the machine
        const machineDao = container.get<MachineDao>(TYPES.MachineDao);
        const execution = await machineDao.read(machineExecutionId);

        const machine: StateConfig[] =
            execution && execution.machine ? JSON.parse(execution.machine) : undefined;

        const stateDefinition =
            execution && execution.state ? JSON.parse(execution.state) : undefined;

        if (!stateDefinition) {
            throw new Error(`no machine execution found for: ${machineExecutionId}`);
        }

        const context = stateDefinition.context;
        // find the requestRftp on the context associated with the supplied vendorId (requestRftp.vendorId)
        const vendorRfpRequest = Object.keys(context)
            .filter(key => key.indexOf('requestRfp') >= 0)
            .map(key => context[key])
            .filter(item => item.vendorId === vendorId)?.[0] as RfpRequestResponse | undefined;
        // add the response to the requestRftp object.
        if (!vendorRfpRequest) {
            throw new Error(`Could not find matching RFP request for vendorId: ${vendorId}`);
        }
        // determine if this is a response or a request for missing information or something else
        const system = 'You are a helpful AI classifier that classifies incoming RFP responses per the user instructions. You only response in JSON in the format defined by the user.';
        const user = `
        Classify the RFP response below into one of thre categories: "valid response", "request for missing information", "error"
        ${rfpResponse}

        You can only response in JSON in the following format:
        {"responseCategory": <YOUR_ANSWER>}

        For example if the rfp response is: "We can not process your request without a valid start and end date"
        Your response is:
        {"responseCategory": "request for missing information"}

        Do not be chatty, do not self reflect, just fucking respond in JSON with the correct classification!!!
        `;

        const geminiService = container.get<GeminiService>(TYPES.GeminiService);

        const response = await geminiService(user, system);
        const result = extractJsonFromBackticks(response);
        const category = JSON.parse(result).responseCategory as 'valid response' | 'request for missing information' | 'error' | undefined;
        if (!category) {
            throw new Error(`Could not classify RFP response: ${category}`);
        }

        // handle the vendor response
        vendorRfpRequest.received = true;
        vendorRfpRequest.response = rfpResponse;

        switch (category) {
            case 'valid response':
                // if it's a respone mark the rfp state as received and recalculate all responses received
                vendorRfpRequest.status = 200;
                break;
            case 'request for missing information':
                vendorRfpRequest.status = 400;
                break;
            case 'error':
                vendorRfpRequest.status = 500;
                break;
        }
        // figure out if all responses from the vendors have been received
        const allResponsesReceived = Object.keys(context)
            .filter(key => key.indexOf('requestRfp') >= 0)
            .map(key => context[key])
            .every(item => item.received);

        // find the associated await rfp response state, there should be only one becuase request for rfp is done in parrallel
        const awaitRfpResponseState = Object.keys(context)
            .filter(key => key.indexOf('awaitRfpResponses') >= 0)
            .map(key => context[key])?.[0] as RfpResponsesResult | undefined;

        if (!awaitRfpResponseState) {
            throw new Error('Could not locate awaitRfpResponseState state');
        }

        awaitRfpResponseState.allResponsesReceived = allResponsesReceived;
        awaitRfpResponseState.vendors.push(vendorId);

        // reset the history as it seems x-state will hydrate the state from the history context
        if (stateDefinition.history) {
            stateDefinition.history.context = stateDefinition.context;
        }

        execution.state = JSON.stringify(stateDefinition);
        // update the machine
        await machineDao.upsert(
            machineExecutionId,
            JSON.stringify(machine),
            JSON.stringify(stateDefinition),
            execution.logs!,
        );

        const threadDao = container.get<ThreadsDao>(TYPES.ThreadsDao);
        let thread: Threads | undefined = undefined;

        try {
            thread = await threadDao.read(machineExecutionId);
        } catch (e) {
            console.log(e);
            console.log(`thread not found for id: ${machineExecutionId}, creating a new one`);
        }

        const threadMessage = `# Vendor Response
### Identifiers
- Date and time: ${new Date().toString()}
- Machine and ThreadId: ${machineExecutionId}

### Summary
Your RFP for ${vendorRfpRequest.vendorName} using ID: ${vendorRfpRequest.vendorId} was sent and we received the following response from their agent:
${vendorRfpRequest.response}
`;
        const appendedMessage = `${thread?.messages}
${threadMessage};
`
        await threadDao.upsert(appendedMessage, 'bennie', machineExecutionId);
        // We pass machine execution because of this issue:
        // https://community.palantir.com/t/is-there-an-eventually-consistency-problem-in-the-ontology-when-executing-fetch-vs-edits/4015/2
        await this.text2ActionInstance.upsertState(undefined, true, machineExecutionId, undefined, SupportedEngines.SALES);

        const rfpDao = container.get<RfpRequestsDao>(TYPES.RfpRequestsDao);
        // find the associated RFP
        const rfpRequest = await rfpDao.search(machineExecutionId, vendorId);
        // there should be only one matching record
        await rfpDao.upsert(rfpRequest.rfp!, rfpResponse, vendorId, machineExecutionId, rfpRequest.id);

        return {
            status: 200,
            message: `We've received your RFP response and are reviewing it with the customer. We'll get back to you shortly.`,
            machineExecutionId,
            reciept: {
                id: '',
                timestamp: Date.now(),
            },
        }
    }
}