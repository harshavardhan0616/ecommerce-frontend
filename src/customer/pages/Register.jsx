import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Auth";
const Register = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { login } = useAuth();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      alert("Please fill all fields");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:8081/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Registration failed");
      }

      const data = await response.json();

      console.log("Registered user:", data);

      // IMPORTANT
      // Save user + immediately update React authentication
      login(data);

      alert("Account created successfully!");

      navigate("/");
    } catch (error) {
      console.error("Registration error:", error);

      alert(
        "Registration failed. Please check whether the backend is running."
      );
    }
  };

  return (<div className="min-h-[70vh] flex items-center justify-center px-5 py-16 bg-gray-50">

    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">

      <h1 className="text-3xl font-bold text-center mb-8">
        Create Account
      </h1>

      <form onSubmit={handleRegister}>

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-4">
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

        <div className="mb-4">
          <label className="block mb-2 font-medium">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">
            Confirm Password
          </label>

          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            className="w-full border rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700"
        >
          Create Account
        </button>

      </form>

      <p className="text-center mt-6 text-gray-600">
        Already have an account?
      </p>

      <button
        onClick={() => navigate("/login")}
        className="w-full mt-3 border border-indigo-600 text-indigo-600 py-3 rounded-lg font-semibold hover:bg-indigo-50"
      >
        Sign In
      </button>

    </div>

  </div>

  );
};

export default Register;
