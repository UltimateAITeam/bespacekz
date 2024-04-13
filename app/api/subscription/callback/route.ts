import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const payload = await req.json();

  const subscriptionEndsAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);

  if (payload.reason === "success") {
    await prisma.clientProfile.update({
      where: {
        id: payload.accountId,
      },
      data: {
        subscriptionEndsAt,
      },
    });

    return NextResponse.json({});
  }

  return NextResponse.json(
    {
      error: "Bad request",
    },
    {
      status: 400,
    },
  );
}
