import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(req: NextRequest) {
  const filename = req.nextUrl.searchParams.get('name');

  if (!filename) {
    return NextResponse.json({ error: 'Missing image name' }, { status: 400 });
  }

  const filepath = path.join(process.cwd(), '.next/cache/images', filename);

  if (!fs.existsSync(filepath)) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }

  const buffer = fs.readFileSync(filepath);
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'image/png',
      'Cache-Control': 'no-store'
    },
  });
}