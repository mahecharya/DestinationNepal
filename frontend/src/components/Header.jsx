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
    localStorage.removeItem("token")
    dispatch(logoutUser());
    try {
      await axios.post(
        "http://localhost:5001/api/logout",
        {},
        { withCredentials: true }
      );

      
      
    } catch (error) {
      console.log(error);
    }navigate("/login");
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
            to="/crblogs"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md font-medium transition ${
                isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
              }`
            }
          >
            Create Blogs
          </NavLink>

          <NavLink
            to="/register"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md font-medium transition ${
                isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-indigo-100 hover:text-indigo-600"
              }`
            }
          >
            Register
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
