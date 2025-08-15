import { createClient } from '@osdk/client';
import { User, Users } from '@osdk/foundry.admin';
import { createConfidentialOauthClient } from '@osdk/oauth';
import { FoundryClient } from '@codestrap/developer-foundations-types';

// this is a utility method to manage usage of the Foundry Client and ensure we only get a singleton
// files in the palantir services package can't use the container to get the foundry client, nor should they really
// They are in the same package
let client: FoundryClient | undefined = undefined;

export function getFoundryClient(): FoundryClient {
  if (!client) {
    client = createFoundryClient();
  }

  return client;
}

function createFoundryClient(): FoundryClient {
  // log ENV vars
  console.log('Environment variable keys:');
  Object.keys(process.env).forEach((key) => {
    if (key.indexOf('FOUNDRY') >= 0 || key.indexOf('OSDK') >= 0) {
      console.log(`- ${key}`);
    }
  });

  if (!process.env['OSDK_CLIENT_ID'] || !process.env['OSDK_CLIENT_SECRET']) {
    throw new Error(
      'missing required env vars: OSDK_CLIENT_ID, OSDK_CLIENT_SECRET'
    );
  }

  // setup the OSDK
  const clientId: string = process.env['OSDK_CLIENT_ID']!;
  const url: string = process.env['FOUNDRY_STACK_URL']!;
  const ontologyRid: string = process.env['ONTOLOGY_RID']!;
  const clientSecret: string = process.env['OSDK_CLIENT_SECRET']!;
  const scopes: string[] = [
    'api:use-ontologies-read',
    'api:use-ontologies-write',
    'api:use-admin-read',
    'api:use-connectivity-read',
    'api:use-connectivity-execute',
    'api:use-orchestration-read',
    'api:use-mediasets-read',
    'api:use-mediasets-write',
  ];

  const auth = createConfidentialOauthClient(
    clientId,
    clientSecret,
    url,
    scopes
  );
  const client = createClient(url, ontologyRid, auth);
  const getUser = async () => {
    const user: User = await Users.getCurrent(client);

    return user;
  };

  return { auth, ontologyRid, url, client, getUser };
}
