import {
  FoundryClient,
  RfpRequests,
} from '@codestrap/developer-foundations-types';

export async function readRfpRequest(
  id: string,
  client: FoundryClient
): Promise<RfpRequests> {
  console.log(`readRfpRequest id: ${id}`);

  const token = await client.auth.signIn();
  const apiKey = token.access_token;

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const url = `${client.url}/api/v2/ontologies/${client.ontologyRid}/objects/RfpRequests/${id}`;
  const fetchResult = await fetch(url, {
    method: 'GET',
    headers: headers,
  });

  const apiResponse = (await fetchResult.json()) as any;

  if (apiResponse.errorCode) {
    console.log(
      `errorInstanceId: ${apiResponse.errorCode} errorName: ${apiResponse.errorName} errorCode: ${apiResponse.errorCode}`
    );
    throw new Error(
      `An error occurred while calling read RfpRequest errorInstanceId: ${apiResponse.errorInstanceId} errorCode: ${apiResponse.errorCode}`
    );
  }

  console.log(`the threads ontology returned: ${JSON.stringify(apiResponse)}`);

  return apiResponse as RfpRequests;
}
