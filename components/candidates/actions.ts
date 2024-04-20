"use server"

import { prisma } from "@/libs/prisma"
import { revalidatePath } from "next/cache"

export async function selectCandidate(vacancyId: string, candidateId: string) {
    await prisma.vacancy.update({
        where:{
          id: vacancyId,
        },
        data:{
          chosenCandidate:{
            connect:{
              id: candidateId
            }
          },
          status: 'IN_PROGRESS'
        }
      })
      
      revalidatePath(`/vacancies/my/${vacancyId}`)
}