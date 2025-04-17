import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../rtk/slices/productsSlice";
import { addToCart } from "../rtk/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function BoysToys() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, status, error } = useSelector((state) => state.products);
  const [quantities, setQuantities] = useState({});
  const [sortType, setSortType] = useState("az");

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [status, dispatch]);

  const boysToys = products.filter((toy) => toy.gender === "boys");

  // Sorting logic
  const sortedToys = [...boysToys].sort((a, b) => {
    switch (sortType) {
      case "az":
        return a.title.localeCompare(b.title);
      case "za":
        return b.title.localeCompare(a.title);
      case "low-high":
        return a.price - b.price;
      case "high-low":
        return b.price - a.price;
      default:
        return 0;
    }
  });

  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value > 0 ? value : 1,
    }));
  };

  const handleAddToCart = (toy) => {
    const quantity = quantities[toy._id] || 1;
    dispatch(addToCart({ ...toy, id: toy._id, quantity }));

    // SweetAlert Confirmation
    Swal.fire({
      title: "Added to Cart! 🛒",
      text: `${toy.title} (${quantity} pcs) added to your cart.`,
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Go to Cart",
      cancelButtonText: "Continue Shopping",
      confirmButtonColor: "#0e2c6c",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/cart"); // ✅ Navigate correctly
      }
    });
  };

  return (
    <div className="p-6 mt-[200px]">
      <h2 className="text-3xl font-bold text-blue-700 mb-4 text-center">
        🚗 Boys' Toys
      </h2>

      {/* Error Handling */}
      {status === "failed" && (
        <p className="text-red-500 text-center font-bold">{error}</p>
      )}

      {/* Loading Indicator */}
      {status === "loading" && (
        <p className="text-center text-blue-600 font-bold">Loading...</p>
      )}

      {/* Sorting Dropdown */}
      <div className="flex justify-end mb-4">
        <label className="mr-2 font-medium text-gray-700">Sort by:</label>
        <select
          className="border border-gray-300 rounded-md px-2 py-1"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="az">Alphabetically, A-Z</option>
          <option value="za">Alphabetically, Z-A</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {sortedToys.length > 0 ? (
          sortedToys.map((toy) => (
            <div
              key={toy._id}
              className="bg-white p-4 rounded-lg shadow-lg flex flex-col items-center h-full"
            >
              {/* Clickable Image */}
              <Link
                to={`/product/${toy._id}`}
                className="w-full h-40 overflow-hidden rounded-lg"
              >
                <img
                  src={toy.image}
                  alt={toy.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </Link>

              {/* Clickable Title */}
              <Link to={`/product/${toy._id}`}>
                <h3 className="text-lg font-semibold mt-2 text-center hover:text-blue-600">
                  {toy.title}
                </h3>
              </Link>

              <p className="text-gray-700 font-bold">LE {toy.price} EGP</p>

              {/* Quantity Controls */}
              <div className="flex items-center space-x-2 mt-2">
                <button
                  className="px-3 py-1 bg-red-400 text-white rounded-lg"
                  onClick={() =>
                    handleQuantityChange(
                      toy._id,
                      (quantities[toy._id] || 1) - 1
                    )
                  }
                >
                  ➖
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantities[toy._id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(toy._id, parseInt(e.target.value))
                  }
                  className="w-12 text-center border border-gray-300 rounded-lg"
                />
                <button
                  className="px-3 py-1 bg-green-400 text-white rounded-lg"
                  onClick={() =>
                    handleQuantityChange(
                      toy._id,
                      (quantities[toy._id] || 1) + 1
                    )
                  }
                >
                  ➕
                </button>
              </div>

              {/* Push button to the bottom */}
              <div className="flex-grow"></div>

              {/* Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(toy)}
                className="mt-3 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition flex items-center justify-center w-full"
              >
                <span className="text-center w-full">🛒 Add to Cart</span>
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No toys available for boys.
          </p>
        )}
      </div>
    </div>
  );
}
