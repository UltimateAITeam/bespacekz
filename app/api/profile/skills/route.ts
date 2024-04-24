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
    console.log(data);
    const skills = data.map((skill: { name: string }) => skill.name);

    await prisma.freelancerProfile.update({
      where: {
        id: FreelancerProfile.id,
      },
      data: {
        Skills: {
          set: [],
        },
      },
    });

    await prisma.freelancerProfile.update({
      where: {
        id: FreelancerProfile.id,
      },
      data: {
        Skills: { set: skills },
      },
    });

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err?.toString() }, { status: 500 });
  }
}
