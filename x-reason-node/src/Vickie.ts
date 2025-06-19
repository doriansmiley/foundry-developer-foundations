import { Trace } from '@codestrap/developer-foundations.foundry-tracing-foundation';

import { Context, engineV1 as engine, getState, SupportedEngines, xReasonFactory } from "@xreason/reasoning";
import { dateTime, recall } from "@xreason/functions";
import { uuidv4 } from "@xreason/utils";
import { CommsDao, MachineDao, MachineExecutions, TYPES, UserDao } from "@xreason/types";
import { container } from "@xreason/inversify.config";
import { Text2Action } from './Text2Action';

// use classes to take advantage of trace decorator
export class CommsForge {
    private text2ActionInstance: Text2Action;

    constructor() {
        this.text2ActionInstance = new Text2Action();
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
        attributes: { endpoint: `/api/v2/ontologies/${process.env.ONTOLOGY_ID}/queries/vickie/execute` }
    })
    public async askVickie(query: string, userId?: string): Promise<string> {
        const taskList = await this.text2ActionInstance.createTaskList(query, userId);

        if (taskList) {
            const machine = await this.text2ActionInstance.upsertState(taskList);

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
}