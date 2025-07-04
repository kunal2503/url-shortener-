import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Toast from "../components/Toast"; 

const Navbar = () => {
  const [toast, setToast] = React.useState({
    message: "",
    type: "",
  });
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () =>{
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setToast({
      message: "Logout successful",
      type: "success",
    })
    navigate("/");
  }

  const handleToastClose = () => {
    setToast({
      message: "",
      type: "",
    })
  }
  return (
    <div className="w-full bg-gray-900 text-white flex justify-between items-center px-6 py-4">
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleToastClose}
        />
      )}
      <div>
        <h1 className="font-bold text-3xl text-indigo-500">ShortLink</h1>
      </div>
      
      <nav className="flex items-center gap-6">
        {user ? (

          <ul className="flex gap-4 text-xl items-center">
          <li>
            <Link
              to="/"
              className="hover:text-indigo-400 focus:text-indigo-400 hover:underline focus:underline transition"
              >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/url/history"
              className="hover:text-indigo-400 focus:text-indigo-400 hover:underline focus:underline transition"
              >
              History
            </Link>
          </li>
          <li>
            <Link
              to="/track/count"
              className="hover:text-indigo-400 focus:text-indigo-400 hover:underline focus:underline transition"
              >
              Track Count
            </Link>
          </li>
        </ul>
            ) : null}

        <div className="flex gap-3">
          {user ? (
          <button onClick={handleLogout} className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1 rounded-lg font-medium transition">
            Logout
          </button>
          ) :(<>
          <Link to="/login">
          <button  className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1 rounded-lg font-medium transition">
            Login
          </button>
          </Link>
            <Link to="/signup">
          <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-1 rounded-lg font-medium transition">
            Signup
          </button>
          </Link>
          </>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
