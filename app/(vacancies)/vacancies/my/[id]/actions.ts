"use server";
import { prisma } from "@/libs/prisma";
import { revalidatePath } from "next/cache";

export async function archiveVacancy(vacancyId: string) {
  await prisma.vacancy.update({
    where: {
      id: vacancyId,
    },
    data: {
      status: "ARCHIVED",
    },
  });
  revalidatePath(`/vacancies/my/${vacancyId}`);
}

export async function publishVacancy(vacancyId: string) {
  await prisma.vacancy.update({
    where: {
      id: vacancyId,
    },
    data: {
      status: "ACTIVE",
    },
  });
  revalidatePath(`/vacancies/my/${vacancyId}`);
}
