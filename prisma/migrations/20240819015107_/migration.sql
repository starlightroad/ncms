/*
  Warnings:

  - The `latitude` column on the `location` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `longitude` column on the `location` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "location" DROP COLUMN "latitude",
ADD COLUMN     "latitude" DECIMAL(9,6),
DROP COLUMN "longitude",
ADD COLUMN     "longitude" DECIMAL(9,6);
