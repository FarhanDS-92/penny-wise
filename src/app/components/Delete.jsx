"use client";
import { useRouter } from "next/navigation.js";

export default function Delete({ id, path }) {
  const router = useRouter();

  async function handleDelete() {
    const res = await fetch(`/api/${path}/${id}`, {
      method: "DELETE",
    });

    router.refresh();
  }

  return (
    <button className="edit-deleteButton" type="button" onClick={handleDelete}>
      Delete
    </button>
  );
}
