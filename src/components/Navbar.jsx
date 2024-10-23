import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-[#FFB22C] shadow-lg">
      <div className="text-3xl font-bold text-white">
        <Link to="/">TH-LC-BG</Link>
      </div>
      <ul className="flex space-x-8">
        <li className="text-white hover:scale-105 transition-transform duration-200 hover:text-black">
          <Link to="/">HOME</Link>
        </li>
        <li className="text-white hover:scale-105 transition-transform duration-200 hover:text-black">
          <Link to="/boardgames">BOARDGAMES</Link>
        </li>
        <li className="text-white hover:scale-105 transition-transform duration-200 hover:text-black">
          <Link to="/myshelf">MY SHELF</Link>
        </li>
        <li className="text-white hover:scale-105 transition-transform duration-200 hover:text-black">
          <Link to="/posts">POSTS</Link>
        </li>
      </ul>
      <div className="flex space-x-4">
        <li className="px-4 py-2 border border-gray-400 rounded bg-white list-none hover:scale-105 transition-transform duration-200 hover:bg-gray-200 hover:cursor-pointer">
          <Link to="/register">สมัครสมาชิก</Link>
        </li>
        <li className="px-4 py-2 bg-[#416D19] text-white rounded list-none hover:scale-105 transition-transform duration-200 hover:bg-[#365A13] hover:cursor-pointer">
          <Link to="/login">เข้าสู่ระบบ</Link>
        </li>
      </div>
    </div>
  );
};

export default Navbar;
