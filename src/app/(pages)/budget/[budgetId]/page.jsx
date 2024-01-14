import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";

export default async function budgetDetails({ params }) {
  const { budgetId } = params;

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

  return (
    <div className="monthPage">
      <div className="monthOverview">
        <div className="monthYear">
          <h1>{months[budget.month - 1]}</h1>
          <h1>{budget.year}</h1>
        </div>
        <Link className="monthBreakdown" href={`/budget/${budget.id}/expense`}>
          <div>Expenses</div>
          <div>${totalExpense}</div>
        </Link>
        <Link className="monthBreakdown" href={`/budget/${budget.id}/capital`}>
          <div>Capital </div>
          <div>${totalCapital}</div>
        </Link>
        <Link className="monthBreakdown" href={`/budget/${budget.id}/goal`}>
          <div>Goals</div>
          <div>
            ${goalToDate}/${totalGoals}
          </div>
        </Link>
      </div>
      <Link className="budgetButton" href={`/budget`}>
        <button>Budget Overview</button>
      </Link>
    </div>
  );
}
