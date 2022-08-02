/*
  Warnings:

  - You are about to drop the column `geoRange` on the `Animals` table. All the data in the column will be lost.
  - You are about to drop the column `latinName` on the `Animals` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Animals` table. All the data in the column will be lost.
  - Added the required column `animal_type` to the `Animals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `geo_range` to the `Animals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image_link` to the `Animals` table without a default value. This is not possible if the table is not empty.
  - Added the required column `latin_name` to the `Animals` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Animals" DROP CONSTRAINT "Animals_habitat_id_fkey";

-- AlterTable
ALTER TABLE "Animals" DROP COLUMN "geoRange",
DROP COLUMN "latinName",
DROP COLUMN "type",
ADD COLUMN     "animal_type" VARCHAR(255) NOT NULL,
ADD COLUMN     "geo_range" VARCHAR(255) NOT NULL,
ADD COLUMN     "image_link" VARCHAR(255) NOT NULL,
ADD COLUMN     "latin_name" VARCHAR(255) NOT NULL,
ALTER COLUMN "habitat_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Animals" ADD CONSTRAINT "Animals_habitat_id_fkey" FOREIGN KEY ("habitat_id") REFERENCES "Habitats"("id") ON DELETE SET NULL ON UPDATE CASCADE;
