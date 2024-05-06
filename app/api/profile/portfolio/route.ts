import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import {
  checkSessionAndGetData,
  getProfileBySession,
} from "@/libs/serverUtils";

export async function POST(req: Request) {
  try {
    const { data, session } = await checkSessionAndGetData(req);

    await prisma.portfolio.deleteMany({
      where: {
        freelancerProfile: {
          userEmail: session.user.email!,
        },
      },
    });

    await prisma.freelancerProfile.update({
      where: {
        userEmail: session.user.email,
      },
      data: {
        Portfolio: {
          create: {
            links: data,
          },
        },
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err?.toString() }, { status: 500 });
  }
}
