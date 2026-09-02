import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/libs/prisma";

export default async function AllJobsForYourProfilePage() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    redirect("/login");
  }

  const freelancerProfile = await prisma.freelancerProfile.findUnique({
    where: { userEmail: session.user.email },
    include: { jobTitle: { include: { category: true } } },
  });

  const categoryName = freelancerProfile?.jobTitle?.category?.category_name;

  if (categoryName) {
    redirect(`/vacancies?category=${encodeURIComponent(categoryName)}`);
  }

  redirect("/vacancies");
}
