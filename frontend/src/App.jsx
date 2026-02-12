import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "./redux/feature/Userauthenticate"; // your slice
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Likedblogs from "./pages/Likedblogs";
import Category from "./pages/Category";
import AdminHome from "./pages/adminHome";
import Viewblog from "./pages/Viewblog";
import BlogDetail from "./pages/Blogdetail";
import UserHome from "./pages/UserHome";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // Check localStorage on app load
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);

  return (
    <div>
      <Header />
      <Routes>
        {/* Public routes */}
        
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="blogs/:id" element={<BlogDetail />} />
        
        <Route path="/user" element={< UserHome/>} >
        <Route path="viewblogs" element={<Viewblog />} />
          <Route path="category" element={<Category />} />
          <Route path="liked" element={<Likedblogs />} />
        </Route>
        {/* Admin routes */}
        <Route path="/admin" element={<AdminHome />}>
          <Route path="viewblogs" element={<Viewblog />} />
          <Route path="category" element={<Category />} />
          <Route path="liked" element={<Likedblogs />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
