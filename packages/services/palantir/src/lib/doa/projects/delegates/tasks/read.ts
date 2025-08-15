import { FoundryClient, Tickets } from '@codestrap/developer-foundations-types';

export async function readTicket(
  id: string,
  client: FoundryClient
): Promise<Tickets> {
  console.log(`readTicket id: ${id}`);

  const token = await client.auth.signIn();
  const apiKey = token.access_token;

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const url = `${client.url}/api/v2/ontologies/${client.ontologyRid}/objects/Tickets/${id}`;
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
      `An error occurred while calling read ticket errorInstanceId: ${apiResponse.errorInstanceId} errorCode: ${apiResponse.errorCode}`
    );
  }

  console.log(
    `the ticket execution ontology returned: ${JSON.stringify(apiResponse)}`
  );

  return apiResponse as Tickets;
}
