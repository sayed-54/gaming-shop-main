import { useSelector, useDispatch } from "react-redux";
import {
  removeFromCart,
  updateQuantity,
  clearCart,
} from "../rtk/slices/cartSlice";
import { Link } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const totalPrice = useSelector((state) => state.cart?.totalPrice || 0);

  if (!cartItems.length) {
    return (
      <h2 className="text-center text-lg font-bold mt-10">
        🛒 Your cart is empty!
      </h2>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto mt-[150px]">
      <h1 className="text-2xl sm:text-3xl font-bold text-center text-blue-700">
        🛍️ Shopping Cart
      </h1>

      {cartItems.map((item) => (
        <div
          key={item._id}
          className="flex flex-wrap sm:flex-nowrap items-center justify-between bg-white p-4 rounded-lg shadow-md mt-4"
        >
          {/* Product Image */}
          <img
            src={item.image}
            alt={item.title}
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg object-cover"
          />

          {/* Product Title */}
          <h2 className="text-md sm:text-lg font-semibold flex-1 text-center sm:text-left px-2">
            {item.title}
          </h2>

          {/* Price & Quantity Controls */}
          <div className="flex flex-col sm:flex-row items-center sm:space-x-4">
            <p className="text-gray-700 text-sm sm:text-md">
              ${item.price} x {item.quantity}
            </p>

            <div className="flex items-center bg-gray-100 p-1 rounded-lg">
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({
                      id: item.id,
                      quantity: Math.max(1, item.quantity - 1),
                    })
                  )
                }
                className="px-3 py-1 bg-red-500 text-white rounded-l-lg text-lg hover:bg-red-600 transition"
              >
                ➖
              </button>
              <span className="px-4 text-lg">{item.quantity}</span>
              <button
                onClick={() =>
                  dispatch(
                    updateQuantity({ id: item.id, quantity: item.quantity + 1 })
                  )
                }
                className="px-3 py-1 bg-green-500 text-white rounded-r-lg text-lg hover:bg-green-600 transition"
              >
                ➕
              </button>
            </div>
          </div>

          {/* Remove Item */}
          <button
            onClick={() => dispatch(removeFromCart(item.id))}
            className="bg-red-500 text-white  px-3 py-1 rounded-lg mt-5 sm:mt-0 hover:bg-red-600 transition"
          >
            🗑️
          </button>
        </div>
      ))}

      {/* Cart Footer */}
      <div className="text-right mt-6">
        <h2 className="text-xl font-bold">Total: LE {totalPrice.toFixed(2)}</h2>
        <button
          onClick={() => dispatch(clearCart())}
          className="bg-gray-800 text-white px-6 py-2 rounded-lg mt-4 hover:bg-gray-900 transition"
        >
          🧹 Clear Cart
        </button>
        <button className="bg-gray-800 text-white px-6 py-2 rounded-lg mt-4 hover:bg-gray-900 transition">
          <Link to="/checkout">checkout</Link>
        </button>
      </div>
    </div>
  );
}
