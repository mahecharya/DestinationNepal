import React, { useEffect, useState } from "react";
import axios from "axios";

const ManageCategory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryName, setCategoryName] = useState("");

  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://destinationnepall.onrender.com/categories/all");
      setCategories(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!categoryName) {
      return alert("Enter category name");
    }

    try {
      await axios.post(
        "https://destinationnepall.onrender.com/categories/create",
        { name: categoryName },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Category added");
      setCategoryName("");
      fetchCategories();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://destinationnepall.onrender.com/categories/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Category deleted");
      fetchCategories();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">

        <h2 className="text-2xl font-bold mb-4">Manage Categories</h2>

        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            placeholder="Enter category name"
            className="border p-2 flex-1 rounded"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 rounded"
          >
            Add
          </button>
        </form>

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">Category Name</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {categories.map((cat) => (
              <tr key={cat._id}>
                <td className="border p-2">{cat.name}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDelete(cat._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

        </table>

      </div>
    </div>
  );
};

export default ManageCategory;
