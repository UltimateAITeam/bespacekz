import {prisma} from "@/libs/prisma";
import {NextResponse} from "next/server";
import {checkSessionAndGetData, getProfileBySession} from "@/libs/serverUtils";

export async function POST(
    req: Request
) {
    try {
        const {data, session} = await checkSessionAndGetData(req);
        const FreelancerProfile = await getProfileBySession(session);
        for (const language of data) {
            await prisma.language.create({
                data: {
                    ...language,
                    freelancerProfileId: FreelancerProfile.id,
                }
            });

        }

        return NextResponse.json({}, {status: 200});
    } catch (err) {
        console.log(err)
        return NextResponse.json({error: err?.toString()}, {status: 500});
    }
}