import { Button } from "@/components/ui/button";
import { prisma } from "@/libs/prisma";
import { Vacancy } from "@prisma/client";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

export async function RespondToVacancy({ idVacancy }: { idVacancy: string }) {
  const vacancy = await prisma.vacancy.findUniqueOrThrow({
    where: {
      id: idVacancy,
    },
    select: {
      id: true,
      applicants: {
        select: {
          id: true,
          userEmail: true,
        },
      },
    },
  });

  const session = await getServerSession();

  const isAlreadyApplied = vacancy.applicants
    .map(({ userEmail }) => userEmail)
    .includes(session!.user.email);

  return (
    <form
      action={async () => {
        "use server";

        await prisma.freelancerProfile.update({
          where: {
            userEmail: session!.user.email,
          },
          data: {
            applications: {
              connect: {
                id: vacancy.id,
              },
            },
          },
        });

        revalidatePath(`/vacancies/${idVacancy}`);
      }}
    >
      <Button variant="default" disabled={!session || isAlreadyApplied}>
        Откликнуться
      </Button>
    </form>
  );
}
