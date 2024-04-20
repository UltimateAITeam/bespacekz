-- CreateEnum
CREATE TYPE "VacancyStatus" AS ENUM ('ACTIVE', 'ARCHIVED', 'IN_PROGRESS', 'COMPLETE');

-- AlterTable
ALTER TABLE "Vacancy" ADD COLUMN     "status" "VacancyStatus" NOT NULL DEFAULT 'ACTIVE';
