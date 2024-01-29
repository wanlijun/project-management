/*
  Warnings:

  - You are about to drop the column `plantformId` on the `FrontEndInfo` table. All the data in the column will be lost.
  - You are about to drop the `Account` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Plantform` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[platformId]` on the table `FrontEndInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `platformId` to the `FrontEndInfo` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Account" DROP CONSTRAINT "Account_plantformId_fkey";

-- DropForeignKey
ALTER TABLE "FrontEndInfo" DROP CONSTRAINT "FrontEndInfo_plantformId_fkey";

-- DropForeignKey
ALTER TABLE "Plantform" DROP CONSTRAINT "Plantform_projectId_fkey";

-- DropIndex
DROP INDEX "FrontEndInfo_plantformId_key";

-- AlterTable
ALTER TABLE "FrontEndInfo" DROP COLUMN "plantformId",
ADD COLUMN     "platformId" INTEGER NOT NULL,
ALTER COLUMN "gitUrl" DROP NOT NULL,
ALTER COLUMN "deploy" DROP NOT NULL,
ALTER COLUMN "notes" DROP NOT NULL;

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Plantform";

-- CreateTable
CREATE TABLE "Platform" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "account" TEXT[],

    CONSTRAINT "Platform_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FrontEndInfo_platformId_key" ON "FrontEndInfo"("platformId");

-- AddForeignKey
ALTER TABLE "Platform" ADD CONSTRAINT "Platform_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FrontEndInfo" ADD CONSTRAINT "FrontEndInfo_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
