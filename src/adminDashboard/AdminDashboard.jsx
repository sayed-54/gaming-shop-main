import { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  fetchProducts,
  addProduct,
  editProduct,
  deleteProduct,
} from "../rtk/slices/productsSlice";
import { logout } from "../rtk/slices/authSlice";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const admin = useSelector((state) => state.auth.admin);

  const [form, setForm] = useState({
    title: "",
    description: "", // ✅ Add this field
    image: "",
    category: "",
    price: "",
    gender: "",
    age: "",
  });

  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Redirect if not logged in
  useEffect(() => {
    if (!admin) {
      navigate("/login");
    } else {
      dispatch(fetchProducts());
    }
  }, [dispatch, admin, navigate]);

  const handleChange = (e) =>
    setForm((prevForm) => ({ ...prevForm, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      if (editing) {
        await dispatch(editProduct(form)).unwrap();
        setSuccess("Product updated successfully!");
      } else {
        await dispatch(addProduct(form)).unwrap();
        setSuccess("Product added successfully!");
      }
      setForm({
        id: "",
        title: "",
        image: "",
        category: "",
        price: "",
        gender: "",
        age: "",
      });
      setEditing(false);
    } catch (err) {
      setError(err || "Failed to save the product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setForm({
      id: product._id || product.id,
      title: product.title,
      description: product.description,
      image: product.image,
      category: product.category,
      price: product.price,
      gender: product.gender,
      age: product.age, // ✅ Ensure age is included
    });
    setEditing(true);
  };
  const handleDelete = (id) => {
    if (!id) {
      console.error("❌ Missing product ID for deletion!");
      return;
    }

    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-[150px]">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold text-[#0e2c6c]">Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>
      </div>

      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md mb-6"
      >
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={form.image}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="text"
          name="age"
          placeholder="age"
          value={form.age}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        />
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="border p-2 w-full mb-2"
          required
        >
          <option value="">Select Gender</option>
          <option value="boys">Boys</option>
          <option value="girls">Girls</option>
        </select>
        <button
          type="submit"
          className={`bg-[#ff8808] text-white px-4 py-2 rounded-lg hover:bg-[#e67606] ${
            loading && "opacity-50 cursor-not-allowed"
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : editing ? "Update Product" : "Add Product"}
        </button>
      </form>

      <table className="w-full bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2">Title</th>
            <th className="p-2">Price</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="3" className="p-4 text-center text-gray-500">
                No products available.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="p-2">
                  <Link to={`/product/${product._id}`}>{product.title}</Link>
                </td>
                <td className="p-2">${product.price}</td>
                <td className="p-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-500 text-white px-2 py-1 rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-2 py-1 rounded-md"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
