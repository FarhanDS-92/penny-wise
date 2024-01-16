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

          <div>
            <p>${expense.cost}</p>
            <button onClick={handleEdit}>Edit</button>
            <Delete id={expense.id} path={"expenses"} />
          </div>
        </div>
      ) : (
        <form className="budgetItem" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <p>{error}</p>
          <div>
            <input
              type="text"
              value={cost}
              onChange={(e) => {
                setCost(e.target.value);
              }}
            />

            <button type="submit">Submit</button>
            <button type="button" onClick={handleEdit}>
              Cancel
            </button>
            <Delete id={expense.id} path={"expenses"} />
          </div>
        </form>
      )}
    </>
  );
}
