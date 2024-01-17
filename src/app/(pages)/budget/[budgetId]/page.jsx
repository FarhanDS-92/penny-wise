import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";
import NewExpense from "@/app/components/AddExpense.jsx";
import NewCapital from "@/app/components/AddCapital.jsx";
import NewGoal from "@/app/components/AddGoal.jsx";
import EditExpense from "@/app/components/EditExpense.jsx";
import CollapsibleCapital from "@/app/components/CollapsibleCapital.jsx";
import CollapsibleGoal from "@/app/components/CollapsibleGoal.jsx";


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
    <div className="monthPage">
      <div className="monthOverview">
        <div className="monthYear">
          <h1>{months[budget.month - 1]}</h1>
          <h1>{budget.year}</h1>
        </div>
        <div className="monthBreakdown">
          <div>EXPENSES</div>
          <div>Monthly total: ${totalExpense}</div>
        </div>
        {categories.map((category) => {
          return (
            <div className="expenseBreakdown">
              <div className="expenseCategory">
                <p>{category.name}</p>
                <Delete id={category.id} path={"categories"} />
              </div>
              {category.expenses.map((expense) => {
                return <EditExpense expense={expense} key={expense.id} />;
              })}
            </div>
          );
        })}
        <CollapsibleCapital capital={capital} totalCapital={totalCapital} />
        <CollapsibleGoal
          goals={goals}
          goalToDate={goalToDate}
          totalGoals={totalGoals}
        />
      </div>
      <div id="budgetIdButtons">
        <div id="addNewButtons">
          <NewExpense budgetId={budgetId} categories={categories} />
          <NewCapital budgetId={budgetId} />
          <NewGoal budgetId={budgetId} />
        </div>
        <Link href={`/budget`}>
          <button>Budget Overview</button>
        </Link>
      </div>
    </div>
  );
  1;
}
