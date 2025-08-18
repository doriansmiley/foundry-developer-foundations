import type {
  Gpt40Parameters,
} from '@codestrap/developer-foundations-types';
import { getFoundryClient } from './foundryClient';

export async function gpt4oService(
  user: string,
  system: string,
  gptParams?: Gpt40Parameters
): Promise<string> {
  const client = getFoundryClient();

  const token = await client.auth.signIn();
  const apiKey = token.access_token;

  const url = `${client.url}/api/v2/ontologies/${client.ontologyRid}/queries/gpt4oProxy/execute`;

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const body = JSON.stringify({
    parameters: {
      user,
      system,
      gptParams,
    },
  });

  const apiResult = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: body,
  });

  const result = (await apiResult.json()) as any;

  return result.value as string;
}
