/*
  Warnings:

  - You are about to drop the column `description` on the `Capital` table. All the data in the column will be lost.
  - You are about to drop the column `limit` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Goal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Capital" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "limit";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "description";

-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "description";
