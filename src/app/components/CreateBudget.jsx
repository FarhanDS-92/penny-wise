"use client";
import { useRouter } from "next/navigation.js";
import { useState } from "react";

export default function CreateBudget() {
  const [isCreate, setIsCreate] = useState(false);
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleCreateBudget = () => {
    setIsCreate(!isCreate);
  };

  async function handleSubmitBudget(e) {
    e.preventDefault();
    const response = await fetch("/api/budget", {
      method: "POST",
      body: JSON.stringify({
        month: +month,
        year: +year,
      }),
    });
    const data = await response.json();
    if (data.error) {
      setError(data.error);
      router.refresh();
    } else {
      setMonth("");
      setYear("");
      setIsCreate(false);
      router.refresh();
    }
    router.push("/budget");
    router.refresh();
  }
  function handleCancel() {
    setMonth("");
    setYear("");
    setIsCreate(false);
    router.refresh();
  }
  return (
    <div className="center-container">
      <button
        onClick={handleCreateBudget}
        style={{
          display: !isCreate ? "block" : "none",
        }}
      >
        Create Budget
      </button>
      {isCreate && (
        <div className="popup-create-budget">
          <form onSubmit={handleSubmitBudget}>
            <label>
              Month:
              <input
                className="							month-year-input"
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value)}
              />
            </label>
            <label>
              Year:
              <input
                className="							month-year-input"
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              />
            </label>

            <span className="submit-cancel-btn">
              <button type="submit">Submit</button>
              <button type="button" onClick={handleCancel}>
                Cancel
              </button>
            </span>
            <p className="error-login">{error}</p>
          </form>
        </div>
      )}
    </div>
  );
}
