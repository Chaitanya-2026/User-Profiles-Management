import React, { useState } from "react";
import { getUsers, saveUsers, setAuthUser } from "../utils/localStorage";

export default function Auth({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleAuth = (e) => {
    e.preventDefault();
    const users = getUsers();

    if (isLogin) {
      const found = users.find((u) => u.email === email && u.password === password);
      if (found) {
        setAuthUser(found);
        onAuthSuccess();
      } else setError("Invalid credentials");
    } else {
      if (users.some((u) => u.email === email)) {
        setError("User already exists");
        return;
      }
      const newUser = { id: Date.now(), email, password, name: email.split("@")[0] };
      saveUsers([...users, newUser]);
      setAuthUser(newUser);
      onAuthSuccess();
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-80">
        <h2 className="text-2xl font-bold text-center mb-4">
          {isLogin ? "Log In" : "Sign Up"}
        </h2>
        <form onSubmit={handleAuth} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="border w-full p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border w-full p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>
        <p
          className="text-sm text-blue-500 mt-3 text-center cursor-pointer"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
          }}
        >
          {isLogin ? "Create an account" : "Already have an account? Log in"}
        </p>
      </div>
    </div>
  );
}
