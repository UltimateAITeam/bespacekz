import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import {
  checkSessionAndGetData,
  getProfileBySession,
} from "@/libs/serverUtils";

export async function POST(req: Request) {
  try {
    const { data, session } = await checkSessionAndGetData(req);
    const FreelancerProfile = await getProfileBySession(session);

    for (const education of data) {
      const edu = await prisma.education.create({
        data: {
          degree: education.degree,
          institution: education.institution,
          specialization: education.specialization,
          from: education.from,
          to: education.to,
          freelancerProfileId: FreelancerProfile.id,
        },
      });
    }

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err?.toString() }, { status: 500 });
  }
}
