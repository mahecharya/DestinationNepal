
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
      image: null,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      district: Yup.string().required("District is required"),
      state: Yup.string().required("State is required"),
      description: Yup.string().required("Description is required"),
      image: Yup.mixed().required("Image is required"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("district", values.district);
      formData.append("state", values.state);
      formData.append("description", values.description);
      formData.append("image", values.image);

      try {
        const res = await axios.post("http://localhost:5001/blogs/create", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        alert("Blog created successfully!");
        console.log(res.data);
      } catch (err) {
        console.error(err);
        alert("Error creating blog");
      }
    },
  });

  return (
  <div className="min-h-screen bg-linear-to-br from-slate-950 to-green-900 flex items-center justify-center">
  <div className=" bg-teal-100 p-8 rounded-2xl shadow-2xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4">Create Blog</h2>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          onChange={formik.handleChange}
          value={formik.values.title}
          className="w-full border p-2 rounded"
        />
        {formik.touched.title && formik.errors.title && (
          <div className="text-red-500">{formik.errors.title}</div>
        )}

        <input
          type="text"
          name="district"
          placeholder="District"
          onChange={formik.handleChange}
          value={formik.values.district}
          className="w-full border p-2 rounded"
        />
        {formik.touched.district && formik.errors.district && (
          <div className="text-red-500">{formik.errors.district}</div>
        )}

        <input
          type="text"
          name="state"
          placeholder="State"
          onChange={formik.handleChange}
          value={formik.values.state}
          className="w-full border p-2 rounded"
        />
        {formik.touched.state && formik.errors.state && (
          <div className="text-red-500">{formik.errors.state}</div>
        )}

        <textarea
          name="description"
          placeholder="Description"
          onChange={formik.handleChange}
          value={formik.values.description}
          className="w-full border p-2 rounded"
        />
        {formik.touched.description && formik.errors.description && (
          <div className="text-red-500">{formik.errors.description}</div>
        )}

        <input
          type="file"
          name="image"
          onChange={(event) => formik.setFieldValue("image", event.currentTarget.files[0])}
          className="w-full"
        />
        {formik.touched.image && formik.errors.image && (
          <div className="text-red-500">{formik.errors.image}</div>
        )}

        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
    </div>
  );
};

export default Blog;
