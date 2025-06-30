import React, { useEffect } from "react";
import  { FaTimes } from "react-icons/fa";

const Toast = ({ type = "", message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);
    return () => clearTimeout(timer);
  }, [onClose]);
console.log(type)
  const bgColor = type === "success" ? "bg-green-500" :  "bg-red-500";



  return (
    <div
      className={`fixed top-5 right-5 ${bgColor} text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center justify-between gap-4 min-w-[200px]`}
      >
      <span>{message}</span>
      <button
        onClick={onClose}
        className="text-white hover:text-gray-300 font-bold text-lg focus:outline-none"
      >
      <FaTimes />
      </button>
    </div>
  // <div className="bg-red-500 text-white p-4">If you can see this, Tailwind works</div>
  );

};

export default Toast;
