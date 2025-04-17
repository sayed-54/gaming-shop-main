import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../rtk/slices/cartSlice";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function AgeProducts() {
  const { age } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.products);

  const filteredProducts = products.filter((product) => product.age === age);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));

    Swal.fire({
      title: "Added to Cart! 🛒",
      text: `${product.title}  added to your cart.`,
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
    <div className="w-[90%] md:mt-[250px] mx-auto mt-[150px]">
      <h1 className="text-2xl font-bold text-[#0e2c6c] mb-6 text-center">
        Toys for Age {age} Years
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product._id}
              className="bg-white border border-gray-200 shadow-lg rounded-xl p-4 hover:shadow-xl transition"
            >
              <Link to={`/product/${product._id}`}>
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-40 object-cover rounded-lg"
                />
                <h2 className="text-lg font-semibold text-[#0e2c6c] mt-3 text-center">
                  {product.title}
                </h2>
              </Link>

              <p className="text-center text-gray-700 font-semibold mt-1">
                LE {product.price} EGP
              </p>

              <div className="flex justify-center mt-3">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="w-full px-4 py-2 bg-[#0e2c6c] text-white rounded-lg hover:bg-orange-600 transition flex items-center justify-center gap-2"
                >
                  🛒 Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center w-full">
            No toys available for this age group.
          </p>
        )}
      </div>
    </div>
  );
}

export default AgeProducts;
