// TODO: Fix me. I need a foundry API source created.
import { FoundryApis } from "@foundry/external-systems/sources";

// TODO replace with the OSDK platform SDK
export async function getUserProfileFromToken() {
  const apiKey = FoundryApis.getSecret('additionalSecretOsdkToken');

  const baseUrl = FoundryApis.getHttpsConnection().url;
  const headers = {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${apiKey}`
  };

  const apiResults = await fetch(`${baseUrl}/api/v2/admin/users/getCurrent`, {
    method: 'GET',
    headers,
  });

  const apiResponse = await apiResults.json() as any;

  if (apiResponse.errorCode) {
    console.log(`errorInstanceId: ${apiResponse.errorCode} errorName: ${apiResponse.errorName} errorCode: ${apiResponse.errorCode}`);
    throw new Error(`An error occured while calling update machine errorInstanceId: ${apiResponse.errorInstanceId} errorCode: ${apiResponse.errorCode}`);
  }

  return apiResponse.id;
}
