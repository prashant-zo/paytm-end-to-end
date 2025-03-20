import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Dashboard() {
  const [balance, setBalance] = useState(null);
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get("http://localhost:5001/api/user/balance", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setBalance(res.data.balance))
      .catch(() => setError("Failed to fetch balance"));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    axios
      .get(`http://localhost:5001/api/user?filter=${filter}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUsers(res.data))
      .catch(() => setError("Failed to fetch users"));
  }, [filter]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8">
      <div className="max-w-4xl mx-auto bg-white shadow p-6 rounded">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
        )}

        <div className="mb-6">
          <p className="text-lg font-semibold">
            Current Balance:{" "}
            <span className="text-blue-600">
              {balance !== null ? `₹${balance}` : "Loading..."}
            </span>
          </p>
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Search Users</label>
          <input
            className="border rounded px-3 py-2 w-full focus:outline-none focus:ring"
            placeholder="Enter name to search..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">All Users</h2>
          <div className="overflow-x-auto">
            <table className="w-full border">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-2 text-left">Name</th>
                  <th className="p-2 text-left">Email</th>
                  <th className="p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-b">
                    <td className="p-2">
                      {user.firstName} {user.lastName}
                    </td>
                    <td className="p-2">{user.email}</td>
                    <td className="p-2">
                      <Link
                        to={`/sendmoney?to=${user._id}&name=${encodeURIComponent(
                          `${user.firstName} ${user.lastName}`
                        )}`}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Send Money
                      </Link>
                    </td>
                  </tr>
                ))}
                {users.length === 0 && (
                  <tr>
                    <td colSpan="3" className="p-2 text-center">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
