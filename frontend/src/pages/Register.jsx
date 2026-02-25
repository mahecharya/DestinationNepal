import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const Register = () => {
    const nav =useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      gender: "",
    },

    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "At least 3 characters")
        .required("Name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string()
        .min(6, "Minimum 6 characters")
        .required("Password is required"),
      age: Yup.number()
        .typeError("Age must be a number")
        .min(1, "Invalid age")
        .required("Age is required"),
      gender: Yup.string().required("Please select gender"),
    }),

    onSubmit: async(values, { resetForm }) => {

    try {
        const res=await axios.post(`https://destinationnepall.onrender.com/api/create`,values)
         console.log("Form Values:", values);
      alert("Form submitted successfully!\n" );
      resetForm();
    } catch (error) {
        console.log(error)
    }
 
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-950 to-blue-900">
      <div className="bg-gre p-8 rounded-2xl shadow-2xl bg-teal-100 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6">
          Register
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <input
              type="number"
              name="age"
              placeholder="Age"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.age}
            />
            {formik.touched.age && formik.errors.age && (
              <p className="text-red-500 text-sm">{formik.errors.age}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <p className="font-medium text-gray-700 mb-1">Gender</p>
            <div className="flex gap-4">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    onChange={formik.handleChange}
                    checked={formik.values.gender === g}
                    className="accent-indigo-600"
                  />
                  <span>{g}</span>
                </label>
              ))}
            </div>
            {formik.touched.gender && formik.errors.gender && (
              <p className="text-red-500 text-sm">{formik.errors.gender}</p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            onClick={()=>(nav("/validateotp"))}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
          >
            REGISTER
          </button>
           <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <span 
          onClick={()=>(
            nav("/login")
          )}
          className="text-indigo-600 font-medium cursor-pointer hover:underline">
            Login
          </span>
        </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
