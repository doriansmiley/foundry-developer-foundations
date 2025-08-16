export const runtime = 'nodejs';

import { NextRequest, NextResponse } from 'next/server';
import { makeMachineDao } from '@codestrap/developer-foundations-services-palantir';

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({
      response_type: 'ephemeral',
      text: '⚠️ Missing required id param.',
    });
  }

  try {
    const machineDao = makeMachineDao();
    const result = await machineDao.read(id);

    return NextResponse.json(result);
  } catch (err) {
    console.error('Error reading machine object:', (err as Error).stack);
    return new NextResponse('Internal error', { status: 500 });
  }
}
