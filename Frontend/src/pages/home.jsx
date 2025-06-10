"use client";
import { useState, useEffect } from "react";

export default function HomePage() {
  const userID = localStorage.getItem("userID");
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="p-4">
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {Array.isArray(data) && data.length > 0
        ? data.map((item) => (
            <div key={item.id} className="bg-gray-100 p-4 rounded shadow mb-4">
              <h2 className="text-xl font-bold mb-2">{item.title}</h2>
              <p>{item.descrition}</p>
              <p>
                Status: {item.completed ? "✅ Completed" : "❌ Not completed"}
              </p>
              <p className="text-sm text-gray-600">{item.createdAt}</p>
            </div>
          ))
        : !loading && <p>No todo items found.</p>}
    </div>
  );
}
