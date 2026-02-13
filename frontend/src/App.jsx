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
import Home from "./pages/Home";
import AdminDashboard from "./pages/AdminDashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
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
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
         <Route path="/viewblogs" element={<Viewblog />} />
                   <Route path="/liked" element={<Likedblogs />} />

        {/*         
       
        <Route path="" element={<UserDashboard />} />
          <Route path="category" element={<Category />} />
          <Route path="liked" element={<Likedblogs />} /> */}
        <Route path="/admin" element={<AdminHome />}>
          <Route path="viewblogs" element={<Viewblog />} />
          <Route path="createblogs" element={<Blog />} />
          <Route path="" element={<AdminDashboard />} />
          <Route path="category" element={<Category />} />
          <Route path="liked" element={<Likedblogs />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
