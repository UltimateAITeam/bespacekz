import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import {
  checkSessionAndGetData,
  getProfileBySession,
} from "@/libs/serverUtils";

export async function POST(req: Request) {
  try {
    const { data, session } = await checkSessionAndGetData(req);
    const FreelancerProfile = await getProfileBySession(session);
    const db_portfolio = await prisma.user.update({
      data: {
        about: data.about,
      },
      where: {
        email: FreelancerProfile.userEmail,
      },
    });

    const completedProfile = await prisma.freelancerProfile.update({
      where: {
        id: FreelancerProfile.id,
      },
      data: {
        completed: true,
      },
    });
    console.log(completedProfile);

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err?.toString() }, { status: 500 });
  }
}
