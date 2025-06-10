"use client";
import { useState, useEffect } from "react";

export default function HomePage() {
  const userID = localStorage.getItem("userID");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingTodo, setEditingTodo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:4000/todo/${userID}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setData(result);
      } catch (error) {
        setError(error.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:4000/todo/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete item");
      }
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      setError(err.message || "Delete failed");
    }
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `http://localhost:4000/todo/task/${editingTodo.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: editingTodo.title,
            descrition: editingTodo.descrition,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update item");
      }
      const updated = await response.json();
      setData((prev) =>
        prev.map((item) => (item.id === updated.id ? updated : item))
      );
      setEditingTodo(null);
    } catch (err) {
      setError(err.message || "Update failed");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingTodo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="p-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {editingTodo && (
        <form
          onSubmit={handleUpdateSubmit}
          className="mb-6 bg-yellow-100 p-4 rounded"
        >
          <h3 className="text-lg font-bold mb-2">Edit Todo</h3>
          <input
            name="title"
            value={editingTodo.title}
            onChange={handleChange}
            className="block w-full mb-2 p-2 border rounded"
            placeholder="Title"
            required
          />
          <textarea
            name="descrition"
            value={editingTodo.descrition}
            onChange={handleChange}
            className="block w-full mb-2 p-2 border rounded"
            placeholder="Description"
            required
          />
          <input
            name="completed"
            value={editingTodo.completed}
            onChange={handleChange}
            className="block w-full mb-2 p-2 border rounded"
            placeholder="Title"
            required
          />

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-1 rounded"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditingTodo(null)}
              className="bg-gray-400 text-white px-4 py-1 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {Array.isArray(data) && data.length > 0
        ? data.map((item) => (
            <div key={item.id} className="bg-gray-100 p-4 rounded shadow mb-4">
              <h2 className="text-xl font-bold mb-2">{item.title}</h2>
              <p>{item.descrition}</p>
              <p>
                Status: {item.completed ? "✅ Completed" : "❌ Not completed"}
              </p>
              <p className="text-sm text-gray-600">{item.createdAt}</p>
              <div className="mt-2 flex gap-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => handleEdit(item)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        : !loading && <p>No todo items found.</p>}
    </div>
  );
}
