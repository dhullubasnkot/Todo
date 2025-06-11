import { useState, useEffect } from "react";
import GetAllTodos from "../api/todos/getalltodos";
import useUpdateTodos from "../api/todos/updatetodos";
import handleDelete from "../api/todos/deletetodos";

export default function HomePage() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingTodo, setEditingTodo] = useState(null);
  const [expandedDescriptions, setExpandedDescriptions] = useState({});

  const { handleUpdateSubmit, handleChange } = useUpdateTodos(
    editingTodo,
    setEditingTodo,
    setData,
    setError
  );

  useEffect(() => {
    const userID = localStorage.getItem("userID");
    if (!userID) {
      setError("User ID not found");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const todos = await GetAllTodos(userID);
        setData(todos);
      } catch (err) {
        setError(err.message || "Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const toggleDescription = (id) => {
    setExpandedDescriptions((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <div className="p-4 sm:p-6 md:p-8">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {editingTodo && (
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
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.isArray(data) && data.length > 0 ? (
          data.map((item) => (
            <div
              key={item.id}
              className="bg-gray-100 p-4 rounded shadow hover:shadow-md transition duration-200"
            >
              <h2 className="text-xl font-bold mb-2">{item.title}</h2>
              <p
                className={`${
                  expandedDescriptions[item.id] ? "" : "line-clamp-2"
                } text-gray-800`}
              >
                {item.descrition}
              </p>
              {item.descrition.length > 100 && (
                <button
                  onClick={() => toggleDescription(item.id)}
                  className="text-blue-500 text-sm mt-1 hover:underline"
                >
                  {expandedDescriptions[item.id] ? "See Less" : "See More"}
                </button>
              )}

              <p>
                Status: {item.completed ? "✅ Completed" : "❌ Not completed"}
              </p>
              <p className="text-sm text-gray-600">{item.createdAt}</p>

              <div className="mt-2 flex gap-2 flex-wrap">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                  onClick={() => setEditingTodo(item)}
                >
                  Update
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={() => handleDelete(item.id, setData, setError)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : !loading ? (
          <p>No todo items found.</p>
        ) : null}
      </div>
    </div>
  );
}
