/*
  Warnings:

  - Made the column `habitat_id` on table `Animals` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Animals" DROP CONSTRAINT "Animals_habitat_id_fkey";

-- AlterTable
ALTER TABLE "Animals" ALTER COLUMN "habitat_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Animals" ADD CONSTRAINT "Animals_habitat_id_fkey" FOREIGN KEY ("habitat_id") REFERENCES "Habitats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
