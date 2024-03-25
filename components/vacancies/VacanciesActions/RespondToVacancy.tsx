import { Button } from "@chakra-ui/react";
import VacancyApplication from "@/emails/vacancy-application";
import postmark from "@/libs/postmark";
import { prisma } from "@/libs/prisma";
import { Vacancy } from "@prisma/client";
import { render } from "@react-email/components";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
// import { CheckIcon, ExternalLinkIcon } from "@chakra-ui/icons";

// TODO: add loading banner and success or error taost
// why it is server side rendered?
export async function RespondToVacancy({ idVacancy }: { idVacancy: string }) {
  const vacancy = await prisma.vacancy.findUniqueOrThrow({
    where: {
      id: idVacancy,
    },
    select: {
      id: true,
      jobTitle: {
        select: {
          name: true,
        },
      },
      applicants: {
        select: {
          id: true,
          userEmail: true,
        },
      },
      clientProfile: {
        select: {
          user: {
            select: {
              email: true,
            },
          },
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
        const freelancer = await prisma.freelancerProfile.update({
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
          select: {
            user: {
              select: {
                id: true,
                name: true,
                last_name: true,
              },
            },
          },
        });

        const html = render(
          <VacancyApplication
            vacancy={{
              id: vacancy.id,
              name: vacancy.jobTitle.name,
            }}
            applicant={{
              id: freelancer.user.id,
            }}
          />,
        );

        // test this after fixing the registration with @bespace.kz email
        // await postmark.sendEmail({
        //   From: "info@bespace.kz",
        //   To: vacancy.clientProfile.user.email,
        //   Subject: 'Новый отклик на вакансию',
        //   HtmlBody: html,
        //   "MessageStream": "outbound"
        // })

        revalidatePath(`/vacancies/${idVacancy}`);
      }}
    >
      <Button
        type="submit"
        // leftIcon={isAlreadyApplied ? <CheckIcon /> : <ExternalLinkIcon />}
        variant={"outline"}
        colorScheme={isAlreadyApplied ? "gray" : "blue"}
        isDisabled={!session || isAlreadyApplied}
      >
        {isAlreadyApplied ? "Ваш отклик на рассмотрении" : "Откликнуться"}
      </Button>
    </form>
  );
}
