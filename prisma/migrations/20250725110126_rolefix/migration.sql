/*
  Warnings:

  - Made the column `role` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "currentLat" DOUBLE PRECISION,
ADD COLUMN     "currentLng" DOUBLE PRECISION,
ALTER COLUMN "role" SET NOT NULL;
