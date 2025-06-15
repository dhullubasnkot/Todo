import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateLoginUsers from "../api/loginUsers";
import EditTodoForm from "../pages/updatetodo";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await CreateLoginUsers(form);

      if (result && result.token && result.user) {
        const { token, user } = result;

        // Save to localStorage
        localStorage.setItem("token", token);

        localStorage.setItem("userId", user.id);
        localStorage.setItem("email", user.email);
        localStorage.setItem("username", user.username);

        setMessage(" Login successful!");
        navigate("/");
      } else {
        throw new Error("Invalid login response");
      }
    } catch (err) {
      setMessage(` ${err.message}`);
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
