import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";

export default async function budget() {
  const user = await fetchUser();

  const capital = await prisma.capital.findMany({
    where: {
      userId: user.userId,
    },
  });

  const expenses = await prisma.expense.findMany({
    where: {
      userId: user.id,
    },
  });

  function totalCapital(capital) {
    let totalCash = 0;

    for (let i = 0; i < capital.length; i++) {
      totalCash += capital[i].amount;
    }

    return totalCash;
  }

  function totalExpenses(expenses) {
    let totalExpense = 0;

    for (let i = 0; i < capital.length; i++) {
      totalExpense += capital[i].amount;
    }

    return totalExpense;
  }

  return (
    <section>
      <Link href={"/capital"}>
        <div id="totalCapital">
          <h2>Cash Flow</h2>
          <p>{totalCapital(capital)}</p>
        </div>
      </Link>

      <Link href={"/expense"}>
        <div id="totalExpense">
          <h2>Expenses</h2>
          <p>{totalExpenses(expenses)}</p>
        </div>
      </Link>

      <div id="budgetAllocation">
        <p>{totalCapital(capital) - totalExpenses(expenses)}</p>
      </div>
    </section>
  );
}
