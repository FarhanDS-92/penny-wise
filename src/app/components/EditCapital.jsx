"use client";

import { useRouter } from "next/navigation.js";
import { useState } from "react";
import Delete from "./Delete.jsx";

export default function EditCapital({ capital, user }) {
  const [name, setName] = useState(capital.name);
  const [amount, setAmount] = useState(capital.amount);
  const [error, setError] = useState("");
  const [edit, setEdit] = useState(false);

  const router = useRouter();

  function handleEdit() {
    setEdit(!edit);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const res = await fetch(`/api/capital/${capital.id}`, {
      method: "PUT",
      body: JSON.stringify({
        name,
        amount: +amount,
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
        <div className={user.isDarkMode ? "budgetItem-dark" : "budgetItem"}>
          <p>{capital.name}</p>

          <div id="edit-deleteBox">
            <p>${capital.amount}</p>
            <button className="edit-deleteButton" onClick={handleEdit}>
              Edit
            </button>
            <Delete id={capital.id} path={"capital"} />
          </div>
        </div>
      ) : (
        <form className="budgetForm" onSubmit={handleSubmit}>
          <input
            aria-label="Edit capital name"
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />

          <p>{error}</p>
          <div className="formBox">
            <input
              aria-label="Edit capital amount"
              type="text"
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
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
            <Delete id={capital.id} path={"capital"} />
          </div>
        </form>
      )}
    </>
  );
}
