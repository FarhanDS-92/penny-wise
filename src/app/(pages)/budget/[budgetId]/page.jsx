import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";
import NewExpense from "@/app/components/AddExpense.jsx";
import NewCapital from "@/app/components/AddCapital.jsx";
import NewGoal from "@/app/components/AddGoal.jsx";
import EditExpense from "@/app/components/EditExpense.jsx";
import EditCapital from "@/app/components/EditCapital.jsx";
import Delete from "@/app/components/Delete.jsx";
import EditGoal from "@/app/components/EditGoal.jsx";

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
              <div>
                <p className="expenseCategory">{category.name}</p>
                <Delete id={category.id} path={"categories"} />
              </div>
              {category.expenses.map((expense) => {
                return <EditExpense expense={expense} key={expense.id} />;
              })}
            </div>
          );
        })}
        <div className="monthBreakdown">
          <div>CAPITAL</div>
          <div>Monthly total: ${totalCapital}</div>
        </div>
        {capital.map((capital) => {
          return <EditCapital capital={capital} key={capital.id} />;
        })}
        <div className="monthBreakdown">
          <div>GOALS</div>
          <div>
            Monthly total: ${goalToDate}/${totalGoals}
          </div>
        </div>
        {goals.map((goal) => {
          return <EditGoal goal={goal} />;
        })}
      </div>
      <Link className="budgetButton" href={`/budget`}>
        <button>Budget Overview</button>
      </Link>

      <NewExpense budgetId={budgetId} categories={categories} />
      <NewCapital budgetId={budgetId} />
      <NewGoal budgetId={budgetId} />
    </div>
  );
  1;
}
