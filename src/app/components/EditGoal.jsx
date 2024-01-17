"use client";

import { useRouter } from "next/navigation.js";
import { useState } from "react";
import Delete from "./Delete.jsx";
import TotalSaved from "./GoalTotalSaved.jsx";

export default function EditGoal({ goal }) {
  const [name, setName] = useState(goal.name);
  const [cost, setCost] = useState(goal.cost);
  const [allocated, setAllocated] = useState(goal.allocated);
  const [error, setError] = useState("");
  const [edit, setEdit] = useState(false);

  const router = useRouter();

  function handleEdit() {
    setEdit(!edit);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`/api/goals/${goal.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        cost: +cost,
        allocated: +allocated,
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
        <div className="budgetItem" key={goal.id}>
          <div>
            <p>{goal.name}</p>
          </div>
          <div className="goalAmount">
            <TotalSaved goal={goal} />
            <p>
              ${goal.allocated}/${goal.cost}
            </p>
            <button className="edit-deleteButton" onClick={handleEdit}>
              Edit
            </button>
            <Delete id={goal.id} path={"goals"} />
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
              value={allocated}
              onChange={(e) => {
                setAllocated(e.target.value);
              }}
            />

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
            <Delete id={goal.id} path={"goals"} />
          </div>
        </form>
      )}
    </>
  );
}
