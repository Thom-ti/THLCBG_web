import React from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { MdDashboard, MdDeleteForever } from "react-icons/md";
import { FiHome } from "react-icons/fi";
import useUserStore from "../../stores/userStore";
const classLink =
  "flex items-center hover:bg-[#FFDD88] hover:scale-105 hover:text-black hover:duration-200 active:bg-green-400 rounded-sm px-3 py-2 gap-2";

const AdminSidebar = () => {
  const { logout } = useUserStore((state) => state);
  return (
    <div className="bg-[#FFB22C] w-60 p-4 flex flex-col text-white">
      {/* Profile */}
      <div className="flex flex-col items-center gap-2 py-4">
        <FaUser fontSize={48} />
        <span className="text-lg ">Admin</span>
      </div>

      {/* Menu Link */}
      <div className="flex py-4">
        <Link className={classLink} to={"/admin"}>
          <span className="text-xl">
            <MdDashboard />
          </span>
          Add Boardgame
        </Link>
      </div>
      <div className="flex-1 py-4">
        <Link className={classLink} to={"/admin/delete-boardgame"}>
          <span className="text-xl">
            <MdDeleteForever />
          </span>
          Delete Boardgame
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
