"use client";

import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function NewCapital({ budgetId }) {
  const [addCapital, setAddCapital] = useState(false);
  const [capitalName, setCapitalName] = useState("");
  const [capitalAmount, setCapitalAmount] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  function handleAddCapital() {
    setAddCapital(!addCapital);
    setCapitalName("");
    setCapitalAmount("");
    setError("");
  }

  async function handleSubmitCapital(e) {
    e.preventDefault();

    const res = await fetch("/api/capital", {
      method: "POST",
      body: JSON.stringify({
        name: capitalName,
        amount: +capitalAmount,
        budgetId,
      }),
    });

    const data = await res.json();

    if (data.error) {
      return setError(data.error);
    }

    setCapitalName("");
    setCapitalAmount("");
    setError("");

    router.refresh();
  }

  return (
    <div>
      <button onClick={handleAddCapital}>Add New Capital</button>
      <div style={{ display: addCapital ? "block" : "none" }}>
        <form className="addNewForm" onSubmit={handleSubmitCapital}>
          <input
            type="text"
            required
            placeholder="Name"
            value={capitalName}
            onChange={(e) => setCapitalName(e.target.value)}
          />

          <input
            type="text"
            required
            placeholder="Amount"
            value={capitalAmount}
            onChange={(e) => setCapitalAmount(e.target.value)}
          />

          <button type="Submit">Submit</button>
          <p>{error}</p>
        </form>
      </div>
    </div>
  );
}
