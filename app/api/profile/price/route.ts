import {prisma} from "@/libs/prisma";
import {NextResponse} from "next/server";
import {checkSessionAndGetData, getProfileBySession} from "@/libs/serverUtils";
import {PricingType} from "@prisma/client";

export async function POST(
    req: Request
) {
    try {
        const {data, session} = await checkSessionAndGetData(req);
        const FreelancerProfile = await getProfileBySession(session);
        const id = await prisma.pricing.findFirst({
            where: {
                freelancerProfileId: FreelancerProfile.id
            }
        })
        console.log("DATA:", data)
        if (!id) {
            await prisma.pricing.create({
                data: {
                    pricingType: data.pricingType as PricingType[],
                    projectRate: data.projectRate ? data.projectRate : null,
                    hourlyRate: data.hourlyRate ? data.hourlyRate : null,
                    employeeRate: data.employeeRate ? data.employeeRate : null,
                    freelancerProfileId: FreelancerProfile.id
                }
            })
        } else {
            await prisma.pricing.update({
                data: {
                    pricingType: data.pricingType as PricingType[],
                    projectRate: data.projectRate ? data.projectRate : null,
                    hourlyRate: data.hourlyRate ? data.hourlyRate : null,
                    employeeRate: data.employeeRate ? data.employeeRate : null,
                },
                where: {
                    id: id.id

                }
            })
        }
        return NextResponse.json({}, {status: 200});
    } catch (err) {
        console.log(err)
        return NextResponse.json({error: err?.toString()}, {status: 500});
    }
}