import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="flex items-center mb-6">
          <i className="fas fa-arrow-left text-xl"></i>
        </div>
        <h1 className="text-3xl font-bold text-center mb-2">TH - LC - BG</h1>
        <p className="text-center mb-6">Welcome Back !</p>
        <form>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Your Email"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <div className="relative">
              <input
                type="password"
                className="w-full px-3 py-2 border rounded-lg"
                placeholder="Your Password"
              />
              <i className="fas fa-eye absolute right-3 top-3 text-gray-500"></i>
            </div>
          </div>
          <button className="w-full bg-[#FFB22C] text-white py-2 rounded-lg active:bg-[#B74406]">
            Log in
          </button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            New User?{" "}
            <li className="text-blue-500 list-none hover:cursor-pointer active:scale-105">
              <Link to="/register">Register Here</Link>
            </li>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
