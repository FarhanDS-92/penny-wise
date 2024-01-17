"use client";

import { useState } from "react";
import EditExpense from "./EditExpense.jsx";
import Delete from "./Delete.jsx";

export default function CollapsibleExpenses({ totalExpense, categories }) {
	const [isOpen, setIsOpen] = useState(false);

	function toggleMonthList() {
		setIsOpen(!isOpen);
	}

	return (
		<>
			<div className="monthBreakdown" onClick={toggleMonthList}>
				<div>EXPENSES</div>
				<div>Monthly total: ${totalExpense}</div>
			</div>
			{categories.map((category) => {
				return (
					<div key={category.id}>
						<div className="expenseBreakdown">
							<div className="expenseCategory">
								<p>{category.name}</p>
								<Delete id={category.id} path={"categories"} />
							</div>
							{category.expenses.map((expense) => {
								return <EditExpense expense={expense} key={expense.id} />;
							})}
						</div>
					</div>
				);
			})}
		</>
	);
}