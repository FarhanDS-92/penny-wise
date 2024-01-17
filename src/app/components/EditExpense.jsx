"use client";

import { useRouter } from "next/navigation.js";
import { useState } from "react";
import Delete from "./Delete.jsx";

export default function EditExpense({ expense }) {
  const [name, setName] = useState(expense.name);
  const [cost, setCost] = useState(expense.cost);
  const [error, setError] = useState("");
  const [edit, setEdit] = useState(false);

  const router = useRouter();

  function handleEdit() {
    setEdit(!edit);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`/api/expenses/${expense.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        cost: +cost,
      }),
    });

    const data = await res.json();

    if (data.error) {
      setError(data.error);
    }
    setEdit(false);
    setError("");
    router.refresh();
  }

  return (
    <>
      {!edit ? (
        <div className="budgetItem">
          <p>{expense.name}</p>

          <div id="edit-deleteBox">
            <p>${expense.cost}</p>
            <button className="edit-deleteButton" onClick={handleEdit}>
              Edit
            </button>
            <Delete id={expense.id} path={"expenses"} />
          </div>
        </div>
      ) : (
        <form className="budgetForm" onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <p>{error}</p>
          <div className="formBox">
            <input
              type="text"
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
              }}
            />

            <button className="edit-deleteButton" type="submit">
              Submit
            </button>
            <button
              className="edit-deleteButton"
              type="button"
              onClick={handleEdit}
            >
              Cancel
            </button>
            <Delete id={expense.id} path={"expenses"} />
          </div>
        </form>
      )}
    </>
  );
}
