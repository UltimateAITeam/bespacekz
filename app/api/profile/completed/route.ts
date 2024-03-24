import {getProfileBySession} from "@/libs/serverUtils";
import {NextResponse} from "next/server";
import {getServerSession} from "next-auth";

export async function GET(
    req: Request
) {
    const session = await getServerSession();
    if (!session) {
        return NextResponse.json({error: "no session"}, {status: 401});
    }
    const freelancerProfile = await getProfileBySession(session);
    if (freelancerProfile) {
        if (freelancerProfile.completed) {
            return NextResponse.json({}, {status: 200});
        } else {
            return NextResponse.json({error: "profile not completed"}, {status: 400});
        }
    } else {
        return NextResponse.json({error: "profile not found"}, {status: 404});
    }

}