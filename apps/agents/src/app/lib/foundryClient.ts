import { createClient } from '@osdk/client';
import { User, Users } from '@osdk/foundry.admin';
import { createPublicOauthClient } from '@osdk/oauth';
import { FoundryClient, Token } from '@codestrap/developer-foundations-types';

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

  if (!process.env['OSDK_CLIENT_ID']
    || !process.env['REDIRECT_URL']
    || !process.env['FOUNDRY_STACK_URL']
    || !process.env['ONTOLOGY_RID']
  ) {
    throw new Error(
      'missing required env vars: OSDK_CLIENT_ID, REDIRECT_URL, FOUNDRY_STACK_URL, ONTOLOGY_RID'
    );
  }

  // setup the OSDK
  const clientId: string = process.env['OSDK_CLIENT_ID']!;
  const url: string = process.env['FOUNDRY_STACK_URL']!;
  const ontologyRid: string = process.env['ONTOLOGY_RID']!;
  const redirectUrl: string = process.env['REDIRECT_URL']!;
  const scopes: string[] = [
    'api:use-ontologies-read',
    'api:use-ontologies-write',
    'api:use-admin-read',
    'api:use-connectivity-read',
    'api:use-connectivity-execute',
    'api:use-orchestration-read',
    'api:use-mediasets-read',
    'api:use-mediasets-write'
  ];

  const auth = createPublicOauthClient(clientId, url, redirectUrl, true, undefined, window.location.toString(), scopes);
  const client = createClient(url, ontologyRid, auth);

  const getUser = async () => {
    const user: User = await Users.getCurrent(client);

    return user;
  };

  let token: Token | undefined;
  let tokenExpire: Date | undefined;
  let pendingRequest: Promise<Token> | undefined;

  auth.addEventListener('signIn', (evt) => {
    token = evt.detail; // Token
    tokenExpire = new Date(token.expires_at);
  });

  auth.addEventListener('signOut', (evt) => {
    token = undefined;
    tokenExpire = undefined;
  });

  auth.addEventListener('refresh', (evt) => {
    token = evt.detail; // Token
    tokenExpire = new Date(token.expires_at);
  });

  const getToken = async function () {

    if (token && tokenExpire) {
      // add 60 seconds to account for processing time
      const skew = tokenExpire.getTime() + 60000;

      if (skew > new Date().getTime()) {
        return token.access_token;
      }
    }
    // avoid duplicate signin requests
    if (!pendingRequest) {
      pendingRequest = auth.signIn();
    }

    try {
      token = await pendingRequest;

      return token.access_token;
    } catch (e) {
      console.log(e);

      throw (e);
    } finally {
      pendingRequest = undefined;
    }

  }

  return { auth, ontologyRid, url, client, getUser, getToken };
}
