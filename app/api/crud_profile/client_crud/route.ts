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

        if (!session || !data.type || !data.info) throw Error("Not auth")
        const {type, info} = data;

        const profile = await prisma.clientProfile.findUnique({
            where: {
                userEmail: session.user.email
            }
        })
        if (!profile) throw Error("No profile");
        if (type === "client_vacancy") {
            await prisma.vacancy.create({
                data: {
                    ...info,
                    clientId: profile.id,
                }
            });
        }

        return NextResponse.json({"data": "ok"}, {status: 200});
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
        const profile = await prisma.clientProfile.findUnique({
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
        } else if (type === "client_profile") {
            await prisma.clientProfile.update({
                data: info,
                where: {
                    userEmail: session.user.email,
                }
            })
        } else if (type === "client_profile_description") {
            await prisma.clientProfile.update({
                data: {companyDescription: info},
                where: {
                    userEmail: session.user.email,
                }
            })
        } else if (type === "client_vacancy") {
            const {id, clientId, ...res} = info;
            console.log("VACANCY", id, res)
            await prisma.vacancy.update({
                data: res,
                where: {
                    id: id,
                    clientId: clientId,
                }
            })
        }
        return NextResponse.json({"status": "ok"}, {status: 200})
    } catch (e) {
        return NextResponse.json({"error": e?.toString()}, {status: 500})
    }
}

export async function DELETE(
    req: NextRequest
) {
    try {
        const data = await req.json();
        const session = await getServerSession();
        if (!session || !data.type || !data.info) throw Error("Not auth")
        const {type, info} = data;
        const profile = await prisma.clientProfile.findUnique({
            where: {
                userEmail: session.user.email,
            }
        })
        if (!profile) throw Error("No profile");
        if (type === "client_vacancy") {
            await prisma.vacancy.delete({
                where: {
                    id: info,
                    clientId: profile.id,
                }
            })
        }
        return NextResponse.json({"status": "ok"}, {status: 200})
    } catch (e) {
        return NextResponse.json({"error": e?.toString()}, {status: 500})
    }

}