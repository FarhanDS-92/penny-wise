import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";
import NewExpense from "@/app/components/AddExpense.jsx";
import NewCapital from "@/app/components/AddCapital.jsx";
import NewGoal from "@/app/components/AddGoal.jsx";
import TotalSaved from "@/app/components/GoalTotalSaved.jsx";

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
              <p className="expenseCategory">{category.name}</p>
              {category.expenses.map((expense) => {
                return (
                  <div className="expense" key={expense.id}>
                    <p>{expense.name}</p>
                    <p>${expense.cost}</p>
                  </div>
                );
              })}
            </div>
          );
        })}
        <div className="monthBreakdown">
          <div>CAPITAL</div>
          <div>Monthly total: ${totalCapital}</div>
        </div>
        {capital.map((capital) => {
          return (
            <div className="capital" key={capital.id}>
              <p>{capital.name}</p>
              <p>${capital.amount}</p>
            </div>
          );
        })}
        <div className="monthBreakdown">
          <div>GOALS</div>
          <div>
            Monthly total: ${goalToDate}/${totalGoals}
          </div>
        </div>
        {goals.map((goal) => {
          return (
            <div className="goal" key={goal.id}>
              <div>
                <p>{goal.name}</p>
              </div>
              <div className="goalAmount">
                <TotalSaved goal={goal} />
                <p>
                  ${goal.allocated}/${goal.cost}
                </p>
              </div>
            </div>
          );
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
