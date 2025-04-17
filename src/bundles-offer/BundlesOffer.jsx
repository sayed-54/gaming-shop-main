import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../rtk/slices/productsSlice";
import { addToCart } from "../rtk/slices/cartSlice";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { FaShoppingCart, FaEye, FaRegHeart } from "react-icons/fa";

export default function BundlesOffer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleAddToCart = (product, e) => {
    e.preventDefault();
    e.stopPropagation();

    dispatch(addToCart({ ...product, id: product._id, quantity: 1 }));

    Swal.fire({
      title: "Added to Cart! 🛒",
      text: `${product.title} added to your cart.`,
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

  const showMoreProducts = () => {
    setVisibleCount((prevCount) => prevCount + 6);
  };

  return (
    <div className="container mx-auto p-4 mt-24">
      <div className="text-center mb-12 relative">
        <h2 className="text-lg text-yellow-500 font-semibold pt-4">
          Our Products
        </h2>
        <h1 className="text-4xl font-bold text-[#0e2c6c] mt-2">
          Bundles Offer
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.slice(0, visibleCount).map((product) => (
          <div
            key={product._id}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col h-100"
          >
            <Link to={`/product/${product._id}`} className="block h-full">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            </Link>
            <div className="p-4 flex flex-col flex-grow justify-between">
              <h3 className="text-lg font-semibold text-gray-800 hover:text-[#0e2c6c] transition-colors duration-200 h-12 line-clamp-2">
                {product.title}
              </h3>
              <div className="mt-2 flex items-center justify-between">
                <p className="text-xl font-bold text-[#0e2c6c]">
                  LE {product.price} EGP
                </p>
                <button
                  className="flex items-center justify-center w-10 h-10 bg-[#0e2c6c] hover:bg-yellow-500 text-white rounded-full shadow-md transition-colors duration-300"
                  onClick={(e) => handleAddToCart(product, e)}
                >
                  <FaShoppingCart size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {visibleCount < products.length && (
        <div className="text-center mt-8">
          <button
            className="px-6 py-3 bg-[#0e2c6c] text-white font-semibold rounded-md shadow-md transition duration-300"
            onClick={showMoreProducts}
          >
            Show More
          </button>
        </div>
      )}
    </div>
  );
}
