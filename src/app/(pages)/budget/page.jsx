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

    for (let i = 0; i < expenses.length; i++) {
      totalExpense += expenses[i].cost;
    }

    return totalExpense;
  }

  const isSurplus = totalCapital(capital) - totalExpenses(expenses);

  function checkSurplus(isSurplus) {
    if (isSurplus >= 0) {
      return true;
    }
    return false;
  }

  return (
    <section>
      <Link href={"/capital"}>
        <div id="totalCapital">
          <h2>Capital</h2>
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
        <h2>{checkSurplus(isSurplus) ? "Surplus" : "Deficit"}</h2>
        <p>{isSurplus}</p>
      </div>
    </section>
  );
}
