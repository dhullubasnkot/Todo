import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import CreateLoginUsers from "../api/loginUsers";
import EditTodoForm from "../pages/updatetodo";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  // const seconds = 10;
  // const expiresInDays = seconds / 86400;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await CreateLoginUsers(form);

      if (result && result.user) {
        const { user } = result;

        // Save to localStorage
        // localStorage.setItem("token", token);

        localStorage.setItem("userId", user.id);
        localStorage.setItem("email", user.email);
        localStorage.setItem("username", user.username);
        // Set data in cookies
        // Cookies.set("token", token, { path: "/", expires: expiresInDays });
        // Cookies.set("userId", user.id, { path: "/", expires: expiresInDays });
        // Cookies.set("email", user.email, { path: "/", expires: expiresInDays });
        // Cookies.set("username", user.username, {
        //   path: "/",
        //   expires: expiresInDays,
        // });
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
