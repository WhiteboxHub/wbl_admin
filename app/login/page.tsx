"use client";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ApiError } from "next/dist/server/api-utils";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const router = useRouter();

  // Use the API URL from the .env file
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  console.log(API_URL);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Use the API_URL environment variable here
      const response = await axios.post(`${API_URL}/auth/login`, {
        username,
        password,
      });
      const token = response.data.token;

      localStorage.setItem("token", token); // Save token to localStorage for auth management
      setMessage(response.data.message);
      setError(null);
      router.push("/leads"); // Redirect to the leads page after login
    } catch {
      setError("Invalid username or password");
      setMessage(null);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Login
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full p-2 border border-gray-300 rounded-md text-black focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition duration-300"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {message && (
          <p className="text-green-500 text-center mt-4">{message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;
