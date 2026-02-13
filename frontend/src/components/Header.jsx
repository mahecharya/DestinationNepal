import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/feature/Userauthenticate";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state)=>state.authenticate.token)

  const handleLogout = async () => {
  try {
    await axios.post("http://localhost:5001/api/logout");

    // Clear browser storage
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Clear Redux state
    dispatch(logoutUser());

    // Redirect
    navigate("/", { replace: true });

  } catch (error) {
    console.log(error);
  }
};

  return (
     <div className=" mx-auto bg-slate-300 flex justify-between items-center p-4">
        
        <div
          className="text-2xl font-bold text-indigo-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          MyBlogApp
        </div>

        
        <nav className="flex items-center gap-4">
          <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md font-medium transition ${
                  isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/viewblogs"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md font-medium transition ${
                  isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
                }`
              }
            >
              Blog
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md font-medium transition ${
                  isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
                }`
              }
            >
About            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md font-medium transition ${
                  isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
                }`
              }
            >
              Contact Us
            </NavLink>
            <NavLink
              to="/liked"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md font-medium transition ${
                  isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
                }`
              }
            >
              Liked Blogs
            </NavLink>

          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition font-medium"
            >
              Logout
            </button>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                `px-4 py-2 rounded-md font-medium transition ${
                  isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
                }`
              }
            >
              Login
            </NavLink>
            
          )}
        </nav>
      </div>
  );
};

export default Header;
