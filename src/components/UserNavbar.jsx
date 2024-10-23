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
      <div className="relative dropdown mx-8">
        <div tabIndex={0} role="button" className="btn m-1 text-white bg-transparent border border-white rounded-lg px-4 py-2 hover:bg-white hover:text-[#FFB22C] transition-colors duration-200">
          {user.user.username}
        </div>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-white rounded-lg shadow-lg z-10 w-52 p-2"
        >
          {user.user.role === "ADMIN" && (
            <li className="hover:scale-105 transition-transform duration-200 text-red-500">
              <Link to="/admin">ADMIN PAGE</Link>
            </li>
          )}
          <li className="hover:scale-105 transition-transform duration-200">
            <Link to="/myshelf">MY SHELF</Link>
          </li>
          <li
            onClick={logout}
            className="hover:scale-105 transition-transform duration-200"
          >
            <Link to="/">Log out</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserNavbar;
