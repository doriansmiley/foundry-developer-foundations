import {
  Contacts,
  FoundryClient,
} from '@codestrap/developer-foundations-types';

export async function searchContacts(
  fullName: string,
  company: string,
  client: FoundryClient,
  pageSize = 10
): Promise<Contacts[]> {
  console.log(`searchContacts fullName: ${fullName} company: ${company}`);

  const token = await client.auth.signIn();
  const apiKey = token.access_token;

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const url = `${client.url}/api/v2/ontologies/${client.ontologyRid}/objects/Contacts/search`;

  const body = JSON.stringify({
    pageSize,
    where: {
      type: 'and',
      value: [
        {
          type: 'containsAnyTerm',
          field: 'fullName',
          value: fullName,
          fuzzy: true,
        },
        {
          type: 'containsAnyTerm',
          field: 'enterpriseName',
          value: company,
          fuzzy: true,
        },
      ],
    },
  });

  const apiResult = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: body,
  });

  const apiResponse = (await apiResult.json()) as any;

  if (apiResponse.errorCode) {
    console.log(
      `errorInstanceId: ${apiResponse.errorCode} errorName: ${apiResponse.errorName} errorCode: ${apiResponse.errorCode}`
    );
    throw new Error(
      `An error occurred while calling search Contacts errorInstanceId: ${apiResponse.errorInstanceId} errorCode: ${apiResponse.errorCode}`
    );
  }

  console.log(`the Contacts ontology returned: ${JSON.stringify(apiResponse)}`);

  return apiResponse.data as Contacts[];
}
