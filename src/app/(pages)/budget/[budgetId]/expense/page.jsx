import { prisma } from "@/lib/prisma.js";

export default async function expenseDetails({ params }) {
  const { budgetId } = params;

  const expenses = await prisma.expense.findMany({
    where: {
      budgetId,
    },
  });

  return (
    <>
      <p>EXPENSES</p>
      {expenses.map((expense) => {
        return (
          <div key={expense.id}>
            <p>
              {expense.name} ${expense.cost}
            </p>
            <p>{expense.description}</p>
          </div>
        );
      })}
    </>
  );
}
