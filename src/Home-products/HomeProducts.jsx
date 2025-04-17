import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../rtk/slices/productsSlice";
import { Link } from "react-router-dom";

export default function HomeProducts() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Display only 6 products by default
  const displayedProducts = showAll ? products : products.slice(0, 6);

  return (
    <div className="container mx-auto p-4">
      {/* Section Title */}
      <h2 className="text-lg text-center text-yellow-500 font-semibold">
        Our Products
      </h2>
      <h1 className="text-3xl font-bold text-center text-[#0e2c6c] mb-6">
        All Products
      </h1>

      {/* Product Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 w-[90%] m-auto gap-4 sm:gap-6">
        {displayedProducts.map((product) => (
          <div key={product._id} className="text-center">
            <div className="relative">
              {/* Sold Out Badge */}
              {product.soldOut && (
                <span className="absolute top-2 left-2 bg-purple-700 text-white text-xs px-2 py-1 rounded">
                  Sold out
                </span>
              )}

              {/* Product Image */}
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                />
              </Link>
            </div>

            {/* Product Name */}
            <Link to={`/product/${product._id}`}>
              <h3 className="text-sm font-semibold mt-2 hover:text-[#0e2c6c]">
                {product.title}
              </h3>
            </Link>

            {/* Product Price */}
            <p className="text-[#0e2c6c] font-bold text-md mt-1">
              LE {product.price}.00 EGP
            </p>
          </div>
        ))}
      </div>

      {/* Show All Button */}
      {!showAll && products.length > 6 && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="bg-[#0e2c6c] text-white font-semibold px-6 py-2 rounded-lg hover:bg-purple-800 transition duration-300"
          >
            Show All Products
          </button>
        </div>
      )}
    </div>
  );
}
