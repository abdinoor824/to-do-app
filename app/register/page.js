"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/register", { name, email, password });
      router.push("/login");

      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Registration failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-gray-700 p-6 sm:p-8 rounded-lg shadow-md w-full max-w-sm sm:max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white text-center">
          Create an Account
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1 text-white" htmlFor="username">
              Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="username"
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 px-3 py-2 sm:px-4 sm:py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-white" htmlFor="email">
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 px-3 py-2 sm:px-4 sm:py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-white" htmlFor="password">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 px-3 py-2 sm:px-4 sm:py-2.5 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm sm:text-base"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-teal-600 text-white py-2 sm:py-2.5 rounded-md hover:bg-teal-700 transition duration-200 text-sm sm:text-base font-semibold"
          >
            Signup
          </button>
        </form>
        <p className="text-center text-sm mt-4 text-white">
          Already have an account?{" "}
          <Link href="/login" className="text-teal-300 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
