-- CreateEnum
CREATE TYPE "VacancyRole" AS ENUM ('ACTIVE', 'ARCHIVED', 'IN_PROGRESS', 'COMPLETE');

-- AlterTable
ALTER TABLE "Vacancy" ADD COLUMN     "status" "VacancyRole" NOT NULL DEFAULT 'ACTIVE';
