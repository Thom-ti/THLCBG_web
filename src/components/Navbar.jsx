import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#FFB22C]">
      <div className="text-3xl font-bold text-white">TH-LC-BG</div>
      <ul className="flex space-x-8">
        <li className="text-white hover:scale-105 hover:-translate-y-1 duration-200 hover:cursor-pointer hover:text-black">
          <Link to="/">HOME</Link>
        </li>
        <li className="text-white hover:scale-105 hover:-translate-y-1 duration-200 hover:cursor-pointer hover:text-black">
          <Link to="/boardgames">BOARDGAMES</Link>
        </li>
        <li className="text-white hover:scale-105 hover:-translate-y-1 duration-200 hover:cursor-pointer hover:text-black">
          <Link to="/myshelf">MY SHELF</Link>
        </li>
        <li className="text-white hover:scale-105 hover:-translate-y-1 duration-200 hover:cursor-pointer hover:text-black">
          <Link to="/howtoplay">HOW TO PLAY</Link>
        </li>
        <li className="text-white hover:scale-105 hover:-translate-y-1 duration-200 hover:cursor-pointer hover:text-black">
          <Link to="/reviews">REVIEWS</Link>
        </li>
      </ul>
      <div className="flex space-x-4">
        <li className="px-4 py-2 border border-gray-400 rounded bg-white list-none hover:scale-105 hover:-translate-y-1 duration-200 hover:cursor-pointer">
          <Link to="/register">Register</Link>
        </li>
        <li className="px-4 py-2 bg-[#416D19] text-white rounded list-none hover:scale-105 hover:-translate-y-1 duration-200 hover:cursor-pointer">
          <Link to="/login">Login</Link>
        </li>
      </div>
    </div>
  );
};

export default Navbar;
