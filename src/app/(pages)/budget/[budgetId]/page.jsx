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
    <>
      <p>
        {months[budget.month - 1]} {budget.year}
      </p>
      <Link key={1} href={`/budget/${budget.id}/expense`}>
        <p>Expenses ${totalExpense}</p>
      </Link>
      <Link key={1} href={`/budget/${budget.id}/capital`}>
        <p>Capital ${totalCapital}</p>
      </Link>
      <Link key={1} href={`/budget/${budget.id}/goal`}>
        <p>
          Goals ${goalToDate}/${totalGoals}
        </p>
      </Link>
    </>
  );
}
