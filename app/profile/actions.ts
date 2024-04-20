"use server";

import { prisma } from "@/libs/prisma";

export async function updateUserImage(email: string, image: string) {
  await prisma.user.update({
    where: {
      email,
    },
    data: {
      image,
    },
  });
}
