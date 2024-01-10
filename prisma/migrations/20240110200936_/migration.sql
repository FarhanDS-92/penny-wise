/*
  Warnings:

  - You are about to drop the column `completeBy` on the `Goal` table. All the data in the column will be lost.
  - Added the required column `isActive` to the `Capital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isReoccuring` to the `Capital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Capital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Capital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `budget` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isReoccuring` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Added the required column `allocated` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isActive` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `month` to the `Goal` table without a default value. This is not possible if the table is not empty.
  - Added the required column `year` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Capital" ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "isReoccuring" BOOLEAN NOT NULL,
ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "budget" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Expense" ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "isReoccuring" BOOLEAN NOT NULL,
ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Goal" DROP COLUMN "completeBy",
ADD COLUMN     "allocated" INTEGER NOT NULL,
ADD COLUMN     "isActive" BOOLEAN NOT NULL,
ADD COLUMN     "month" INTEGER NOT NULL,
ADD COLUMN     "year" INTEGER NOT NULL;
