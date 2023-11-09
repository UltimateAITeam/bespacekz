/*
  Warnings:

  - You are about to drop the column `first_name` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('FREELANCER', 'CLIENT');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "first_name",
ADD COLUMN     "name" TEXT,
ADD COLUMN     "role" "Role";
