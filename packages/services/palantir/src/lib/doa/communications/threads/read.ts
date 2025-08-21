import { FoundryClient, Threads } from '@codestrap/developer-foundations-types';

export async function readThread(
  id: string,
  client: FoundryClient
): Promise<Threads> {
  console.log(`readThread id: ${id}`);

  const apiKey = await client.getToken();

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const url = `${client.url}/api/v2/ontologies/${client.ontologyRid}/objects/Threads/${id}`;
  const threadFetchResults = await fetch(url, {
    method: 'GET',
    headers: headers,
  });

  const apiResponse = (await threadFetchResults.json()) as any;

  if (apiResponse.errorCode) {
    console.log(
      `errorInstanceId: ${apiResponse.errorCode} errorName: ${apiResponse.errorName} errorCode: ${apiResponse.errorCode}`
    );
    throw new Error(
      `An error occurred while calling read thread errorInstanceId: ${apiResponse.errorInstanceId} errorCode: ${apiResponse.errorCode}`
    );
  }

  console.log(`the threads ontology returned: ${JSON.stringify(apiResponse)}`);

  return apiResponse as Threads;
}
