import { prisma } from "@/libs/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const user = await prisma.user.findUniqueOrThrow({
    where: {
      id: params.id,
    },
    select: {
      image: true,
    },
  });

  if (user.image) {
    const res = await fetch(user.image);
    const blob = await res.blob();

    return new NextResponse(blob);
  }

  return new NextResponse(null, { status: 404 });
}
