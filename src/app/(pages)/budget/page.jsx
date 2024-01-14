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
}
