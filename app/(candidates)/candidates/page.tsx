import { CandidatesAside } from "@/components/candidates/CandidatesAside";
import { CandidatesList } from "@/components/candidates/CandidatesList";
import { SearchBar } from "@/components/ui/SearchBar";
import { ICandidatesSearchParams } from "@/types/candidates.types";
import "./style.css";
import { Button } from "@chakra-ui/react";
import Link from "next/link";
import ExportButton from "./export-button";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/libs/prisma";
import { findClientSubscriptionById } from "@/services/client-subscription";

export default async function CandidatesPage({
  searchParams,
}: {
  searchParams?: ICandidatesSearchParams;
}) {
  const session = await getServerSession();

  if (!session) {
    return redirect("/login");
  }

  const client = await prisma.clientProfile.findUnique({
    where: {
      userEmail: session.user.email,
    },
    select: {
      id: true,
    },
  });

  let isClientSubscribed = false;

  if (client) {
    const clientSubscription = await findClientSubscriptionById(client.id);

    if (clientSubscription) {
      isClientSubscribed = true;
    }
  }

  return (
    <div className="container mx-auto mt-3 py-3 md:px-5 sm:px-7 px-3 space-y-3 font-roboto">
      <h1 className="font-medium text-[38px] !leading-tight text-[var(--Primary-10)] font-roboto">
        Информационные технологии
      </h1>
      <p className="font-medium text-2xl text-[var(--Primary-text)]">
        Объявления кандидатов
      </p>
      <div className="flex justify-between">
        <SearchBar />
        {isClientSubscribed && <ExportButton />}
      </div>
      <section className="flex gap-8 !mt-16 min-h-screen">
        <div className="w-[300px]">
          <CandidatesAside />
        </div>
        <div className="flex-1">
          <CandidatesList />
        </div>
      </section>
    </div>
  );
}
