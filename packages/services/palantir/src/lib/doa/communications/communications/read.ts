import {
  FoundryClient,
  Communications,
} from '@codestrap/developer-foundations-types';

export async function readCommunications(
  id: string,
  client: FoundryClient
): Promise<Communications> {
  console.log(`readMachineExecution id: ${id}`);

  const apiKey = await client.getToken();

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const url = `${client.url}/api/v2/ontologies/${client.ontologyRid}/objects/Communications/${id}`;
  const fetchResults = await fetch(url, {
    method: 'GET',
    headers: headers,
  });

  const apiResponse = (await fetchResults.json()) as any;

  if (apiResponse.errorCode) {
    console.log(
      `errorInstanceId: ${apiResponse.errorCode} errorName: ${apiResponse.errorName} errorCode: ${apiResponse.errorCode}`
    );
    throw new Error(
      `An error occurred while calling read communication errorInstanceId: ${apiResponse.errorInstanceId} errorCode: ${apiResponse.errorCode}`
    );
  }

  console.log(
    `the machine execution ontology returned: ${JSON.stringify(apiResponse)}`
  );

  return apiResponse as Communications;
}
