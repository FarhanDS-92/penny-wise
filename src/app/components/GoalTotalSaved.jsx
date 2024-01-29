"use client";

import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function TotalSaved({ goal }) {
  const [addGoal, setAddGoal] = useState(false);
  const [goalAmount, setGoalAmount] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  function handleAddGoal() {
    setAddGoal(!addGoal);
    setGoalAmount("");
    setError("");
  }

  async function handleSubmitFunds(e) {
    e.preventDefault();

    if (goal.allocated >= goal.cost) {
      setError("You've reached your goal total.");
      return;
    }

    if (+goalAmount <= 0) {
      setError("You're funds must be a positive number.");
      return;
    }

    let fundTotal = goal.allocated + Number(goalAmount);

    const res = await fetch(`/api/goals/${goal.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name: goal.name,
        cost: goal.cost,
        allocated: fundTotal,
      }),
    });

    const data = await res.json();

    if (data.error) {
      return setError(data.error);
    }
    setAddGoal(!addGoal);
    setGoalAmount("");
    setError("");

    router.refresh();
  }

  return (
    <div>
      <button
        aria-label="Add funds to goal"
        className="goalButton"
        style={{ display: !addGoal ? "block" : "none" }}
        onClick={handleAddGoal}
      >
        +
      </button>
      <div style={{ display: addGoal ? "block" : "none" }}>
        <form id="addFunds" onSubmit={handleSubmitFunds}>
          <input
            aria-label="Amount being added towards goal"
            type="text"
            required
            placeholder="Amount"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
          />

          <button className="edit-deleteButton" type="Submit">
            Submit
          </button>
          <button
            className="edit-deleteButton"
            onClick={handleAddGoal}
            type="button"
          >
            Cancel
          </button>
          <p>{error}</p>
        </form>
      </div>
    </div>
  );
}
