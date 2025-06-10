"use client";
import { useState } from "react";

export default function AddTodo() {
  const userId = parseInt(localStorage.getItem("userID") || "0");
  const [title, setTitle] = useState("");
  const [descrition, setDescrition] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("http://localhost:4000/todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          descrition,
          completed: false,
          userId,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add todo");
      }

      setTitle("");
      setDescrition("");
      setMessage("✅ Todo added successfully!");
    } catch (err) {
      setMessage("❌ Error adding todo");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow-md max-w-md mx-auto"
    >
      <h2 className="text-xl font-bold mb-4">Add Todo</h2>
      <input
        type="text"
        placeholder="Title"
        className="w-full p-2 mb-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Description"
        className="w-full p-2 mb-2 border rounded"
        value={descrition}
        onChange={(e) => setDescrition(e.target.value)}
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Adding..." : "Add Todo"}
      </button>
      {message && <p className="mt-2 text-sm">{message}</p>}
    </form>
  );
}
