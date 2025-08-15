import {
  FoundryClient,
  MachineExecutions,
} from '@codestrap/developer-foundations-types';

export async function upsertMachineExecution(
  id: string,
  stateMachine: string,
  state: string,
  logs: string,
  client: FoundryClient,
  lockOwner?: string,
  lockUntil?: number
): Promise<MachineExecutions> {
  console.log(`upsertMachineExecution machineId: ${id}`);

  const token = await client.auth.signIn();
  const apiKey = token.access_token;

  const url = `${client.url}/api/v2/ontologies/${client.ontologyRid}/actions/upsert-machine/apply`;

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const body = JSON.stringify({
    parameters: {
      id,
      stateMachine,
      state,
      logs,
      lockOwner,
      lockUntil,
    },
    options: {
      returnEdits: 'ALL',
    },
  });

  const apiResult = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: body,
  });

  const result = (await apiResult.json()) as any;

  if (!result.edits || result.edits.edits.length === 0) {
    throw new Error(`Failed to upsert machine message to the ontology with:
            ${JSON.stringify(result)}
            `);
  }

  console.log(`upsert machine action returned: ${result?.edits?.edits?.[0]}`);

  const machineId = result.edits.edits[0].primaryKey as string;

  const getUrl = `${client.url}/api/v2/ontologies/${client.ontologyRid}/objects/MachineExecutions/${machineId}`;
  const machineFetchResults = await fetch(getUrl, {
    method: 'GET',
    headers: headers,
  });

  const machine = (await machineFetchResults.json()) as MachineExecutions;
  // trimming this out because the logs make these object massive
  //console.log(`the machine execution ontology returned: ${JSON.stringify(machine)}`)

  return machine;
}
