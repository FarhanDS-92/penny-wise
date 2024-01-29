"use client";

import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function AddCapital({ budgetId, user }) {
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
      <button
        aria-label="Add new capital"
        id={user.isDarkMode ? "button-dark" : "button-light"}
        onClick={handleAddCapital}
      >
        Add New Capital
      </button>
      <div style={{ display: addCapital ? "block" : "none" }}>
        <form
          aria-label="new capital form"
          className="addNewForm"
          onSubmit={handleSubmitCapital}
        >
          <input
            aria-label="Capital name"
            type="text"
            required
            placeholder="Name"
            value={capitalName}
            onChange={(e) => setCapitalName(e.target.value)}
          />

          <input
            aria-label="Capital amount"
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
