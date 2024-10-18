import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdDashboard } from "react-icons/md";
import { FiHome } from "react-icons/fi";
import useUserStore from "../../stores/userStore";
const classLink =
  "flex items-center hover:bg-neutral-700 hover:scale-105 hover:duration-200 active:bg-green-400 rounded-sm px-3 py-2 gap-2";

const AdminSidebar = () => {
  const { logout } = useUserStore((state) => state);
  return (
    <div className="bg-neutral-900 w-60 p-4 flex flex-col text-white">
      {/* Profile */}
      <div className="flex flex-col items-center gap-2 py-4">
        <FaUser fontSize={48} />
        <span className="text-lg ">Profile</span>
      </div>

      {/* Menu Link */}
      <div className="flex-1 py-4">
        <Link className={classLink} to={"/admin"}>
          <span className="text-xl">
            <MdDashboard />
          </span>
          Manage
        </Link>
      </div>

      {/* Bottom Menu */}
      <div>
        <Link className={classLink} to="/">
          <span className="text-xl">
            <FiHome />
          </span>
          Main Page
        </Link>
      </div>
      <div onClick={logout}>
        <Link className={classLink} to="/">
          <span className="text-xl">
            <IoLogOut />
          </span>
          Log out
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
