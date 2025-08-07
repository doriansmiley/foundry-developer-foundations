export async function callAskVickie({
  action,
  userId,
  text,
  query,
  threadId,
  plan,
  forward,
  executionId,
  inputs,
}: {
  action: string;
  userId?: string;
  text?: string;
  query?: string;
  threadId?: string;
  plan?: string;
  forward?: string;
  executionId?: string;
  inputs?: string;
}) {
  const body = new URLSearchParams({
    action,
    ...(query ? { query } : {}),
    ...(userId ? { userId } : {}),
    ...(text ? { text } : {}),
    ...(threadId ? { threadId } : {}),
    ...(plan ? { plan } : {}),
    ...(forward ? { forward } : {}),
    ...(executionId ? { executionId } : {}),
    ...(inputs ? { inputs } : {}),
  });

  // fire and forget as there is a timeout we have to deal with
  const result = await fetch('/api/vickie', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: body.toString(),
  });

  return result;
}
