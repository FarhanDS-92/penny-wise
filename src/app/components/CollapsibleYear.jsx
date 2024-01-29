"use client";

import { useState } from "react";
import Link from "next/link.js";
import BudgetLink from "./BudgetLink.jsx";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import LineChart from "./LineChart.jsx";

export default function CollapsibleYear({ budgetYear, user }) {
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
      <div
        className={user.isDarkMode ? "budgetYear-dark" : "budgetYear"}
        onClick={toggleMonthList}
      >
        <h2>{budgetYear[0].year}</h2>
        <h3>
          Yearly Expense: ${yearlyExpense(budgetYear)}{" "}
          {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </h3>
      </div>
      <div className={`monthList ${isOpen ? "open" : ""}`}>
        {budgetYear.map((budgetMonth) => (
          <Link key={budgetMonth.id} href={`/budget/${budgetMonth.id}`}>
            <BudgetLink budget={budgetMonth} user={user} />
          </Link>
        ))}
      </div>
    </div>
  );
}
