import { createClient } from '@osdk/client';
import { User, Users } from '@osdk/foundry.admin';
import { createConfidentialOauthClient } from '@osdk/oauth';
import { RangrClient } from '@codestrap/developer-foundations-types';

export function createRangrClient(): RangrClient {
  // log ENV vars
  console.log('Environment variable keys:');
  Object.keys(process.env).forEach((key) => {
    if (key.indexOf('RANGR_FOUNDRY') >= 0 || key.indexOf('RANGR_OSDK') >= 0) {
      console.log(`- ${key}`);
    }
  });

  if (
    !process.env['RANGR_OSDK_CLIENT_ID'] ||
    !process.env['RANGR_OSDK_CLIENT_SECRET'] ||
    !process.env['RANGR_ONTOLOGY_RID'] ||
    !process.env['RANGR_OSDK_CLIENT_SECRET']
  ) {
    throw new Error('missing required env vars for RANGR');
  }

  // setup the OSDK
  const clientId: string = process.env['RANGR_OSDK_CLIENT_ID'] || '';
  const url: string = process.env['RANGR_FOUNDRY_STACK_URL'] || '';
  const ontologyRid: string = process.env['RANGR_ONTOLOGY_RID'] || '';
  const clientSecret: string = process.env['RANGR_OSDK_CLIENT_SECRET'] || '';
  const scopes: string[] = [
    'api:ontologies-read',
    'api:ontologies-write',
    'api:admin-read',
    'api:connectivity-read',
    'api:connectivity-write',
    'api:connectivity-execute',
    'api:mediasets-read',
    'api:mediasets-write',
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
