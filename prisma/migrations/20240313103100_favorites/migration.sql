/*
  Warnings:

  - You are about to drop the column `userId` on the `ClientProfile` table. All the data in the column will be lost.
  - You are about to drop the column `graduationYear` on the `Education` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the column `roles` on the `Experience` table. All the data in the column will be lost.
  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userEmail]` on the table `ClientProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userEmail` to the `ClientProfile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ProficiencyLevel" AS ENUM ('A1', 'A2', 'B1', 'B2', 'C1', 'C2');

-- CreateEnum
CREATE TYPE "PricingType" AS ENUM ('FREELANCE', 'EMPLOYEE');

-- CreateEnum
CREATE TYPE "CurrencyType" AS ENUM ('KZT', 'USD', 'EUR', 'RUB');

-- DropForeignKey
ALTER TABLE "ClientProfile" DROP CONSTRAINT "ClientProfile_userId_fkey";

-- DropForeignKey
ALTER TABLE "Education" DROP CONSTRAINT "Education_freelancerProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Experience" DROP CONSTRAINT "Experience_freelancerProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Portfolio" DROP CONSTRAINT "Portfolio_freelancerProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Pricing" DROP CONSTRAINT "Pricing_freelancerProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_freelancerProfileId_fkey";

-- DropIndex
DROP INDEX "ClientProfile_userId_key";

-- AlterTable
ALTER TABLE "ClientProfile" DROP COLUMN "userId",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "companyDescription" TEXT,
ADD COLUMN     "companyInfo" TEXT,
ADD COLUMN     "isCompany" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "mailIndex" TEXT,
ADD COLUMN     "sphereOfWork" TEXT,
ADD COLUMN     "userEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Education" DROP COLUMN "graduationYear",
ADD COLUMN     "from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "to" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Experience" DROP COLUMN "duration",
DROP COLUMN "roles",
ADD COLUMN     "city" TEXT,
ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'Kazakhstan',
ADD COLUMN     "from" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "jobTitle" TEXT NOT NULL DEFAULT 'Freelancer',
ADD COLUMN     "link" TEXT,
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "stillWorking" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "to" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "FreelancerProfile" ADD COLUMN     "Skills" TEXT[],
ADD COLUMN     "jobTitleId" INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE "Pricing" ADD COLUMN     "employeeRate" DOUBLE PRECISION,
ADD COLUMN     "pricingType" "PricingType"[] DEFAULT ARRAY['FREELANCE']::"PricingType"[],
ALTER COLUMN "hourlyRate" DROP NOT NULL,
ALTER COLUMN "projectRate" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "about" TEXT,
ADD COLUMN     "birthdate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "Skill";

-- CreateTable
CREATE TABLE "Language" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "proficiencyLevel" "ProficiencyLevel" NOT NULL,
    "freelancerProfileId" TEXT NOT NULL,

    CONSTRAINT "Language_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vacancy" (
    "id" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "pricingType" "PricingType" NOT NULL DEFAULT 'FREELANCE',
    "aboutVacancy" TEXT NOT NULL,
    "priceFrom" DOUBLE PRECISION NOT NULL,
    "priceTo" DOUBLE PRECISION NOT NULL,
    "currency" "CurrencyType" NOT NULL DEFAULT 'KZT',
    "isClear" BOOLEAN NOT NULL DEFAULT false,
    "experience" TEXT NOT NULL,
    "specialization" TEXT NOT NULL,
    "requiredSkills" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "country" TEXT NOT NULL DEFAULT 'Kazakhstan',
    "city" TEXT NOT NULL DEFAULT 'remote',
    "jobTitleId" INTEGER NOT NULL,

    CONSTRAINT "Vacancy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobTitle" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL,

    CONSTRAINT "JobTitle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobCategory" (
    "id" SERIAL NOT NULL,
    "category_name" TEXT NOT NULL,

    CONSTRAINT "JobCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FreelancerProfileToVacancy" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "JobTitle_name_key" ON "JobTitle"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_FreelancerProfileToVacancy_AB_unique" ON "_FreelancerProfileToVacancy"("A", "B");

-- CreateIndex
CREATE INDEX "_FreelancerProfileToVacancy_B_index" ON "_FreelancerProfileToVacancy"("B");

-- CreateIndex
CREATE UNIQUE INDEX "ClientProfile_userEmail_key" ON "ClientProfile"("userEmail");

-- AddForeignKey
ALTER TABLE "FreelancerProfile" ADD CONSTRAINT "FreelancerProfile_jobTitleId_fkey" FOREIGN KEY ("jobTitleId") REFERENCES "JobTitle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Education" ADD CONSTRAINT "Education_freelancerProfileId_fkey" FOREIGN KEY ("freelancerProfileId") REFERENCES "FreelancerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Experience" ADD CONSTRAINT "Experience_freelancerProfileId_fkey" FOREIGN KEY ("freelancerProfileId") REFERENCES "FreelancerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Language" ADD CONSTRAINT "Language_freelancerProfileId_fkey" FOREIGN KEY ("freelancerProfileId") REFERENCES "FreelancerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pricing" ADD CONSTRAINT "Pricing_freelancerProfileId_fkey" FOREIGN KEY ("freelancerProfileId") REFERENCES "FreelancerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_freelancerProfileId_fkey" FOREIGN KEY ("freelancerProfileId") REFERENCES "FreelancerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ClientProfile" ADD CONSTRAINT "ClientProfile_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "ClientProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Vacancy" ADD CONSTRAINT "Vacancy_jobTitleId_fkey" FOREIGN KEY ("jobTitleId") REFERENCES "JobTitle"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "JobTitle" ADD CONSTRAINT "JobTitle_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "JobCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FreelancerProfileToVacancy" ADD CONSTRAINT "_FreelancerProfileToVacancy_A_fkey" FOREIGN KEY ("A") REFERENCES "FreelancerProfile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FreelancerProfileToVacancy" ADD CONSTRAINT "_FreelancerProfileToVacancy_B_fkey" FOREIGN KEY ("B") REFERENCES "Vacancy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
