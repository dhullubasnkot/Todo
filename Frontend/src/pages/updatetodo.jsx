// components/EditTodoForm.jsx
import React from "react";

export default function EditTodoForm({
  editingTodo,
  setEditingTodo,
  handleUpdateSubmit,
  handleChange,
}) {
  if (!editingTodo) return null;

  return (
    <form
      onSubmit={handleUpdateSubmit}
      className="mb-6 bg-yellow-100 p-4 sm:p-6 rounded"
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
      <label className="block mb-2">
        <input
          type="checkbox"
          name="completed"
          checked={editingTodo.completed}
          onChange={(e) =>
            setEditingTodo((prev) => ({
              ...prev,
              completed: e.target.checked,
            }))
          }
          className="mr-2"
        />
        Mark as completed
      </label>

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
  );
}
