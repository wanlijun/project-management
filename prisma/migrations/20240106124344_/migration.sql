/*
  Warnings:

  - You are about to drop the column `operatorId` on the `projects` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Plantform" DROP CONSTRAINT "Plantform_projectId_fkey";

-- DropForeignKey
ALTER TABLE "projects" DROP CONSTRAINT "projects_operatorId_fkey";

-- AlterTable
ALTER TABLE "projects" DROP COLUMN "operatorId",
ALTER COLUMN "shortName" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Plantform" ADD CONSTRAINT "Plantform_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
