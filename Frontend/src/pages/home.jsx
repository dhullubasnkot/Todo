import { useState, useEffect } from "react";
import GetAllTodos from "../api/todos/getalltodos";
import useUpdateTodos from "../api/todos/updatetodos";
import handleDelete from "../api/todos/deletetodos";
import EditTodoForm from "./updatetodo";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";
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
    const userId = localStorage.getItem("userId");
    console.log("✅ userId:", userId);

    if (!userId) {
      setError("User ID not found. Please login.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const todos = await GetAllTodos(userId);
        console.log("✅ Todos:", todos); // Debugging
        setData(todos);
      } catch (err) {
        setError(err.message || "Failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     const token = Cookies.get("token");
  //     if (!token) {
  //       console.log(" Token expired. Logging out...");
  //       localStorage.removeItem("userId");
  //       Navigate("/login");
  //     }
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);
  // Logout if "tokentest" cookie expires
  // useEffect(() => {
  //   const token = Cookies.get("tokentest");
  //   if (!token) {
  //     localStorage.removeItem("userId");
  //     window.location.href = "/login";
  //   }
  // }, []);

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
      <EditTodoForm
        editingTodo={editingTodo}
        setEditingTodo={setEditingTodo}
        handleUpdateSubmit={handleUpdateSubmit}
        handleChange={handleChange}
      />

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
