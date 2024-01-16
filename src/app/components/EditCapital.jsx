"use client";

import { useRouter } from "next/navigation.js";
import { useState } from "react";
import Delete from "./Delete.jsx";

export default function EditCapital({ capital }) {
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
        <div className="budgetItem">
          <p>{capital.name}</p>

          <div>
            <p>${capital.amount}</p>
            <button onClick={handleEdit}>Edit</button>
            <Delete id={capital.id} path={"capital"} />
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
              value={amount}
              onChange={(e) => {
                setAmount(e.target.value);
              }}
            />

            <button type="submit">Submit</button>
            <button type="button" onClick={handleEdit}>
              Cancel
            </button>
            <Delete id={capital.id} path={"capital"} />
          </div>
        </form>
      )}
    </>
  );
}
