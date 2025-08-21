import {
  SupportedFoundryClients,
  type GeminiParameters,
} from '@codestrap/developer-foundations-types';
import { foundryClientFactory } from "./factory/foundryClientFactory";

export async function geminiService(
  user: string,
  system: string,
  params?: GeminiParameters
): Promise<string> {
  const client = foundryClientFactory(process.env.FOUNDRY_CLIENT_TYPE || SupportedFoundryClients.PRIVATE, undefined);

  const apiKey = await client.getToken();

  const url = `${client.url}/api/v2/ontologies/${client.ontologyRid}/queries/gemniFlash20Proxy/execute`;

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const body = JSON.stringify({
    parameters: {
      user,
      system,
      params,
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
