import React from "react";
import { NavLink, Outlet } from "react-router-dom";

const UserHome = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6 space-y-6">
        <h2 className="text-2xl font-bold mb-6">User</h2>
        <NavLink
          to="/user"
          end
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Dashboard
        </NavLink>
       
        <NavLink
          to="/user/viewblogs"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          View Blogs
        </NavLink>
        <NavLink
          to="/user/category"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Category
        </NavLink>
        <NavLink
          to="/user/liked"
          className={({ isActive }) =>
            `block px-4 py-2 rounded-lg ${
              isActive ? "bg-gray-700" : "hover:bg-gray-700"
            }`
          }
        >
          Liked Blogs
        </NavLink>
      </div>

      {/* Main content */}
      <div className="flex-1  bg-gray-100">
        <Outlet /> 
      </div>
    </div>
  );
};

export default UserHome;
