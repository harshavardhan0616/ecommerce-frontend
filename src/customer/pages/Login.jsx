import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      const response = await fetch("http://localhost:8081/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();

      console.log("Logged in user:", data);

      // Save user in Auth Context
      login(data);

      alert("Login successful!");

      // Go to home page
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);

      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-5 py-16 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">

        <h1 className="text-3xl font-bold text-center mb-8">
          Sign In
        </h1>

        <form onSubmit={handleLogin}>

          {/* Email */}
          <div className="mb-5">
            <label className="block mb-2 font-medium">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block mb-2 font-medium">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Sign In */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700"
          >
            Sign In
          </button>

        </form>

        <p className="text-center mt-6 text-gray-600">
          Don't have an account?
        </p>

        {/* Create Account */}
        <button
          onClick={() => navigate("/register")}
          className="w-full mt-3 border border-indigo-600 text-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-50"
        >
          Create Account
        </button>

      </div>
    </div>
  );
};

export default Login;