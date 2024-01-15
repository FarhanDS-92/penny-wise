/*
  Warnings:

  - You are about to drop the column `month` on the `Goal` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Goal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "month",
DROP COLUMN "year";
