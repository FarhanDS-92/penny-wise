"use client";

import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function NewGoal({ budgetId }) {
  const [addGoal, setAddGoal] = useState(false);
  const [goalName, setGoalName] = useState("");
  const [goalAmount, setGoalAmount] = useState("");

  const [error, setError] = useState("");

  const router = useRouter();

  function handleAddGoal() {
    setAddGoal(!addGoal);
    setGoalName("");
    setGoalAmount("");
    setError("");
  }

  async function handleSubmitGoal(e) {
    e.preventDefault();

    const res = await fetch("/api/goals", {
      method: "POST",
      body: JSON.stringify({
        name: goalName,
        cost: +goalAmount,
        allocated: 0,
        budgetId,
      }),
    });

    const data = await res.json();

    if (data.error) {
      return setError(data.error);
    }

    setGoalName("");
    setGoalAmount("");
    setError("");

    router.refresh();
  }

  return (
    <div>
      <button onClick={handleAddGoal}>Add New Goal</button>
      <div style={{ display: addGoal ? "block" : "none" }}>
        <form className="addNewForm" onSubmit={handleSubmitGoal}>
          <input
            type="text"
            required
            placeholder="Name"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
          />

          <input
            type="text"
            required
            placeholder="Amount"
            value={goalAmount}
            onChange={(e) => setGoalAmount(e.target.value)}
          />

          <button type="Submit">Submit</button>
          <p>{error}</p>
        </form>
      </div>
    </div>
  );
}
