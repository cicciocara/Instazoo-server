/*
  Warnings:

  - The primary key for the `Preferred` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Preferred" DROP CONSTRAINT "Preferred_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Preferred_pkey" PRIMARY KEY ("id");
