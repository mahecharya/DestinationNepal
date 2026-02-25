import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";

// 🔹 Base URL for backend
const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const Blog = () => {
  const { id } = useParams();
  const isEditmode = Boolean(id);

  const [upblog, setUpblog] = useState({});
  const [categories, setCategories] = useState([]);

  // 🔹 Fetch single blog (for edit mode)
  const fetchBlog = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/blogs/find/${id}`);
      setUpblog(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // 🔹 Fetch categories from backend
  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/categories/all`);
      setCategories(res.data);
    } catch (error) {
      console.log("Category fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
    if (isEditmode) fetchBlog();
  }, [isEditmode]);

  // 🔹 Initial Values
  const initialValues = {
    title: upblog?.title || "",
    district: upblog?.district || "",
    state: upblog?.state || "",
    description: upblog?.description || "",
    category: upblog?.category || "",
    image: null,
  };

  // 🔹 Validation
  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    district: Yup.string().required("District is required"),
    state: Yup.string().required("State is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    image: isEditmode
      ? Yup.mixed()
      : Yup.mixed().required("Image is required"),
  });

  // 🔹 Submit
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login first");
        return;
      }

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("district", values.district);
      formData.append("state", values.state);
      formData.append("description", values.description);
      formData.append("category", values.category);
      if (values.image) formData.append("image", values.image);

      let response;

      if (isEditmode) {
        response = await axios.put(`${BASE_URL}/blogs/update/${id}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Blog updated successfully!");
      } else {
        response = await axios.post(`${BASE_URL}/blogs/create`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Blog created successfully!");
        resetForm();
      }

      console.log(response.data);
    } catch (error) {
      console.error("Submit error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 to-green-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {isEditmode ? "Update Blog" : "Create Blog"}
        </h2>

        <Formik
          enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4">

              <Field type="text" name="title" placeholder="Title" className="w-full border p-2 rounded" />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />

              <Field type="text" name="district" placeholder="District" className="w-full border p-2 rounded" />
              <ErrorMessage name="district" component="div" className="text-red-500 text-sm" />

              <Field type="text" name="state" placeholder="State" className="w-full border p-2 rounded" />
              <ErrorMessage name="state" component="div" className="text-red-500 text-sm" />

              <Field as="textarea" name="description" placeholder="Description" rows="3" className="w-full border p-2 rounded" />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />

              {/* Category */}
              <Field as="select" name="category" className="w-full border p-2 rounded">
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>{cat.name}</option>
                ))}
              </Field>
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />

              {/* Image Upload */}
              <input type="file" name="image" onChange={(e) => setFieldValue("image", e.currentTarget.files[0])} className="w-full" />
              <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />

              <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition">
                {isEditmode ? "Update Data" : "Submit Data"}
              </button>

            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Blog;