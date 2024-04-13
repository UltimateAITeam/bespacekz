import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(req: NextRequest) {
  const records = await prisma.jobCategory.findMany({
    include: {
      JobTitles: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  return NextResponse.json(records, { status: 200 });
}
