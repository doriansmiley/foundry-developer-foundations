import { FoundryClient, Threads } from '@codestrap/developer-foundations-types';

export async function upsertThread(
  messages: string,
  appId: string,
  client: FoundryClient,
  id?: string
): Promise<Threads> {
  console.log(`upsertThread threadId: ${id}`);

  const token = await client.auth.signIn();
  const apiKey = token.access_token;

  const url = `${client.url}/api/v2/ontologies/${client.ontologyRid}/actions/upsert-thread/apply`;

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const body = JSON.stringify({
    parameters: {
      id,
      messages,
      appId,
    },
    options: {
      returnEdits: 'ALL',
    },
  });

  const apiResult = await fetch(url, {
    method: 'POST',
    headers: headers,
    body: body,
  });

  const result = (await apiResult.json()) as any;

  if (!result.edits || result.edits.edits.length === 0) {
    throw new Error('Failed to upsert thread message to the ontology.');
  }

  console.log(`upsert thread action returned: ${result?.edits?.edits?.[0]}`);

  const threadId = result.edits.edits[0].primaryKey as string;

  const getUrl = `${client.url}/api/v2/ontologies/${client.ontologyRid}/objects/Threads/${threadId}`;
  const machineFetchResults = await fetch(getUrl, {
    method: 'GET',
    headers: headers,
  });

  const thread = (await machineFetchResults.json()) as Threads;
  console.log(
    `the thread execution ontology returned: ${JSON.stringify(thread)}`
  );

  return thread;
}
