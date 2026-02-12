import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Blog = () => {
  const formik = useFormik({
    initialValues: {
      title: "",
      district: "",
      state: "",
      description: "",
      category: "",
      image: null,
    },

    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      district: Yup.string().required("District is required"),
      state: Yup.string().required("State is required"),
      description: Yup.string().required("Description is required"),
      category: Yup.string().required("Category is required"),
      image: Yup.mixed().required("Image is required"),
    }),

    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("district", values.district);
      formData.append("state", values.state);
      formData.append("description", values.description);
      formData.append("category", values.category);
      formData.append("image", values.image);

      try {
        // ✅ Get token from localStorage
        const token = localStorage.getItem("token");

        if (!token) {
          alert("Please login first!");
          return;
        }

        const res = await axios.post(
          "http://localhost:5001/blogs/create",
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`, // ✅ FIX 401 ERROR
            },
          }
        );

        alert("Blog created successfully!");
        console.log(res.data);

        resetForm();

      } catch (err) {
        console.error(err.response?.data || err.message);
        alert("Error creating blog");
      }
    },
  });

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-950 to-green-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Blog
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">

          {/* Title */}
          <input
            type="text"
            name="title"
            placeholder="Title"
            onChange={formik.handleChange}
            value={formik.values.title}
            className="w-full border p-2 rounded"
          />
          {formik.touched.title && formik.errors.title && (
            <div className="text-red-500 text-sm">{formik.errors.title}</div>
          )}

          {/* District */}
          <input
            type="text"
            name="district"
            placeholder="District"
            onChange={formik.handleChange}
            value={formik.values.district}
            className="w-full border p-2 rounded"
          />

          {/* State */}
          <input
            type="text"
            name="state"
            placeholder="State"
            onChange={formik.handleChange}
            value={formik.values.state}
            className="w-full border p-2 rounded"
          />

          {/* Description */}
          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            onChange={formik.handleChange}
            value={formik.values.description}
            className="w-full border p-2 rounded"
          />

          {/* Category */}
          <select
            name="category"
            onChange={formik.handleChange}
            value={formik.values.category}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Category</option>
            <option value="Religious">Religious</option>
            <option value="Trekking">Trekking</option>
            <option value="Mountains">Mountains</option>
            <option value="Nature">Nature and Greenery</option>
          </select>
          {formik.touched.category && formik.errors.category && (
            <div className="text-red-500 text-sm">{formik.errors.category}</div>
          )}

          {/* Image Upload */}
          <input
            type="file"
            name="image"
            onChange={(event) =>
              formik.setFieldValue("image", event.currentTarget.files[0])
            }
            className="w-full"
          />
          {formik.touched.image && formik.errors.image && (
            <div className="text-red-500 text-sm">{formik.errors.image}</div>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  );
};

export default Blog;
