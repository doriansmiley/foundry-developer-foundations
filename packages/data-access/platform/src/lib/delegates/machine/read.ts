import {
  FoundryClient,
  MachineExecutions,
} from '@codestrap/developer-foundations-types';

export async function readMachineExecution(
  id: string,
  client: FoundryClient
): Promise<MachineExecutions> {
  console.log(`readMachineExecution id: ${id}`);

  const token = await client.auth.signIn();
  const apiKey = token.access_token;

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const url = `${client.url}/api/v2/ontologies/${client.ontologyRid}/objects/MachineExecutions/${id}`;
  const machineFetchResults = await fetch(url, {
    method: 'GET',
    headers: headers,
  });

  const apiResponse = (await machineFetchResults.json()) as any;

  if (apiResponse.errorCode) {
    console.log(
      `errorInstanceId: ${apiResponse.errorCode} errorName: ${apiResponse.errorName} errorCode: ${apiResponse.errorCode}`
    );
    throw new Error(
      `An error occurred while calling read machine errorInstanceId: ${apiResponse.errorInstanceId} errorCode: ${apiResponse.errorCode}`
    );
  }

  // trimming this out because the logs make these object massive
  // console.log(`the machine execution ontology returned: ${JSON.stringify(apiResponse)}`)

  return apiResponse as MachineExecutions;
}
