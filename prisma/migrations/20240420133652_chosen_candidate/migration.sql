/*
  Warnings:

  - You are about to drop the `_FreelancerProfileToVacancy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_FreelancerProfileToVacancy" DROP CONSTRAINT "_FreelancerProfileToVacancy_A_fkey";

-- DropForeignKey
ALTER TABLE "_FreelancerProfileToVacancy" DROP CONSTRAINT "_FreelancerProfileToVacancy_B_fkey";

-- AlterTable
ALTER TABLE "Vacancy" ADD COLUMN     "freelancerProfileId" TEXT;

-- DropTable
DROP TABLE "_FreelancerProfileToVacancy";

-- CreateTable
CREATE TABLE "_favorites" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_favorites_AB_unique" ON "_favorites"("A", "B");

-- CreateIndex
CREATE INDEX "_favorites_B_index" ON "_favorites"("B");

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_freelancerProfileId_fkey" FOREIGN KEY ("freelancerProfileId") REFERENCES "FreelancerProfile"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favorites" ADD CONSTRAINT "_favorites_A_fkey" FOREIGN KEY ("A") REFERENCES "FreelancerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favorites" ADD CONSTRAINT "_favorites_B_fkey" FOREIGN KEY ("B") REFERENCES "Vacancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
