import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../rtk/slices/productsSlice";
import { addToCart } from "../rtk/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Mix() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value > 0 ? value : 1, // Prevent negative values
    }));
  };

  const handleAddToCart = (product) => {
    const quantity = quantities[product._id] || 1;
    dispatch(addToCart({ ...product, quantity }));

    // SweetAlert Confirmation
    Swal.fire({
      title: "Added to Cart! 🛒",
      text: `${product.title} (${quantity} pcs) added to your cart.`,
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Go to Cart",
      cancelButtonText: "Continue Shopping",
      confirmButtonColor: "#0e2c6c",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/cart");
      }
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">
        🧸 Our Toy Collection
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-4 flex flex-col items-center"
          >
            {/* Product Image */}
            <div className="w-full h-40 sm:h-48 overflow-hidden rounded-lg">
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </Link>
            </div>

            {/* Product Info */}
            <h3 className="text-lg font-semibold mt-3 text-center">
              {product.title}
            </h3>
            <p className="text-gray-600 text-lg font-bold mt-1">
              ${product.price}
            </p>

            {/* Quantity Selector */}
            <div className="flex items-center mt-3 space-x-2">
              <button
                className="px-3 py-1 bg-red-400 text-white rounded-l-lg text-lg"
                onClick={() =>
                  handleQuantityChange(
                    product._id,
                    (quantities[product._id] || 1) - 1
                  )
                }
              >
                ➖
              </button>
              <input
                type="number"
                min="1"
                value={quantities[product._id] || 1}
                onChange={(e) =>
                  handleQuantityChange(product._id, parseInt(e.target.value))
                }
                className="w-12 text-center border border-gray-300 rounded-lg"
              />
              <button
                className="px-3 py-1 bg-green-400 text-white rounded-r-lg text-lg"
                onClick={() =>
                  handleQuantityChange(
                    product._id,
                    (quantities[product._id] || 1) + 1
                  )
                }
              >
                ➕
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-lg text-lg font-medium"
              onClick={() => handleAddToCart(product)}
            >
              🛒 Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
