"use client";

import { useState } from "react";
import Link from "next/link.js";
import BudgetLink from "./BudgetLink.jsx";
export default function CollapsibleYear({ budgetYear }) {
	const [isOpen, setIsOpen] = useState(false);
	const toggleMonthList = () => {
		setIsOpen(!isOpen);
	};
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
			<div className="budgetYear" onClick={toggleMonthList}>
				<h2>{budgetYear[0].year}</h2>
				<h2>Yearly Expense: ${yearlyExpense(budgetYear)}</h2>
			</div>
			<div className={`monthList ${isOpen ? "open" : ""}`}>
				{budgetYear.map((budgetMonth) => (
					<Link key={budgetMonth.id} href={`/budget/${budgetMonth.id}`}>
						<BudgetLink budget={budgetMonth} />
					</Link>
				))}
			</div>
		</div>
	);
}
