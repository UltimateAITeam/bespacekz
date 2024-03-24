import { Button } from "@/components/ui/button";
import VacancyApplication from "@/emails/vacancy-application";
import postmark from "@/libs/postmark";
import { prisma } from "@/libs/prisma";
import { Vacancy } from "@prisma/client";
import { render } from "@react-email/components";
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
      jobTitle:{
        select:{
          name: true
        }
      },
      applicants: {
        select: {
          id: true,
          userEmail: true,
        },
      },
      clientProfile:{
        select:{
          user: {
            select:{
              email: true,
            }
          }
        }
      }
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
          select:{
            user:{
              select:{
                id: true,name:true,
                last_name: true,
              }
            }
          }
        });

        const html = render(<VacancyApplication vacancy={{
          id: vacancy.id,
          name: vacancy.jobTitle.name,
        }} applicant={{
          id: freelancer.user.id,
        }} />)

        await postmark.sendEmail({
          From: "info@bespace.kz",
          To: vacancy.clientProfile.user.email,
          Subject: 'Новый отклик на вакансию',
          HtmlBody: html,
          "MessageStream": "outbound"
        })

        revalidatePath(`/vacancies/${idVacancy}`);
      }}
    >
      <Button variant="default" disabled={!session || isAlreadyApplied}>
        Откликнуться
      </Button>
    </form>
  );
}
