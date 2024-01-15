"use client";

import { useState } from "react";

export default function NewExpense({ budgetId, categories }) {
  const [addExpense, setAddExpense] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [category, setCategory] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");

  function handleAddExpense() {
    setAddExpense(!addExpense);
  }

  async function handleSubmitExpense(e) {
    e.preventDefault();

    const res = await fetch("/api/expenses", {
      method: "POST",
      body: JSON.stringify({
        name: expenseName,
        cost: expenseAmount,
        categoryId: category,
      }),
    });
  }

  return (
    <div>
      <button onClick={handleAddExpense}>Add New Expense</button>

      <div style={{ display: addExpense ? "block" : "none" }}>
        <button>Create New Category</button>

        <form onSubmit={handleSubmitExpense}>
          <select
            required
            name="categories"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">Choose a category</option>

            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          <input
            type="text"
            required
            placeholder="Name"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />

          <input
            type="text"
            required
            placeholder="Amount"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
          />

          <button type="Submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
