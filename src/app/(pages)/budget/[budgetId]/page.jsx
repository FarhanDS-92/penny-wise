import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";
import { fetchUser } from "@/lib/fetchUser.js";
import AddExpense from "@/app/components/AddExpense.jsx";
import AddCapital from "@/app/components/AddCapital.jsx";
import AddGoal from "@/app/components/AddGoal.jsx";
import CollapsibleExpenses from "@/app/components/CollapsibleExpenses.jsx";
import CollapsibleCapital from "@/app/components/CollapsibleCapital.jsx";
import CollapsibleGoal from "@/app/components/CollapsibleGoal.jsx";

export default async function budgetDetails({ params }) {
  const { budgetId } = params;
  const user = await fetchUser();

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let totalExpense = 0;
  let totalCapital = 0;
  let totalGoals = 0;
  let goalToDate = 0;

  const budget = await prisma.budget.findFirst({
    where: {
      id: budgetId,
    },
  });

  const categories = await prisma.category.findMany({
    where: {
      budgetId,
    },
    include: {
      expenses: true,
    },
  });

  const expenses = await prisma.expense.findMany({
    where: {
      budgetId,
    },
  });

  const goals = await prisma.goal.findMany({
    where: {
      budgetId,
    },
  });

  const capital = await prisma.capital.findMany({
    where: {
      budgetId,
    },
  });

  for (let i = 0; i < expenses.length; i++) {
    totalExpense += expenses[i].cost;
  }

  for (let i = 0; i < capital.length; i++) {
    totalCapital += capital[i].amount;
  }

  for (let i = 0; i < goals.length; i++) {
    totalGoals += goals[i].cost;
  }

  for (let i = 0; i < goals.length; i++) {
    goalToDate += goals[i].allocated;
  }

  if (!budget) {
    return <div></div>;
  }

  return (
    <section className="monthPage">
      <title>Budget Breakdown</title>
      <div className={user.isDarkMode ? "monthOverview-dark" : "monthOverview"}>
        <div className={user.isDarkMode ? "monthYear-dark" : "monthYear"}>
          <h1>{months[budget.month - 1]}</h1>
          <h1>{budget.year}</h1>
        </div>
        <CollapsibleExpenses
          user={user}
          totalExpense={totalExpense}
          categories={categories}
        />
        <CollapsibleCapital
          user={user}
          capital={capital}
          totalCapital={totalCapital}
        />
        <CollapsibleGoal
          user={user}
          goals={goals}
          goalToDate={goalToDate}
          totalGoals={totalGoals}
        />
      </div>
      <div id="budgetIdButtons">
        <div id="addNewButtons">
          <AddExpense budgetId={budgetId} categories={categories} user={user} />
          <AddCapital budgetId={budgetId} user={user} />
          <AddGoal budgetId={budgetId} user={user} />
        </div>

        <Link href={`/budget`}>
          <button
            aria-label="Return to budget overview"
            id={user.isDarkMode ? "button-dark" : "button-light"}
          >
            Budget Overview
          </button>
        </Link>
      </div>
    </section>
  );
}
