import { prisma } from "@/libs/prisma";
import { redirect } from "next/navigation";
import { isAfter } from "date-fns";

export async function GET(req: Request) {
  const url = new URL(req.url);

  const token = url.searchParams.get("token");

  if (!token) {
    return redirect("/");
  }

  const [verificationToken] = await prisma.$transaction([
    prisma.verificationToken.findUniqueOrThrow({ where: { token } }),
    prisma.verificationToken.delete({
      where: {
        token,
      },
    }),
  ]);

  if (isAfter(new Date(), verificationToken.expires)) {
    return redirect("/");
  }

  await prisma.user.update({
    where: { email: verificationToken.identifier },
    data: {
      emailVerified: new Date(),
    },
  });

  return redirect("/");
}
