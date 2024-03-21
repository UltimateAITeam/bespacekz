import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req:NextRequest){
    const {job_id, user_id} = await req.json()
    const user = await prisma.user.findUniqueOrThrow({
        where:{
            id:user_id
        },
        select:{
            email: true
        }
    })
    
    await prisma.freelancerProfile.update({
        where:{
            userEmail: user.email
        },
        data:{
            favorites:{
               connect:{
                    id:job_id
               }
            }
        }
    })

    return NextResponse.json({},{
        status: 201
    })
}

export async function DELETE(req:NextRequest){
    const {job_id, user_id} = await req.json()

    const user = await prisma.user.findUniqueOrThrow({
        where:{
            id:user_id
        },
        select:{
            email: true
        }
    })
    
    await prisma.freelancerProfile.update({
        where:{
            userEmail: user.email
        },
        data:{
            favorites:{
               disconnect:{
                    id:job_id
               }
            }
        }
    })

    return NextResponse.json({},{
        status: 201
    })
}