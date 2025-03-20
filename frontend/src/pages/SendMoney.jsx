import { useState } from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";

export default function SendMoney() {
  
  const [searchParams] = useSearchParams();
  const receiverId = searchParams.get("to");
  const receiverName = searchParams.get("name") || "Unknown Recipient";

  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [senderBalance, setSenderBalance] = useState(null);
  const [error, setError] = useState("");

  const handleTransfer = async () => {
    setMessage("");
    setError("");
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Please sign in first!");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      setError("Please enter a valid amount.");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5001/api/user/transfer",
        { to: receiverId, amount: Number(amount) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Using the property returned by the backend to update the balance
      const newBalance = res.data.senderBalance;
      setSenderBalance(newBalance);
      setMessage(`Transfer successful! New sender balance: ₹${newBalance}`);
      setAmount("");
    } catch (error) {
      console.error("Transfer Error:", error.response?.data || error.message);
      setError("Transfer failed. " + (error.response?.data?.message || ""));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center text-gray-800">
      <div className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center">Send Money</h2>
        {/* Display receiver information */}
        <p className="mb-4 text-base text-gray-700">
          Sending money to: <span className="font-semibold">{receiverName}</span>
        </p>

        {/* Show sender's current balance if available */}
        {senderBalance !== null && (
          <p className="mb-6 text-sm">
            Your Current Balance:{" "}
            <span className="font-semibold text-green-600">₹{senderBalance}</span>
          </p>
        )}

        {/* Display success or error messages */}
        {message && (
          <div className="bg-blue-100 text-blue-700 p-2 rounded mb-4">
            {message}
          </div>
        )}
        {error && (
          <div className="bg-red-100 text-red-700 p-2 rounded mb-4">{error}</div>
        )}

        {/* Amount input */}
        <label className="block font-medium mb-1">Amount</label>
        <input
          type="number"
          className="border rounded px-3 py-2 w-full focus:outline-none focus:ring mb-4"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount..."
        />

        {/* Send button */}
        <button
          onClick={handleTransfer}
          className="w-full bg-gray-800 hover:bg-gray-900 text-white font-semibold py-2 px-4 rounded"
        >
          Send
        </button>
      </div>
    </div>
  );
}
