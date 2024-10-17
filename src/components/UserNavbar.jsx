import React from "react";
import { Link } from "react-router-dom";
import { useShallow } from "zustand/shallow";
import useUserStore from "../stores/userStore";

const UserNavbar = () => {
  const { user, logout } = useUserStore(
    useShallow((state) => ({
      user: state.user,
      logout: state.logout,
    }))
  );
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
          <Link to="/posts">POSTS</Link>
        </li>
      </ul>
      <div className="dropdown mx-8">
        <div tabIndex={0} role="button" className="btn m-1">
          {user.user.username}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow"
        >
          <li>
            <Link to="/myshelf">MY SHELF</Link>
          </li>
          <li onClick={logout}>
            <Link to="/">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserNavbar;
