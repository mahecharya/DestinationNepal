import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/feature/Userauthenticate";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.authenticate.token);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logoutUser());
    navigate("/", { replace: true });
  };

  return (
    <div className="flex min-h-screen">
      {/* Permanent Sidebar for Admin */}
      {user?.role === "admin" && (
        <div className="w-64 bg-gray-700 text-white shrink-0">
          <h2 className="text-2xl font-bold p-6">Admin Panel</h2>
          <NavLink
            to="/dashboard"
            className="block py-2 px-6 hover:text-blue-300"
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/viewblogs"
            className="block py-2 px-6 hover:text-blue-300"
          >
            Manage Blogs
          </NavLink>

          <NavLink to="/liked" className="block py-2 px-6 hover:text-blue-300">
            Liked Blogs
          </NavLink>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-slate-300 flex justify-between items-center px-10 h-20 shadow-md">
        <div
  onClick={() => navigate("/")}
  className="cursor-pointer flex  leading-tight"
>
  <span className="text-2xl font-semibold tracking-wide 
    bg-linear-to-r from-indigo-600 via-blue-500 to-emerald-500 
    bg-clip-text text-transparent">
    Explore
  </span>

  <span className="text-2xl font-extrabold tracking-widest
     text-green-700">
    NEPAL
  </span>
</div>
          {/* Navigation */}
          <nav className="flex items-center gap-8 text-1rem font-medium">
            <NavLink
  to="/"
  className={({ isActive }) =>
    isActive
      ? "text-blue-600 font-bold underline"
      : "text-gray-800 hover:text-blue-500"
  }
>
  Home
</NavLink>

<NavLink
  to="/viewblogs"
  className={({ isActive }) =>
    isActive
      ? "text-blue-600 font-bold underline"
      : "text-gray-800 hover:text-blue-500"
  }
>
  Blog
</NavLink>

<NavLink
  to="/liked"
  className={({ isActive }) =>
    isActive
      ? "text-blue-600 font-bold underline"
      : "text-gray-800 hover:text-blue-500"
  }
>
  Liked Blogs
</NavLink>

<NavLink
  to="/about"
  className={({ isActive }) =>
    isActive
      ? "text-blue-600 font-bold underline"
      : "text-gray-800 hover:text-blue-500"
  }
>
  About Us
</NavLink>

<NavLink
  to="/contact"
  className={({ isActive }) =>
    isActive
      ? "text-blue-600 font-bold underline"
      : "text-gray-800 hover:text-blue-500"
  }
>
  Contact Us
</NavLink>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-4 py-1 bg-red-600 text-white rounded-md"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </nav>
        </div>

        {/* Render page content without extra gap */}
        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Header;
