-- AlterTable
ALTER TABLE "users" ALTER COLUMN "roleId" SET DEFAULT 1;

-- CreateTable
CREATE TABLE "projects" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),
    "operatorId" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "brief" TEXT,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plantform" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3),
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "projectId" INTEGER NOT NULL,
    "accountId" INTEGER NOT NULL,

    CONSTRAINT "Plantform_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "usernamep" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "plantformId" INTEGER NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FrontEndInfo" (
    "id" SERIAL NOT NULL,
    "gitUrl" TEXT NOT NULL,
    "deploy" TEXT NOT NULL,
    "notes" TEXT NOT NULL,
    "plantformId" INTEGER NOT NULL,

    CONSTRAINT "FrontEndInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FrontEndInfo_plantformId_key" ON "FrontEndInfo"("plantformId");

-- AddForeignKey
ALTER TABLE "projects" ADD CONSTRAINT "projects_operatorId_fkey" FOREIGN KEY ("operatorId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plantform" ADD CONSTRAINT "Plantform_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_plantformId_fkey" FOREIGN KEY ("plantformId") REFERENCES "Plantform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FrontEndInfo" ADD CONSTRAINT "FrontEndInfo_plantformId_fkey" FOREIGN KEY ("plantformId") REFERENCES "Plantform"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
