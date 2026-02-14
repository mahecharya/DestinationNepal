import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom"; 
import { useDispatch } from "react-redux";
import { setToken } from "./redux/feature/Userauthenticate";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Viewblog from "./pages/Viewblog";
import BlogDetail from "./pages/Blogdetail";
import Likedblogs from "./pages/Likedblogs";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="contact" element={<Contact />} />

          <Route path="blogs/:id" element={<BlogDetail />} />
          <Route path="viewblogs" element={<Viewblog />} />
          <Route path="liked" element={<Likedblogs />} />
          <Route path="createblogs" element={<Blog />} />
                    <Route path="createblogs/:id" element={<Blog />} />

        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
