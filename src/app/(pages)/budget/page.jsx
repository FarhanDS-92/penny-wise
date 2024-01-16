import BudgetLink from "@/app/components/BudgetLink.jsx";
import { fetchUser } from "@/lib/fetchUser.js";
import { prisma } from "@/lib/prisma.js";
import Link from "next/link.js";
import CreateBudget from "@/app/components/CreateBudget.jsx";
export default async function budget() {
	const user = await fetchUser();
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

		return totalExpense;
	}

	return (
		<div>
			<CreateBudget />
			<section className="budget-section">
				{separatedArrays.map((budgetYear) => {
					return (
						<div key={budgetYear[0].year}>
							<div className="budgetYear">
								<h2>{budgetYear[0].year}</h2>
								<h2>Yearly Expense: ${yearlyExpense(budgetYear)}</h2>
							</div>
							<div className="monthList">
								{budgetYear.map((budgetMonth) => {
									return (
										<Link
											key={budgetMonth.id}
											href={`/budget/${budgetMonth.id}`}>
											<BudgetLink budget={budgetMonth} />
										</Link>
									);
								})}
							</div>
						</div>
					);
				})}
			</section>
		</div>
	);
}
