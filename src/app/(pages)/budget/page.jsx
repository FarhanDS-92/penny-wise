import BudgetLink from "@/app/components/BudgetLink.jsx";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";

export default async function budget() {
	const user = await fetchUser();

<<<<<<< HEAD
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
=======
  const budgets = await prisma.budget.findMany({
    where: {
      userId: user.id,
    },
    include: {
      expenses: true,
    },
    orderBy: [
      {
        year: "asc",
      },
      {
        month: "asc",
      },
    ],
  });

  // this separates the budget array to be split by years and group them ot its own array
  const separatedArrays = [];
  budgets.forEach((obj) => {
    const year = obj.year;

    const index = separatedArrays.findIndex((arr) => arr[0].year === year);

    if (index === -1) {
      separatedArrays.push([obj]);
    } else {
      separatedArrays[index].push(obj);
    }
  });

  // console.log(separatedArrays[0]);

  function yearlyExpense(budgetYear) {
    let totalExpense = 0;

    for (let i = 0; i < budgetYear.length; i++) {
      for (let j = 0; j < budgetYear[i].expenses.length; j++) {
        totalExpense += budgetYear[i].expenses[j].cost;
      }
    }
>>>>>>> f453ce90d1a213d5ee8f42d8419701033f640f28

		return totalExpense;
	}

<<<<<<< HEAD
	const isSurplus = totalCapital(capital) - totalExpenses(expenses);

	function checkSurplus(isSurplus) {
		if (isSurplus >= 0) {
			return true;
		}
		return false;
	}

	return (
		<section className="budget-section">
			<Link href={"/capital"}>
				<div id="totalCapital" className="budget-item">
					<h2>Capital</h2>
					<p>{totalCapital(capital)}</p>
				</div>
			</Link>

			<Link href={"/expense"}>
				<div id="totalExpense" className="budget-item">
					<h2>Expenses</h2>
					<p>{totalExpenses(expenses)}</p>
				</div>
			</Link>

			<div id="budgetAllocation" className="budget-allocation">
				<h2
					style={{
						fontSize: "1.5em",
						color: isSurplus >= 0 ? "#27ae60" : "#c0392b",
					}}>
					{checkSurplus(isSurplus) ? "Surplus" : "Deficit"}
				</h2>
				<p>{isSurplus}</p>
	
			</div>
		</section>
	);
=======
  return (
    <section className="budget-section">
      {separatedArrays.map((budgetYear) => {
        return (
          <div key={budgetYear[0].year}>
            <p>{budgetYear[0].year}</p>
            <p>Yearly Expense: {yearlyExpense(budgetYear)}</p>

            {budgetYear.map((budgetMonth) => {
              return (
                <Link key={budgetMonth.id} href={`/budget/${budgetMonth.id}`}>
                  <BudgetLink budget={budgetMonth} />
                </Link>
              );
            })}
          </div>
        );
      })}
    </section>
  );
>>>>>>> f453ce90d1a213d5ee8f42d8419701033f640f28
}
