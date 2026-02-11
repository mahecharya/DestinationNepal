import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import Blog from "./pages/Blog";
import Login from "./pages/Login";
import Likedblogs from "./pages/Likedblogs";
import Category from "./pages/Category";
import AdminHome from "./pages/adminHome";


const App = () => {
  return (
    <div>
      <Header />
    <Routes>
  {/* Public routes */}
  <Route path="/" element={<Homepage />} />
  <Route path="/register" element={<Register />} />
  <Route path="/login" element={<Login />} />

  
  <Route path="/admin" element={<AdminHome />}>
    <Route path="/admin/viewblogs" element={<Blog />} />
    <Route path="category" element={<Category />} />
    <Route path="liked" element={<Likedblogs />} />
  </Route>
</Routes>

      <Footer />
    </div>
  );
};

export default App;
