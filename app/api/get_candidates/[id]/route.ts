import { prisma } from '@/libs/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
  const id = params.id;

  const profile = await prisma.freelancerProfile.findUnique({
    where: {
      id,
      user: {
        role: 'FREELANCER',
      },
    },
    select: {
        user: {
          select: {
            image: true,
            about: true,
            name: true,
            last_name: true,
            location: true
          },
        },
        Education: true,
        Experience: true,
        Languages: true,
        Pricing: true,
        Portfolio: true,
        jobTitle: true,
        Skills: true,
        id: true,
        
      },
  });

  if (!profile) return NextResponse.json({error: 'User not found'}, {status: 404});
  return NextResponse.json(profile, {status: 200});
}
