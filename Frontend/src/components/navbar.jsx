"use client";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("userID");
    const userName = localStorage.getItem("username");

    if (userId && userName) {
      setUser({ id: userId, name: userName });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userID");
    localStorage.removeItem("username");
    setUser(null);
    window.location.href = "/";
  };

  const goHome = () => {
    window.location.href = "/";
  };

  return (
    <div className="flex justify-between p-4 bg-gray-100">
      <div>
        <button onClick={goHome} className="font-bold text-xl">
          TODO
        </button>
      </div>

      <div className="flex items-center gap-4">
        <a href="/addtodo" className="text-blue-500 hover:underline">
          Add
        </a>

        {!user ? (
          <a href="/signup" className="text-blue-500 hover:underline">
            Login/Signup
          </a>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <button
                onClick={handleLogout}
                className="text-red-500 hover:underline"
              >
                Logout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
