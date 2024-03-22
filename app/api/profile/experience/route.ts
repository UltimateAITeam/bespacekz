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

    for (const experience of data) {
      console.log("LOG: experience", experience);
      const exp = await prisma.experience.create({
        data: {
          jobTitle: experience.jobTitle,
          company: experience.company,
          name: experience.name,
          tasks: experience.tasks,
          skills: experience.skills,
          link: experience.link,
          country: experience.country,
          city: experience.city || "",
          stillWorking: experience.stillWorking,
          from: experience.from,
          to: experience.to,
          freelancerProfileId: FreelancerProfile.id,
        },
      });
    }

    return NextResponse.json({}, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ error: err?.toString() }, { status: 500 });
  }
}
