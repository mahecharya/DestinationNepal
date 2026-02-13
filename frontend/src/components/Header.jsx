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
          <NavLink to="/" className="block py-2 px-6 hover:text-blue-300">
            Dashboard
          </NavLink>
          <NavLink to="/createblogs" className="block py-2 px-6 hover:text-blue-300">
            Add Blogs
          </NavLink>
          
          <NavLink to="/liked" className="block py-2 px-6 hover:text-blue-300">
            Liked Blogs
          </NavLink>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-slate-300 flex justify-between items-center p-4">
          <div
            className="text-2xl font-bold text-indigo-600 cursor-pointer"
            onClick={() => navigate("/")}
          >
            MyBlogApp
          </div>

          <nav className="flex items-center gap-4">
            <NavLink to="/" className="px-4 py-2 rounded-md">
              Home
            </NavLink>
            <NavLink to="/viewblogs" className="px-4 py-2 rounded-md">
              Blog
            </NavLink>
            <NavLink to="/liked" className="px-4 py-2 rounded-md">
              Liked Blogs
            </NavLink>
            <NavLink to="/about" className="px-4 py-2 rounded-md">
              About Us
            </NavLink>
            <NavLink to="/contact" className="px-4 py-2 rounded-md">
              Contact Us
            </NavLink>

            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login" className="px-4 py-2 rounded-md">
                Login
              </NavLink>
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
