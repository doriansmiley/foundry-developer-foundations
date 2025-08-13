import { OfficeServiceV3 } from '@codestrap/developer-foundations-types';
import { makeGSuiteClientV2 } from './gsuiteClient.v2';
import { google } from 'googleapis';
import { searchDriveFiles } from './delegates/searchDriveFiles';

export async function makeGSuiteClientV3(user: string): Promise<OfficeServiceV3> {
  const v2Client = await makeGSuiteClientV2(user);

  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });
  const drive = google.drive({ version: 'v3', auth });

  return {
    ...v2Client,
    searchDriveFiles: (args) => searchDriveFiles(drive, args),
  };
}
