import React from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/feature/Userauthenticate";
import { LuLogOut } from "react-icons/lu";


const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.authenticate.token);
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logoutUser());
    navigate("/", { replace: true });
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {user?.role === "admin" && (
        <div className="w-64 bg-gray-700 text-white shrink-0">
          <h2 className="text-2xl font-bold p-6">Admin Panel</h2>
          <NavLink to="/dashboard" className="block py-2 px-6 hover:text-blue-300">Dashboard</NavLink>
          <NavLink to="/viewblogs" className="block py-2 px-6 hover:text-blue-300">Manage Blogs</NavLink>
          <NavLink to="/category" className="block py-2 px-6 hover:text-blue-300">Manage Category</NavLink>
          <NavLink to="/users" className="block py-2 px-6 hover:text-blue-300">Manage Users</NavLink>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 flex flex-col">

        {/* HEADER */}
        <div className="bg-slate-300 flex items-center justify-between px-10 h-20 shadow-md">

          {/* Left Logo */}
          <div
            onClick={() => navigate("/")}
            className="cursor-pointer flex"
          >
            <span className="text-2xl font-semibold bg-gradient-to-r from-indigo-600 via-blue-500 to-emerald-500 bg-clip-text text-transparent">
              Explore
            </span>
            <span className="text-2xl font-bold text-green-700 ml-1">
              NEPAL
            </span>
          </div>

          {/* CENTER MENU */}
          <nav className="flex gap-10 font-medium">
            <NavLink to="/" className={({isActive}) =>
              isActive ? "text-blue-600 font-bold underline" : "hover:text-blue-600"
            }>Home</NavLink>

            <NavLink to="/viewblogs" className={({isActive}) =>
              isActive ? "text-blue-600 font-bold underline" : "hover:text-blue-600"
            }>Blog</NavLink>

            <NavLink to="/liked" className={({isActive}) =>
              isActive ? "text-blue-600 font-bold underline" : "hover:text-blue-600"
            }>Liked</NavLink>

            <NavLink to="/about" className={({isActive}) =>
              isActive ? "text-blue-600 font-bold underline" : "hover:text-blue-600"
            }>About</NavLink>

            <NavLink to="/contact" className={({isActive}) =>
              isActive ? "text-blue-600 font-bold underline" : "hover:text-blue-600"
            }>Contact</NavLink>
          </nav>

          {/* RIGHT PROFILE SECTION */}
          <div className="flex items-center gap-4">
            {token ? (
              <>
                {/* Profile */}
                <div
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <img
                    src={
                      user?.profilePhoto
                        ? `https://destinationnepall.onrender.com/uploads/profile/${user.profilePhoto}`
                        : "https://via.placeholder.com/40"
                    }
                    alt="profile"
                    className="w-10 h-10 rounded-full object-cover border"
                  />
                  <span className="font-medium">{user?.name}</span>
                </div>

                {/* Logout */}
                <button
                  onClick={handleLogout}
                >
                  <LuLogOut />

                </button>
              </>
            ) : (
              <NavLink to="/login">Login</NavLink>
            )}
          </div>
        </div>

        <div className="flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Header;
