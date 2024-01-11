/*
  Warnings:

  - You are about to drop the column `isActive` on the `Capital` table. All the data in the column will be lost.
  - You are about to drop the column `isReoccuring` on the `Capital` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `isReoccuring` on the `Expense` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Capital" DROP COLUMN "isActive",
DROP COLUMN "isReoccuring";

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "isActive",
DROP COLUMN "isReoccuring";
