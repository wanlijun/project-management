/*
  Warnings:

  - You are about to drop the column `account` on the `Environment` table. All the data in the column will be lost.
  - You are about to drop the column `platformId` on the `Environment` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Environment` table. All the data in the column will be lost.
  - You are about to drop the column `platformId` on the `FrontEndInfo` table. All the data in the column will be lost.
  - The `gitUrl` column on the `FrontEndInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `deploy` column on the `FrontEndInfo` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[projectId]` on the table `FrontEndInfo` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `projectId` to the `FrontEndInfo` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roleId` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Environment" DROP CONSTRAINT "Environment_platformId_fkey";

-- DropForeignKey
ALTER TABLE "FrontEndInfo" DROP CONSTRAINT "FrontEndInfo_platformId_fkey";

-- DropForeignKey
ALTER TABLE "Platform" DROP CONSTRAINT "Platform_projectId_fkey";

-- DropIndex
DROP INDEX "FrontEndInfo_platformId_key";

-- AlterTable
ALTER TABLE "Environment" DROP COLUMN "account",
DROP COLUMN "platformId",
DROP COLUMN "url",
ADD COLUMN     "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "projectId" INTEGER,
ADD COLUMN     "updateAt" TIMESTAMP(3);

-- AlterTable
ALTER TABLE "FrontEndInfo" DROP COLUMN "platformId",
ADD COLUMN     "gitGroupUrl" TEXT,
ADD COLUMN     "projectId" INTEGER NOT NULL,
DROP COLUMN "gitUrl",
ADD COLUMN     "gitUrl" JSONB,
DROP COLUMN "deploy",
ADD COLUMN     "deploy" JSONB;

-- AlterTable
ALTER TABLE "Platform" ALTER COLUMN "projectId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "projects" ADD COLUMN     "environmentIds" INTEGER[],
ADD COLUMN     "platformIds" INTEGER[];

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "roleId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),
    "projectId" INTEGER NOT NULL,
    "environmentId" INTEGER NOT NULL,
    "platformId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "account" TEXT[],

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BackEndInfo" (
    "id" SERIAL NOT NULL,
    "gitGroupUrl" TEXT,
    "gitUrl" JSONB,
    "deploy" JSONB,
    "notes" TEXT,
    "projectId" INTEGER NOT NULL,

    CONSTRAINT "BackEndInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BackEndInfo_projectId_key" ON "BackEndInfo"("projectId");

-- CreateIndex
CREATE UNIQUE INDEX "FrontEndInfo_projectId_key" ON "FrontEndInfo"("projectId");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FrontEndInfo" ADD CONSTRAINT "FrontEndInfo_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BackEndInfo" ADD CONSTRAINT "BackEndInfo_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
