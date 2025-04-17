import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../rtk/slices/productsSlice";
import { addToCart } from "../rtk/slices/cartSlice";
import { Link } from "react-router-dom";

// eslint-disable-next-line react/prop-types
export default function Filter({ age }) {
  const dispatch = useDispatch();
  const { products, status } = useSelector((state) => state.products);
  const [quantities, setQuantities] = useState({});
  const [sortType, setSortType] = useState("az");

  // Fetch products on mount or when category changes
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  // Filter products by selected category
  const filteredProducts = products.filter((product) => product.age == age);

  // Sorting logic
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortType === "az") return a.title.localeCompare(b.title);
    if (sortType === "za") return b.title.localeCompare(a.title);
    if (sortType === "low-high") return a.price - b.price;
    if (sortType === "high-low") return b.price - a.price;
    return 0;
  });

  // Handle quantity changes
  const handleQuantityChange = (id, value) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: value > 0 ? value : 1,
    }));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-[#0e2c6c] mb-6">
        Products in Category: <span className="text-[#ff8808]">{age}</span>
      </h1>

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

      {/* Status Messages */}
      {status === "loading" && <p className="text-center">Loading...</p>}
      {status === "failed" && (
        <p className="text-center text-red-500">Failed to load products.</p>
      )}

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedProducts.map((toy) => (
            <div
              key={toy._id}
              className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center text-center transition-transform transform hover:scale-105 duration-300"
            >
              <Link to={`/product/${toy._id}`}>
                <img
                  src={toy.image}
                  alt={toy.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <h2 className="text-lg font-semibold text-[#0e2c6c]">
                  {toy.title}
                </h2>
                <p className="text-gray-500 font-medium mt-2">
                  LE {toy.price} EGP
                </p>
              </Link>

              {/* Quantity Selector */}
              <div className="flex items-center mt-3 space-x-2">
                <button
                  className="px-3 py-1 bg-red-400 text-white rounded-l-lg"
                  onClick={() =>
                    handleQuantityChange(toy.id, (quantities[toy.id] || 1) - 1)
                  }
                >
                  ➖
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantities[toy.id] || 1}
                  onChange={(e) =>
                    handleQuantityChange(toy.id, parseInt(e.target.value))
                  }
                  className="w-12 text-center border border-gray-300 rounded-lg"
                />
                <button
                  className="px-3 py-1 bg-green-400 text-white rounded-r-lg"
                  onClick={() =>
                    handleQuantityChange(toy.id, (quantities[toy.id] || 1) + 1)
                  }
                >
                  ➕
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                className="mt-4 bg-[#ff8808] hover:bg-[#e67606] text-white w-full py-2 rounded-lg flex items-center justify-center space-x-2 font-medium"
                onClick={() =>
                  dispatch(
                    addToCart({
                      ...toy,
                      quantity: quantities[toy.id] || 1,
                    })
                  )
                }
              >
                <span>🛒</span>
                <span>Add to Cart</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
