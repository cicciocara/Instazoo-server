/*
  Warnings:

  - The primary key for the `Preferred` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Preferred` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Preferred" DROP CONSTRAINT "Preferred_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Preferred_pkey" PRIMARY KEY ("user_id", "animal_id");
