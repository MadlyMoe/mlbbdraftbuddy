import { PrismaClient } from '@prisma/client';
import { error } from 'console';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { teamColor } = await req.json();

  if (!teamColor || !['blue', 'red'].includes(teamColor)) {
    return NextResponse.json(
      { error: 'Invalid or missing teamColor'},
      { status: 400 }
    );
  }

  try {
    const draft = await prisma.draft.create({
      
    })
  }
}