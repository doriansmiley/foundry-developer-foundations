import { Trace } from '@codestrap/developer-foundations.foundry-tracing-foundation';

import { SupportedEngines } from "@xreason/reasoning/factory";
import { Text2Action } from "@xreason/CommsForge";
import { uuidv4 } from "@xreason/utils";

interface SalesForgeTaskListResponse {
    status: number;
    message: string;
    executionId: string;
    taskList?: string;
    error?: string;
}

export type Role = {
    title: string,
    rate: number,
    rateType: 'hourly' | 'daily' | 'monthly' | 'yearly',
    quantity: number,
}
// used when parsing response from LLM
export type RfpResponse = {
    rawText: string;
    machineExecutionId: string;
    rateCard: Role[],
    cost: number,
    startDate: Date,
    terms: string;
}

interface RfpResponseReceipt {
    status: number;
    message: string;
    machineExecutionId: string;
    error?: string;
    reciept?: {
        id: string,
        timestamp: number,
    };
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
        attributes: { endpoint: '/api/v2/ontologies/ontology-c0c8a326-cd0a-4f69-a575-b0399c04b74d/queries/askBennie/execute' }
    })
    public async askBennie(query: string, userId: string, threadId?: string): Promise<string> {
        // if threadId is defined look it up, else create a new thread in the ontology using fetch
        // create a new threadId in the ontology threads object if one isn't supplied or not found
        // call createSalesTasksFunction with the full thread history
        const { status, taskList, executionId } = await this.createSalesTasksFunction(query, userId, threadId);
        // if we get a bad response skip calling execute task list
        if (status !== 200 || !taskList) {
            return `You are missing required infromation: ${taskList}. Please fix your shit and resend.`
        }
        // execute the task list
        const results = await this.text2ActionInstance.executeTaskList(taskList, true, executionId, undefined, SupportedEngines.SALES)
        // construct the response
        // persist the constructed response to the the threads object
        // return the constructed response
        return results;
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
        operationName: 'createSalesTasksFunction',
        kind: 'Server',
        samplingDecision: 'RECORD_AND_SAMPLE',
        samplingRate: 1.0,
        attributes: { endpoint: '/api/v2/ontologies/ontology-c0c8a326-cd0a-4f69-a575-b0399c04b74d/queries/createSalesTasksTasksFunction/execute' }
    })
    public async createSalesTasksFunction(query: string, userId: string, threadId?: string): Promise<SalesForgeTaskListResponse> {
        console.log('createSalesTasksTasksFunction called')
        // if no threadId create one
        // call the solver to get back the task list. 
        const taskList = await this.text2ActionInstance.createCommunicationsTasks(query, userId, SupportedEngines.SALES)
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
        attributes: { endpoint: '/api/v2/ontologies/ontology-c0c8a326-cd0a-4f69-a575-b0399c04b74d/queries/submitRfpResponse/execute' }
    })
    public async submitRfpResponse(query: string, userId: string, machineExecutionId: string): Promise<RfpResponseReceipt> {
        console.log(`submitRfpResponse received: ${query} from user: ${userId} for machine execution: ${machineExecutionId}`);

        return {
            status: 200,
            message: `We've received your RFP response and are reviewing it with the customer. We'll get back to you shoortly.`,
            machineExecutionId: '123344jkl',
            reciept: {
                id: '',
                timestamp: Date.now(),
            },
        }
    }
}