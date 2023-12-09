import {NextRequest, NextResponse} from "next/server";
import {getServerSession} from "next-auth";
import {prisma} from "@/libs/prisma";

// ADDING
export async function POST(
    req: NextRequest
) {
    try {
        const data = await req.json();
        const session = await getServerSession();
        console.log(data, session)
        if (!session || !data.type || !data.info) throw Error("Not auth")
        const {type, info} = data;

        const profile = await prisma.freelancerProfile.findUnique({
            where: {
                userEmail: session.user.email
            }
        })
        if (!profile) throw Error("No profile");
        if (type === "education") {
            await prisma.education.create({
                data: {
                    ...info,
                    freelancerProfileId: profile.id,
                }
            });
        } else if (type === "experience") {
            await prisma.experience.create({
                data: {
                    ...info,
                    freelancerProfileId: profile.id,
                }
            });
        } else if (type === "skill") {
            await prisma.skill.create({
                data: {
                    name: info.name,
                    proficiencyLevel: info.proficiencyLevel,
                    freelancerProfileId: profile.id,
                }
            });
        }

        return NextResponse.json({"data": "HELO"}, {status: 200});
    } catch (e) {
        return NextResponse.json({"error": e?.toString()}, {status: 500})
    }
}

// EDITING
export async function PUT(
    req: NextRequest
) {
    try {
        const data = await req.json();
        const session = await getServerSession();
        console.log(session, data)
        if (!session || !data.type || !data.info) throw Error("Not auth")
        const {type, info} = data;
        const profile = await prisma.freelancerProfile.findUnique({
            where: {
                userEmail: session.user.email,
            }
        })
        if (!profile) throw Error("No profile");

        if (type === "user") {
            await prisma.user.update({
                data: info,
                where: {
                    email: session.user.email,
                }
            })
        } else if (type === "education") {
            const {id: ed_id, ...res} = info;
            await prisma.education.update({
                data: res,
                where: {
                    id: ed_id,
                    freelancerProfileId: profile.id,
                }
            })
        } else if (type === "experience") {
            const {id: exp_id, ...res} = info;
            await prisma.experience.update({
                data: res,
                where: {
                    id: exp_id,
                    freelancerProfileId: profile.id,
                }
            })
        } else if (type === "about") {
            await prisma.user.update({
                where: {
                    email: session.user.email,
                },
                data: {
                    about: info
                }
            })
        }
        return NextResponse.json({"status": "ok"}, {status: 200})
    } catch (e) {
        return NextResponse.json({"error": e?.toString()}, {status: 500})
    }
}

// DELETE
export async function DELETE(
    req: NextRequest
) {
    try {
        const data = await req.json();
        const session = await getServerSession();
        if (!session || !data.type || !data.info) throw Error("Not auth")
        const {type, info} = data;
        const profile = await prisma.freelancerProfile.findUnique({
            where: {
                userEmail: session.user.email,
            }
        })
        if (!profile) throw Error("No profile");
        if (type === "education") {
            console.log(info)
            await prisma.education.delete({
                where: {
                    id: info,
                    freelancerProfileId: profile.id,
                }
            })
        } else if (type === "experience") {
            const exp = await prisma.experience.findUnique({
                where: {
                    id: info.id,
                    freelancerProfileId: profile.id,
                }
            });

            if (!exp) throw Error("No experience");

            await prisma.experience.delete({
                where: {
                    id: info.id,
                }
            })

        } else if (type === "skill") {
            await prisma.skill.delete({
                where: {
                    id: info.id,
                    freelancerProfileId: profile.id,
                }
            })
        }
        return NextResponse.json({"status": "ok"}, {status: 200})
    } catch (e) {
        return NextResponse.json({"error": e?.toString()}, {status: 500})
    }

}