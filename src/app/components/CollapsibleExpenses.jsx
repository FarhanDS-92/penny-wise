"use client";

import { useState } from "react";
import EditExpense from "./EditExpense.jsx";
import Delete from "./Delete.jsx";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

export default function CollapsibleExpenses({
  totalExpense,
  categories,
  user,
}) {
  const [isOpen, setIsOpen] = useState(false);

  function toggleMonthList() {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <div
        className={user.isDarkMode ? "monthBreakdown-dark" : "monthBreakdown"}
        onClick={toggleMonthList}
      >
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
            <div
              className={
                user.isDarkMode ? "expenseBreakdown-dark" : "expenseBreakdown"
              }
            >
              <div
                className={
                  user.isDarkMode ? "expenseCategory-dark" : "expenseCategory"
                }
              >
                <p>{category.name}</p>
                <Delete id={category.id} path={"categories"} />
              </div>
              {category.expenses.map((expense) => {
                return (
                  <EditExpense user={user} expense={expense} key={expense.id} />
                );
              })}
            </div>
          </div>
        );
      })}
    </>
  );
}
