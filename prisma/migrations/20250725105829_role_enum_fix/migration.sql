/*
  Warnings:

  - Changed the type of `role` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
-- Step 1: Add a temporary column with the Role enum
ALTER TABLE "User" ADD COLUMN "role_temp" "Role";

-- Step 2: Copy existing values from string column to enum column
UPDATE "User" SET "role_temp" = "role"::"Role";

-- Step 3: Drop the old string column
ALTER TABLE "User" DROP COLUMN "role";

-- Step 4: Rename the new column
ALTER TABLE "User" RENAME COLUMN "role_temp" TO "role";
