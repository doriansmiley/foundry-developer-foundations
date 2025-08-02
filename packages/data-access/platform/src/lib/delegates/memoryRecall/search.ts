import {
  FoundryClient,
  MemoryRecall,
} from '@codestrap/developer-foundations-types';

// performs a vector search against the MemoryREcall objects using a proxy
// The OSDK does not support vector types yet.
// See https://www.palantir.com/docs/foundry/ontology-sdk/unsupported-types.
export async function searchMemoryRecall(
  input: string,
  kValue: number,
  client: FoundryClient
): Promise<MemoryRecall[]> {
  console.log(`searchMemoryRecall input search query: ${input}}`);

  const token = await client.auth.signIn();
  const apiKey = token.access_token;

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const url = `${client.url}/api/v2/ontologies/${client.ontologyRid}/queries/memoryRecalVectorSearch/execute`;

  const body = JSON.stringify({
    parameters: {
      input,
      kValue,
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
      `An error occurred while calling memory recall search errorInstanceId: ${apiResponse.errorInstanceId} errorCode: ${apiResponse.errorCode}`
    );
  }

  console.log(`the threads ontology returned: ${JSON.stringify(apiResponse)}`);

  return apiResponse.value as MemoryRecall[];
}
