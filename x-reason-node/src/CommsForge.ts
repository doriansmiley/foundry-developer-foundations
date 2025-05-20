import { Trace } from '@codestrap/developer-foundations.foundry-tracing-foundation';

import { Context, engineV1 as engine, getMachineExecution, getState, SupportedEngines, xReasonFactory } from "@xreason/reasoning";
import { dateTime, recall } from "@xreason/functions";
import { uuidv4 } from "@xreason/utils";
import { CommsDao, MachineExecutions, TYPES, UserDao } from "@xreason/types";
import { container } from "@xreason/inversify.config";

// use classes to take advantage of trace decorator
export class Text2Action {
    @Trace({
        resource: {
            service_name: 'vickie',
            service_instance_id: 'production',
            telemetry_sdk_name: 'xreason-functions',
            telemetry_sdk_version: '7.0.2',
            host_hostname: 'codestrap.usw-3.palantirfoundry.com',
            host_architecture: 'prod',
        },
        operationName: 'createCommunicationsTasks',
        kind: 'Server',
        samplingDecision: 'RECORD_AND_SAMPLE',
        samplingRate: 1.0,
        attributes: { endpoint: '/api/v2/ontologies/ontology-c0c8a326-cd0a-4f69-a575-b0399c04b74d/queries/createCommunicationsTasks/execute' }
    })
    public async createCommunicationsTasks(query: string, userId?: string, xReasonEngine: string = SupportedEngines.COMS): Promise<string> {
        const { solver } = xReasonFactory(xReasonEngine as SupportedEngines)({});
        const userProfile = await container.get<UserDao>(TYPES.UserDao)();

        if (!userId) {
            userId = userProfile.id
        }

        const currentDateTime = await dateTime({
            requestId: '1234',
            status: 0,
            stack: ['userProfile'],
            userProfile,
        });

        const recalledInformation = await recall({
            requestId: '1234',
            status: 0,
            stack: ['userProfile'],
            userProfile,
        }, undefined, query);

        // TODO: remove the bard coded context information once CodeStrap employeed slack channels are added to the contacts dataset
        const groudingContext = `
Below is the orgnizationl information you will need to perform your work:
# Context
${JSON.stringify(recalledInformation)}

# Current date/Time:
${JSON.stringify(currentDateTime)}

# Team Information:
Connor Deeks <connor.deeks@codestrap.me> - Connor Deeks in the CEO and board memeber in charge of platform leads, business strategy, and investor relations.
Dorian Smiley <dsmiley@codestrap.me> - Dorian is the CTO who manages the software engineers and is responsible for technology strategy, execution, and the lead applied AI engineer.

#Slack Channels
"C082XAZ9A1E": "Foundry Devs - used by software engineers working on Palantir Foundry related tasks such as data integration, transformations, and applications",
"C082M750AQ1": "Founding - used for items related to the company founding such as legal briefs, filings, banking etc",
"C08264VFXNZ": "Comms Engineering - used by the software engineers responsible for engineering related items around slack, gmail, teams, etc",
"C0828G7BXM0": "General - General",
"C0821UEPJKG": "Platform Leads - used by our partners responsible for sales motions and client engagements",
"C0825R4EHMK": "Public relations - used for all items related to PR and marketing"
"C08LX9DDMRB": "External Partner Datalinks - used for all communications with DataLinks and us (CodeStrap). DataLinks provides data products and data negineering services. Team members at DataLinks are Andrzej Grzesik - CTO, Francisco Ferrera - CEO, Rui Valente - developer, and Timur - developer"
"C08LMJDQ25C": "Etneral partner 11 Labs" - used for all communications with 11 Labs. 11 Labs makes generative voice models and is used by our customers for call center operations and voice enabled applications. 11 Labs team members are Alox Holt Lead Developer, Jack Piunti Enterprise Sales, and Kabir Gill Enterprise Sales"
`;

        const taskList = await engine.solver.solve(`${query}\n\n${groudingContext}`, solver);
        const comsDao = container.get<CommsDao>(TYPES.CommsDao);
        const communication = await comsDao.upsert(
            'User Defined',
            'None, these tasks were entered by a human',
            'Accept',
            taskList,
            xReasonEngine,
            userId,
        );

        return JSON.stringify(communication);

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
        operationName: 'vickie',
        kind: 'Server',
        samplingDecision: 'RECORD_AND_SAMPLE',
        samplingRate: 1.0,
        attributes: { endpoint: '/api/v2/ontologies/ontology-c0c8a326-cd0a-4f69-a575-b0399c04b74d/queries/vickie/execute' }
    })
    public async vickie(query: string, userId?: string): Promise<string> {
        const taskList = await this.createCommunicationsTasks(query, userId);

        if (taskList) {
            const machine = await this.upsertState(taskList);

            if (machine?.state) {
                const context = JSON.parse(machine.state).context as Context
                const results = Object.keys(context)
                    .filter(key => key.indexOf('|') >= 0)
                    .map(key => {
                        const taskName = key.split('|')[0];
                        const taskOutput = context[key];

                        return { taskName, taskOutput };
                    });

                const stack = context.stack?.map(state => state.split('|')[0]);

                return JSON.stringify({ orderTheTasksWereExecutedIn: stack, theResulsOfEachTask: results }, null, 2);
            }
        }

        return 'I\'m sorry but I failed to get a response back. Can you try again? Soemtimes my AI brain gets a little flakey. But second time is usally the charm.'

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
        operationName: 'executeTaskList',
        kind: 'Server',
        samplingDecision: 'RECORD_AND_SAMPLE',
        samplingRate: 1.0,
        attributes: { endpoint: '/api/v2/ontologies/ontology-c0c8a326-cd0a-4f69-a575-b0399c04b74d/queries/executeTaskList/execute' }
    })
    public async executeTaskList(plan: string,
        forward: boolean = true,
        executionId?: string,
        inputs: string = '{}',
        xreason: string = SupportedEngines.COMS): Promise<string> {
        const machine = await this.upsertState(plan, forward, executionId, inputs, xreason);

        if (machine?.state) {
            const context = JSON.parse(machine.state).context as Context
            const results = Object.keys(context)
                .filter(key => key.indexOf('|') >= 0)
                .map(key => {
                    const taskName = key.split('|')[0];
                    const taskOutput = context[key];

                    return { taskName, taskOutput };
                });

            const stack = context.stack?.map(state => state.split('|')[0]);

            return JSON.stringify({ orderTheTasksWereExecutedIn: stack, theResulsOfEachTask: results }, null, 2);
        }

        return 'I\'m sorry but I failed to get a response back. Can you try again? Soemtimes my AI brain gets a little flakey. But second time is usally the charm.'

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
        operationName: 'upsertState',
        kind: 'Server',
        samplingDecision: 'RECORD_AND_SAMPLE',
        samplingRate: 1.0,
        attributes: { endpoint: '/api/v2/ontologies/ontology-c0c8a326-cd0a-4f69-a575-b0399c04b74d/queries/upsertState/execute' }
    })
    public async upsertState(
        plan?: string,
        forward: boolean = true,
        executionId?: string,
        inputs: string = '{}',
        xreason: string = SupportedEngines.COMS): Promise<MachineExecutions> {

        const solution = {
            input: '', //not relevant for this
            id: executionId || Uuid.random(),
            plan: plan || '',
        };

        const result = await getState(solution, forward, JSON.parse(inputs), xreason as SupportedEngines);
        const apiKey = FoundryApis.getSecret('additionalSecretOsdkToken');

        const baseUrl = FoundryApis.getHttpsConnection().url;
        const headers = {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${apiKey}`
        };

        const body = JSON.stringify({
            parameters: {
                id: solution.id,
                stateMachine: JSON.stringify(result.stateMachine),
                state: result.jsonState,
                logs: result.logs || '',
            },
            options: {
                returnEdits: "ALL"
            }
        });

        const apiResults = await fetch(`${baseUrl}/api/v2/ontologies/ontology-c0c8a326-cd0a-4f69-a575-b0399c04b74d/actions/upsert-machine/apply`, {
            method: 'POST',
            headers,
            body,
        });

        const apiResponse = await apiResults.json();

        if (apiResponse.errorCode) {
            console.log(`errorInstanceId: ${apiResponse.errorCode} errorName: ${apiResponse.errorName} errorCode: ${apiResponse.errorCode}`);
            throw new Error(`An error occured while calling update machine errorInstanceId: ${apiResponse.errorInstanceId} errorCode: ${apiResponse.errorCode}`);
        }

        console.log(JSON.stringify(apiResponse));

        // because we are calling the API here and running a query by ID we are 100% certain we can now read the data after write
        const machine = getMachineExecution(solution);

        return machine!;
    }
}