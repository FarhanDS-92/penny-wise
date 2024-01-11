/*
  Warnings:

  - You are about to drop the column `month` on the `Capital` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Capital` table. All the data in the column will be lost.
  - You are about to drop the column `budget` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `month` on the `Expense` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Expense` table. All the data in the column will be lost.
  - Added the required column `budgetId` to the `Capital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `budgetId` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `limit` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `budgetId` to the `Expense` table without a default value. This is not possible if the table is not empty.
  - Made the column `categoryId` on table `Expense` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `budgetId` to the `Goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Capital" DROP COLUMN "month",
DROP COLUMN "year",
ADD COLUMN     "budgetId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "budget",
ADD COLUMN     "budgetId" TEXT NOT NULL,
ADD COLUMN     "limit" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Expense" DROP COLUMN "month",
DROP COLUMN "year",
ADD COLUMN     "budgetId" TEXT NOT NULL,
ALTER COLUMN "categoryId" SET NOT NULL;

-- AlterTable
ALTER TABLE "Goal" ADD COLUMN     "budgetId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Budget" (
    "id" TEXT NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Budget" ADD CONSTRAINT "Budget_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Expense" ADD CONSTRAINT "Expense_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Capital" ADD CONSTRAINT "Capital_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Goal" ADD CONSTRAINT "Goal_budgetId_fkey" FOREIGN KEY ("budgetId") REFERENCES "Budget"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
