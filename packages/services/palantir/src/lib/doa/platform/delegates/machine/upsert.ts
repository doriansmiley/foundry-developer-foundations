import {
  FoundryClient,
  MachineExecutions,
} from '@codestrap/developer-foundations-types';

export async function upsertMachineExecution(
  id: string,
  stateMachine: string,
  state: string,
  logs: string,
  token: string,
  ontologyRid: string,
  url: string,
  lockOwner?: string,
  lockUntil?: number
): Promise<MachineExecutions> {
  console.log(`upsertMachineExecution machineId: ${id}`);

  const apiKey = token;

  const fullUrl = `${url}/api/v2/ontologies/${ontologyRid}/actions/upsert-machine/apply`;

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

  const apiResult = await fetch(fullUrl, {
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

  const getUrl = `${url}/api/v2/ontologies/${ontologyRid}/objects/MachineExecutions/${machineId}`;
  const machineFetchResults = await fetch(getUrl, {
    method: 'GET',
    headers: headers,
  });

  const machine = (await machineFetchResults.json()) as MachineExecutions;
  // trimming this out because the logs make these object massive
  //console.log(`the machine execution ontology returned: ${JSON.stringify(machine)}`)

  return machine;
}
