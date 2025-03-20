import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignin = async () => {
    setErrorMsg("");
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5001/api/auth/signin", {
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      setErrorMsg("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>

        {errorMsg && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">
            {errorMsg}
          </div>
        )}

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
          onClick={handleSignin}
          disabled={loading}
          className="w-full bg-gray-700 hover:bg-gray-800 text-white py-2 px-4 rounded"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center text-sm mt-4">
          Don’t have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
