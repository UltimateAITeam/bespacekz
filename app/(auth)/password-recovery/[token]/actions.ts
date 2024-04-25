"use server";
import bcrypt from "bcrypt";
import { prisma } from "@/libs/prisma";
import { isAfter } from "date-fns";

export async function updatePassword(token: string, password: string) {
  const [verificationToken] = await prisma.$transaction([
    prisma.verificationToken.findUniqueOrThrow({ where: { token } }),
    prisma.verificationToken.delete({
      where: {
        token,
      },
    }),
  ]);

  if (!isAfter(new Date(), verificationToken.expires)) {
    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        email: verificationToken.identifier,
      },
      data: {
        password: hashedPassword,
      },
    });
  }
}
