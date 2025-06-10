import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ correct import

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // ✅ use inside component

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:4000/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const users = await res.json();

      if (!Array.isArray(users)) {
        throw new Error("Unexpected response from server");
      }

      const foundUser = users.find(
        (u) => u.email === form.email && u.password === form.password
      );

      if (!foundUser) {
        throw new Error("Invalid email or password");
      }

      localStorage.setItem("userID", foundUser.id);
      setMessage("✅ Login successful!");

      // ✅ Correct way to redirect
      navigate("/");
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Log In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full p-2 border rounded"
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          className="w-full p-2 border rounded"
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          type="submit"
        >
          Log In
        </button>
      </form>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
