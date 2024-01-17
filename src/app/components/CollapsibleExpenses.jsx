"use client";

import { useState } from "react";
import EditExpense from "./EditExpense.jsx";
import Delete from "./Delete.jsx";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export default function CollapsibleExpenses({ totalExpense, categories }) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMonthList() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div className="monthBreakdown" onClick={toggleMonthList}>
        <div>EXPENSES</div>
        <div>
          Monthly total: ${totalExpense}{" "}
          {isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}
        </div>
      </div>
      {categories.map((category) => {
        return (
          <div
            key={category.id}
            className={`monthList ${!isOpen ? "open" : ""}`}
          >
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
