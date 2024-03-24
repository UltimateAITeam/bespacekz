import ClientVacancyCard from "@/components/vacancies/ClientVacancyCard"
import { prisma } from "@/libs/prisma"
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"

export default async function MyVacanciesPage(){
    const session = await getServerSession()

    if(!session){
        redirect('/login')
    }

    const client = await prisma.clientProfile.findUnique({
        where:{
            userEmail: session.user.email
        }
    })

    if(!client){
        redirect('/login')
    }

    const vacancies = await prisma.vacancy.findMany({
        where:{
            clientProfile:{id: client.id}
        },
        include: {
            jobTitle: true,
            clientProfile: true,
            favoritedBy:{
              select: {
                user:{
                  select:{
                    id: true
                  }
                }
              }
            }
          }
    })


    return  <div className="container mx-auto mt-3 py-3 md:px-5 sm:px-7 px-3 space-y-3 font-roboto">
      <h1 className="font-medium text-[38px] !leading-tight text-[var(--Primary-10)] font-roboto">
        Ваши вакансии
      </h1>
      <div className="space-y-8 lg:mb-7 mb-3">
        {vacancies.map((vacancy)=>
            <ClientVacancyCard key={vacancy.id} {...vacancy} />
        )}
      </div>
    </div>
}