import React from "react";
import { useState } from "react";
import Toast from "../components/Toast";
import axios from "axios";
import { useNavigate } from "react-router-dom"

const Login = () => {
  const [user, setUser] = useState({email: "",password: "",});
  const [toast, setToast] = useState({message: "",type: "",});

  const navigate = useNavigate();

  const handleToastClose = () => {
    setToast({
      message: "",
      type: "",
    });
  };

  const handleChanges = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    const { email, password } = user;
    if ((!email.trim(), !password.trim())) {
      setToast({ message: "All fileds require", type: "error" });
    }
    try {
      // console.log(user);
      const response = await axios.post(
        "http://localhost:3000/auth/login",
        user
      );
      localStorage.setItem("token",response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      setToast({
        message: response?.data?.message || "Login successful",
        type: "success",
      });
      navigate("/");
    } catch (error) {
      // console.log(error);
      setToast({
        message: error.response?.data?.message || "Internal server error",
        type: "error",
      });
    }
  };

  return (
    <div className="flex justify-around items-center h-screen bg-gray-950">
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={handleToastClose}
        />
      )}
      <div className="flex  flex-col  bg-gray-900 px-8 py-6 rounded-lg shadow-2xl text-center w-96 h-96">
        <h1 className="text-3xl font-bold text-white ">Login</h1>
        <form className="mt-20" onSubmit={handleLogin}>
          <input
            type="email"
            value={user.email}
            name="email"
            onChange={handleChanges}
            placeholder="Enter a Email"
            className="w-full px-4 py-2 mb-4 bg-gray-800 text-white rounded-md focus:outline-none border border-gray-500  focus:border-indigo-600"
          />
          <input
            type="password"
            value={user.password}
            name="password"
            onChange={handleChanges}
            placeholder="Enter a Password"
            className="w-full px-4 py-2 mb-4 bg-gray-800 text-white rounded-md focus:outline-none border border-gray-500  focus:border-indigo-600"
          />
          <button
            type="submit"
            className="w-full bg-indigo-500 mt-4 hover:bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            Login
          </button>
          <p className="mt-4 text-gray-400">
            Don't have an account?{" "}
            <a href="/signup" className="text-indigo-500 hover:underline">
              Signup
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
