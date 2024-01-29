"use client";

import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function AddExpense({ budgetId, categories, user }) {
  const [addExpense, setAddExpense] = useState(false);
  const [addCategory, setAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [category, setCategory] = useState("");
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [error, setError] = useState("");
  const [errorCategory, setErrorCategory] = useState("");

  const router = useRouter();

  function handleAddExpense() {
    setAddExpense(!addExpense);
    setCategory("");
    setExpenseName("");
    setExpenseAmount("");
    setError("");
  }

  async function handleSubmitExpense(e) {
    e.preventDefault();

    const res = await fetch("/api/expenses", {
      method: "POST",
      body: JSON.stringify({
        name: expenseName,
        cost: +expenseAmount,
        categoryId: category,
        budgetId,
      }),
    });

    const data = await res.json();

    if (data.error) {
      return setError(data.error);
    }

    setCategory("");
    setExpenseName("");
    setExpenseAmount("");
    setError("");

    router.refresh();
  }

  function handleAddCategory() {
    setAddCategory(!addCategory);
    setNewCategory("");
    setErrorCategory("");
  }

  async function handleSubmitCategory(e) {
    e.preventDefault();

    const res = await fetch("/api/categories", {
      method: "POST",
      body: JSON.stringify({
        name: newCategory,
        budgetId,
      }),
    });

    const data = await res.json();

    if (data.error) {
      return setErrorCategory(data.error);
    }

    setAddCategory(false);
    setNewCategory("");
    setErrorCategory("");
    router.refresh();
  }

  return (
    <div>
      <button
        aria-label="Add new expense"
        id={user.isDarkMode ? "button-dark" : "button-light"}
        onClick={handleAddExpense}
      >
        Add New Expense
      </button>

      <div id="newExpense" style={{ display: addExpense ? "block" : "none" }}>
        <button
          aria-label="Add new expense category"
          onClick={handleAddCategory}
        >
          Create New Category
        </button>

        <div style={{ display: addCategory ? "block" : "none" }}>
          <form
            name="new category form"
            className="addNewForm"
            onSubmit={handleSubmitCategory}
          >
            <input
              type="text"
              required
              name="category"
              placeholder="Category"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <button type="Submit">Submit</button>
            <p>{errorCategory}</p>
          </form>
        </div>

        <form
          name="new expense form"
          className="addNewForm"
          onSubmit={handleSubmitExpense}
        >
          <select
            required
            aria-label="category drop down menu"
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
            aria-label="expense name"
            type="text"
            required
            placeholder="Name"
            value={expenseName}
            onChange={(e) => setExpenseName(e.target.value)}
          />

          <input
            aria-label="expense amount"
            type="text"
            required
            placeholder="Amount"
            value={expenseAmount}
            onChange={(e) => setExpenseAmount(e.target.value)}
          />

          <button type="Submit">Submit</button>
          <p>{error}</p>
        </form>
      </div>
    </div>
  );
}
