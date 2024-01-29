/*
  Warnings:

  - You are about to drop the column `account` on the `Platform` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Platform` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Platform" DROP COLUMN "account",
DROP COLUMN "url";

-- CreateTable
CREATE TABLE "Enviroment" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "account" TEXT[],
    "url" TEXT NOT NULL,
    "platformId" INTEGER NOT NULL,

    CONSTRAINT "Enviroment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Enviroment" ADD CONSTRAINT "Enviroment_platformId_fkey" FOREIGN KEY ("platformId") REFERENCES "Platform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
