import React from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";

const AdminHome = () => {
  const nav = useNavigate();
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-gray-900 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-6">Admin Panel</h2>

        <div className="flex flex-col space-y-4">
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `text-left px-4 py-2 rounded-lg transition block ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            Dashboard
          </NavLink>

          <NavLink
            to="/admin/viewblogs"
            className={({ isActive }) =>
              `text-left px-4 py-2 rounded-lg transition block ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            Blogs
          </NavLink>

          <NavLink
            to="/admin/category"
            className={({ isActive }) =>
              `text-left px-4 py-2 rounded-lg transition block ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            Category
          </NavLink>

         <NavLink
            to="/admin/liked"
            className={({ isActive }) =>
              `text-left px-4 py-2 rounded-lg transition block ${
                isActive ? "bg-gray-700" : "hover:bg-gray-700"
              }`
            }
          >
            Liked Blog
          </NavLink>
        </div>
      </div>
      <div className="flex-1 ">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminHome;
