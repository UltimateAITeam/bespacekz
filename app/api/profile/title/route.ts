import { NextRequest, NextResponse } from "next/server";
import {
  checkSessionAndGetData,
  getProfileBySession,
} from "@/libs/serverUtils";
import { prisma } from "@/libs/prisma";

export async function POST(req: NextRequest) {
  try {
    const { data, session } = await checkSessionAndGetData(req);
    const FreelancerProfile = await getProfileBySession(session);
    await prisma.freelancerProfile.update({
      where: {
        id: FreelancerProfile.id,
      },
      data: {
        jobTitle: data.title,
      },
    });

    return NextResponse.json({ data: "ok" }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err?.toString() }, { status: 500 });
  }
}
