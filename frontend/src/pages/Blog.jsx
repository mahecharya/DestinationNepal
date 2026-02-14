import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useParams } from "react-router-dom";

const Blog = () => {
  const { id } = useParams();
  const isEditmode = Boolean(id);

  const [upblog, setUpblog] = useState([]);

const fetchData = async () => {
    try {
      const res = await axios.get(`http://localhost:5001/blogs/find/${id}`);
      console.log(res.data);
      setUpblog(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (isEditmode) {
      fetchData();
    }
  }, [isEditmode]);


  const initialValues = isEditmode
  ? {
      title: upblog?.title || "",
      district: upblog?.district || "",
      state: upblog?.state || "",
      description: upblog?.description || "",
      category: upblog?.category || "",
      image: null,
    }
  : {
      title: "",
      district: "",
      state: "",
      description: "",
      category: "",
      image: null,
    };

  

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    district: Yup.string().required("District is required"),
    state: Yup.string().required("State is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.string().required("Category is required"),
    image: Yup.mixed().required("Image is required"),
  });

 const handleSubmit = async (values, { resetForm }) => {
  try {
    const token = localStorage.getItem("token");

    if (!token) {
      alert("Please login first");
      return;
    }

    const formData = new FormData();

    // Text fields
    formData.append("title", values.title);
    formData.append("district", values.district);
    formData.append("state", values.state);
    formData.append("description", values.description);
    formData.append("category", values.category);

    // Image (only if selected)
    if (values.image) {
      formData.append("image", values.image);
    }

    let response;

    // 🔹 UPDATE MODE
    if (isEditmode) {
      response = await axios.put(
        `http://localhost:5001/blogs/update/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Blog updated successfully!");
    }

    // 🔹 CREATE MODE
    else {
      response = await axios.post(
        "http://localhost:5001/blogs/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
    <div className="min-h-screen bg-linear-to-br from-slate-950 to-green-900 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Create Blog
        </h2>

        <Formik
        enableReinitialize
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ setFieldValue }) => (
            <Form className="space-y-4">

              {/* Title */}
              <Field
                type="text"
                name="title"
                placeholder="Title"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage name="title" component="div" className="text-red-500 text-sm" />

              {/* District */}
              <Field
                type="text"
                name="district"
                placeholder="District"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage name="district" component="div" className="text-red-500 text-sm" />

              {/* State */}
              <Field
                type="text"
                name="state"
                placeholder="State"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage name="state" component="div" className="text-red-500 text-sm" />

              {/* Description */}
              <Field
                as="textarea"
                name="description"
                placeholder="Description"
                rows="3"
                className="w-full border p-2 rounded"
              />
              <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />

              {/* Category */}
              <Field
                as="select"
                name="category"
                className="w-full border p-2 rounded"
              >
                <option value="">Select Category</option>
                <option value="Religious">Religious</option>
                <option value="Trekking">Trekking</option>
                <option value="Mountains">Mountains</option>
                <option value="Nature">Nature and Greenery</option>
              </Field>
              <ErrorMessage name="category" component="div" className="text-red-500 text-sm" />

              {/* Image Upload */}
              <input
                type="file"
                name="image"
                onChange={(event) =>
                  setFieldValue("image", event.currentTarget.files[0])
                }
                className="w-full"
              />
              <ErrorMessage name="image" component="div" className="text-red-500 text-sm" />

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700 transition"
              >
                {isEditmode?"Update Data":"Submit Data"}
              </button>

            </Form>
          )}
        </Formik>

      </div>
    </div>
  );
};

export default Blog;
