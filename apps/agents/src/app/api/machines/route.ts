export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { TYPES, MachineDao } from '@codestrap/developer-foundations-types';
import { container } from '@codestrap/developer-foundations-di';

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

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const token = req.headers.get('x-foundry-access-token');

  // set globals to our server side code can retrieve the active user and token
  (globalThis as any).foundryAccessToken = token;

  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({
      response_type: 'ephemeral',
      text: '⚠️ Missing required id param.',
    });
  }

  try {
    console.log(`calling machineDao.read with id ${id}`);
    const machineDao = container.get<MachineDao>(TYPES.MachineDao);
    const result = await machineDao.read(id);

    return NextResponse.json(result);
  } catch (err) {
    console.error('Error reading machine object:', (err as Error).stack);
    return new NextResponse('Internal error', { status: 500 });
  }
}
