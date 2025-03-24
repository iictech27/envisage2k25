import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setAdmin } from "../features/adminSlice"; // Adjust path as needed

const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Hardcoded admin credentials
    if (username === "admin_envisage" && password === "@tmsltechies") {
      // Dispatch to set admin data in Redux store
      dispatch(setAdmin({ username }));
      // Redirect to /admin page
      navigate("/admin");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div style={{ margin: "2rem" }} className="text-xl">
      <h2>Admin Login</h2>
      <form onSubmit={handleLogin} className="flex gap-x-3">
        <div>
          <label>Username:</label>
          <input
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="ml-4 border p-1 rounded-md"
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="ml-4 border p-1 rounded-md"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default AdminLogin;
