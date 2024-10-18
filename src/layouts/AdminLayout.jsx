import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/admin/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex">
      <div className="flex bg-neutral-100 h-screen w-60 overflow-hidden">
        <AdminSidebar />
      </div>
      <div className="flex flex-col flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
