import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <nav className="bg-gray-200 text-gray-800 px-6 py-4 flex justify-between items-center shadow">
      <div>
        <Link to="/dashboard" className="font-bold text-xl hover:text-gray-700">
          Paytm Clone
        </Link>
      </div>
      <div className="space-x-4">
        <Link to="/dashboard" className="hover:text-gray-700">
          Dashboard
        </Link>
        <Link to="/sendmoney" className="hover:text-gray-700">
          Send Money
        </Link>
        <button
          onClick={handleLogout}
          className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
}
