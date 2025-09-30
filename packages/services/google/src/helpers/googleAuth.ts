import { google } from 'googleapis';
import { Buffer } from 'buffer';
import { ServiceAccountCredentials } from '@codestrap/developer-foundations-types';

export async function loadServiceAccountFromEnv(): Promise<ServiceAccountCredentials> {
  if (!process.env['GSUITE_SERVICE_ACCOUNT']) {
    throw new Error('GSUITE_SERVICE_ACCOUNT environment variable not set');
  }

  const jsonString = Buffer.from(
    process.env['GSUITE_SERVICE_ACCOUNT'],
    'base64'
  ).toString('utf8');
  const credentials = JSON.parse(jsonString) as ServiceAccountCredentials;

  console.log('✅ Service account file loaded successfully');
  console.log('📋 Service account details:', {
    client_email: credentials.client_email,
    project_id: credentials.project_id,
    type: credentials.type
  });
  return credentials;
}

export function makeGoogleAuth(
  credentials: ServiceAccountCredentials,
  scopes: string[],
  user: string
) {
  console.log('🔑 Creating Google Auth with:', {
    clientEmail: credentials.client_email,
    projectId: credentials.project_id,
    scopes,
    subject: user
  });
  
  return new google.auth.GoogleAuth({
    credentials,
    scopes,
    clientOptions: { subject: user },
  });
}

