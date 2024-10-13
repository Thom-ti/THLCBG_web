import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className="text-3xl font-bold text-center mb-2">TH - LC - BG</h1>
      <h2 className="text-center text-lg mb-6">Registration</h2>
      <form>
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded"
            placeholder="Your Username"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            className="w-full px-3 py-2 border rounded"
            placeholder="Your Email"
          />
        </div>
        <div className="mb-4 relative">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            placeholder="Your Password"
          />
          <i className="fas fa-eye absolute right-3 top-3 text-gray-500"></i>
        </div>
        <div className="mb-6 relative">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            className="w-full px-3 py-2 border rounded"
            placeholder="Confirm Password"
          />
          <i className="fas fa-eye absolute right-3 top-3 text-gray-500"></i>
        </div>
        <button className="w-full bg-[#FFB22C] text-white py-2 rounded">
          Register
        </button>
      </form>
      <p className="text-center mt-4">
        Already a User?{" "}
        <li className="text-blue-500 list-none hover:cursor-pointer active:scale-105">
          <Link to="/login">Login now</Link>
        </li>
      </p>
    </div>
  );
};

export default Register;
