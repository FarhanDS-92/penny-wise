import { prisma } from "@/lib/prisma.js";

export default async function expenseDetails({ params }) {
  const { budgetId } = params;
  let totalExpense = 0;

  const expenses = await prisma.expense.findMany({
    where: {
      budgetId,
    },
  });

  for (let i = 0; i < expenses.length; i++) {
    totalExpense += expenses[i].cost;
  }

  return (
    <>
      <p>EXPENSES ${totalExpense}</p>
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
