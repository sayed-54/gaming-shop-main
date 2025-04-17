import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addToCart } from "../rtk/slices/cartSlice"; // ✅ Import Redux action
import { FaShoppingCart } from "react-icons/fa"; // ✅ Shopping Cart Icon
import Swal from "sweetalert2"; // ✅ Import SweetAlert

export default function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const token = localStorage.getItem("token");

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    Swal.fire({
      icon: "success",
      title: "Added to Cart!",
      text: `${product.title} has been added to your cart.`,
      showCancelButton: true,
      confirmButtonText: "Go to Cart",
      cancelButtonText: "Continue Shopping",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/cart");
      }
    });
  };

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `https://e-commerce-eight-blond.vercel.app/api/v1/products/${id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        const data = await response.json();
        if (!data || !data.data) throw new Error("Product not found!");
        setProduct(data.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading)
    return (
      <div className="text-center text-lg font-semibold mt-10">
        ⏳ Loading...
      </div>
    );
  if (error)
    return (
      <div className="text-center text-red-500 font-bold mt-10">{error}</div>
    );
  if (!product)
    return (
      <div className="text-center text-gray-600 font-semibold mt-10">
        No product found.
      </div>
    );

  return (
    <div className="flex justify-center items-center mt-[100px] min-h-screen bg-gray-100">
      <div className="bg-white rounded-3xl shadow-lg p-6">
        {/* Product Image */}
        <div className="rounded-xl overflow-hidden">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-80 object-cover"
          />
        </div>

        {/* Product Details */}
        <div className="text-center mt-4">
          <h1 className="text-xl font-bold text-gray-900">{product.title}</h1>
          <p className="text-lg font-semibold text-gray-700 mt-1">
            {product.price} LE
          </p>
          <p className="text-l font-semibold text-gray-900">
            {product.description}
          </p>
        </div>

        {/* Quantity Selector */}
        <div className="flex justify-center items-center mt-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-l"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            −
          </button>
          <span className="px-5 py-2 bg-gray-100 text-lg font-semibold">
            {quantity}
          </span>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-r"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="mt-5 w-[50%] m-auto bg-[#0e2c6c] hover:bg-yellow-500 text-[#fff] font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition"
        >
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
    </div>
  );
}
