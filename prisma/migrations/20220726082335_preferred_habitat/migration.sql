/*
  Warnings:

  - Added the required column `habitat_id` to the `Animals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Animals" ADD COLUMN     "habitat_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Habitats" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "Habitats_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Preferred" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "animal_id" INTEGER NOT NULL,

    CONSTRAINT "Preferred_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Preferred" ADD CONSTRAINT "Preferred_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Preferred" ADD CONSTRAINT "Preferred_animal_id_fkey" FOREIGN KEY ("animal_id") REFERENCES "Animals"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Animals" ADD CONSTRAINT "Animals_habitat_id_fkey" FOREIGN KEY ("habitat_id") REFERENCES "Habitats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
