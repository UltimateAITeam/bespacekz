import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  const id = params.id;

  try {
    const vacancy = await prisma.vacancy.findFirst({
      where: {
        id: id,
      },
      include: {
        jobTitle: true,
        clientProfile: {
          include: {
            user: true,
          },
        },
      },
    });
    return NextResponse.json(vacancy);
  } catch (e) {
    console.log("Пойман на ошибке", e);
    return NextResponse.json({ error: e?.toString }, { status: 500 });
  }
}
