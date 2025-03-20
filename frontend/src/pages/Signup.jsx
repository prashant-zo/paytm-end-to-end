import { useState } from "react";
import axios from "axios";

export default function Signup() {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5001/api/auth/signup", {
        firstName,
        lastName,
        email,
        password,
      });

      alert("Signup successful! Please sign in.");
    } catch (error) {
      console.error(error);
      if (error.response?.data?.errors) {
        const messages = error.response.data.errors.map(e => e.message).join(" | ");
        setErrorMsg(messages);
      } else {
        setErrorMsg("Signup failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {errorMsg}
          </div>
        )}

        <div className="mb-4">
          <label className="block font-semibold mb-1">First Name</label>
          <input
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            type="text"
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder="John"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Last Name</label>
          <input
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            type="text"
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
            placeholder="Doe"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Email</label>
          <input
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block font-semibold mb-1">Password</label>
          <input
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </div>

        <button
          onClick={handleSignup}
          disabled={loading}
          className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded"
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>

        <p className="text-center text-sm mt-4">
          Already have an account?{" "}
          <a href="/signin" className="text-blue-500 hover:underline">
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}
