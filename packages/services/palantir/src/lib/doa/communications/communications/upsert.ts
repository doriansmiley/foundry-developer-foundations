import {
  Communications,
  FoundryClient,
} from '@codestrap/developer-foundations-types';
import { uuidv4 } from '@codestrap/developer-foundations-utils';

export async function upsertCommunications(
  channel: string,
  formattedMessage: string,
  status: string,
  taskList: string,
  comType: string,
  owner: string,
  client: FoundryClient,
  questionPrompt?: string,
  tokens?: number,
  id: string = uuidv4()
): Promise<Communications> {
  if (id.length === 0) {
    id = uuidv4();
  }

  console.log(`upsertCommunications id: ${id}`);

  const apiKey = await client.getToken();

  const url = `${client.url}/api/v2/ontologies/${client.ontologyRid}/actions/upsert-communication/apply`;

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const body = JSON.stringify({
    parameters: {
      channel,
      formattedMessage,
      status,
      taskList,
      comType,
      owner,
      questionPrompt,
      tokens,
      id,
    },
    options: {
      returnEdits: 'ALL',
    },
  });

  const apiResult = await fetch(url, {
    method: 'POST',
    headers,
    body,
  });

  const result = (await apiResult.json()) as any;

  if (!result.edits || result.edits.edits.length === 0) {
    throw new Error('Failed to upsert communications to the ontolgoy.');
  }

  console.log(
    `upsert communications action returned: ${result?.edits?.edits?.[0]}`
  );

  const commsId = result.edits.edits[0].primaryKey as string;

  const getUrl = `${client.url}/api/v2/ontologies/${client.ontologyRid}/objects/Communications/${commsId}`;
  const fetchResults = await fetch(getUrl, {
    method: 'GET',
    headers: headers,
  });

  const comms = (await fetchResults.json()) as Communications;
  console.log(
    `the machine execution ontology returned: ${JSON.stringify(comms)}`
  );

  return comms;
}
