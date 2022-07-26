/*
  Warnings:

  - Added the required column `age` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "age" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "Animals" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "latinName" VARCHAR(255) NOT NULL,
    "geoRange" VARCHAR(255) NOT NULL,
    "type" VARCHAR(255) NOT NULL,
    "diet" VARCHAR(255) NOT NULL,
    "cretetedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Animals_pkey" PRIMARY KEY ("id")
);
