import {
  FoundryClient,
  Contacts,
} from '@codestrap/developer-foundations-types';

export async function readContact(
  id: string,
  client: FoundryClient
): Promise<Contacts> {
  console.log(`readContact id: ${id}`);

  const apiKey = await client.getToken();

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const url = `${client.url}/api/v2/ontologies/${client.ontologyRid}/objects/Contacts/${id}`;
  const contactFetchResults = await fetch(url, {
    method: 'GET',
    headers: headers,
  });

  const apiResponse = (await contactFetchResults.json()) as any;

  if (apiResponse.errorCode) {
    console.log(
      `errorInstanceId: ${apiResponse.errorCode} errorName: ${apiResponse.errorName} errorCode: ${apiResponse.errorCode}`
    );
    throw new Error(
      `An error occurred while calling read machine errorInstanceId: ${apiResponse.errorInstanceId} errorCode: ${apiResponse.errorCode}`
    );
  }

  console.log(
    `the machine execution ontology returned: ${JSON.stringify(apiResponse)}`
  );

  return apiResponse as Contacts;
}
