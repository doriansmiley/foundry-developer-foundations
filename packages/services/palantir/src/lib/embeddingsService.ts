import { getFoundryClient } from "./foundryClient";

export async function embeddingsService(input: string): Promise<[number[]]> {
  const client = getFoundryClient();

  const token = await client.auth.signIn();
  const apiKey = token.access_token;

  const url = `${client.url}/api/v2/ontologies/${client.ontologyRid}/queries/textEmeddingSmall/execute`;

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const body = JSON.stringify({
    parameters: {
      input,
    },
  });

  const apiResult = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: body,
  });

  const result = (await apiResult.json()) as any;

  return result.value as [number[]];
}
