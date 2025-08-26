export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { Vickie } from '@codestrap/developer-foundations-agents-vickie-bennie';
import { User } from '@osdk/foundry.admin';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, x-foundry-access-token',
    },
  });
}

export async function POST(req: NextRequest) {
  const bodyText = await req.text();
  const token = req.headers.get('x-foundry-access-token');
  // set the global used by our auth client
  (globalThis as any).foundryAccessToken = token;

  const params = new URLSearchParams(bodyText);
  const threadId = params.get('threadId') || undefined;
  const user = (params.get('user')) ? JSON.parse(params.get('user')!) as User : undefined;
  const userId = user?.id;
  const text = params.get('query') || undefined;
  const action = params.get('action');
  const plan = params.get('plan') || undefined;
  const executionId = params.get('executionId') || undefined;
  const forward: boolean =
    params.get('forward') === null ? true : params.get('forward') === 'true';
  const inputs = params.get('inputs') || undefined;

  // set globals to our server side code can retrieve the active user and token
  (globalThis as any).foundryAccessToken = token;
  (globalThis as any).foundryUser = user;

  console.log(`vickie route received user: ${JSON.stringify((globalThis as any).foundryUser || {})}`);
  console.log(`vickie route received token of length: ${(globalThis as any).foundryAccessToken?.length}`);

  if (!action) {
    return NextResponse.json({
      response_type: 'ephemeral',
      text: '⚠️ Missing required action param.',
    });
  }

  try {
    const vickie = new Vickie();

    switch (action) {
      case 'askVickie':
        if (!text || !userId) {
          return NextResponse.json({
            response_type: 'ephemeral',
            text: '⚠️ Missing required text and userId params.',
          });
        }
        // fire and forget as to not timeout, short polling should be used in the client
        await vickie.askVickie(text, userId, threadId);
      // eslint-disable-next-line no-fallthrough
      case 'getTaskList':
        if (!text || !userId) {
          return NextResponse.json({
            response_type: 'ephemeral',
            text: '⚠️ Missing required text and userId params.',
          });
        }

        // fire and forget as to not timeout, short polling should be used in the client
        await vickie.createComsTasksList(text, userId, threadId);
      // eslint-disable-next-line no-fallthrough
      case 'executeTaskList':
        // fire and forget as to not timeout, short polling should be used in the client
        await vickie.getNextState(plan, forward, executionId, inputs, 'coms');
    }

    return NextResponse.json({
      status: 200,
      message: 'I am executing the request in the background.',
      executionId,
      threadId,
    });
  } catch (err) {
    console.error('Error executing vickie:', err);
    console.log(text);
    return new NextResponse('Internal error', { status: 500 });
  }
}
