"use client";
import { useState } from "react";
import CreateTodo from "../api/todos/createtodos";
import { useNavigate } from "react-router-dom";

export default function AddTodo() {
  const [title, setTitle] = useState("");
  const [descrition, setDescrition] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      await CreateTodo({ title, descrition, userId });
      setTitle("");
      setDescrition("");
      setMessage("Todo added successfully!");
      setTimeout(() => {
        navigate("/");
      }, 1500);
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
