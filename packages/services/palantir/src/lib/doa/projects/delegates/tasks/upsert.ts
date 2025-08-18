import { FoundryClient, Tickets } from '@codestrap/developer-foundations-types';

export async function upsertTicket(
  client: FoundryClient,
  id: string,
  alertTitle: string,
  alertType: string,
  description: string,
  severity: string = 'Low',
  status: string = 'Open',
  points?: number,
  assignees?: string
): Promise<Tickets> {
  console.log(`upsertTicket machineId: ${id}`);

  const token = await client.auth.signIn();
  const apiKey = token.access_token;

  const url = `${client.url}/api/v2/ontologies/${client.ontologyRid}/actions/upsert-ticket/apply`;

  const headers = {
    Authorization: `Bearer ${apiKey}`,
    'Content-Type': 'application/json',
  };

  const body = JSON.stringify({
    parameters: {
      id,
      alertTitle,
      alertType,
      description,
      severity,
      status,
      points,
      assignees,
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
    throw new Error('Failed to upsert ticket message to the ontolgoy.');
  }

  console.log(`upsert ticket action returned: ${result?.edits?.edits?.[0]}`);

  const ticketId = result.edits.edits[0].primaryKey as string;

  const getUrl = `${client.url}/api/v2/ontologies/${client.ontologyRid}/objects/Tickets/${ticketId}`;
  const ticketFetchResults = await fetch(getUrl, {
    method: 'GET',
    headers: headers,
  });

  const ticket = (await ticketFetchResults.json()) as Tickets;
  console.log(
    `the ticket execution ontology returned: ${JSON.stringify(ticket)}`
  );

  return ticket;
}
