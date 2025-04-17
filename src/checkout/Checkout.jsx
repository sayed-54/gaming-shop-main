import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../rtk/slices/cartSlice";

export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  });
  const [address, setAddress] = useState({
    fullName: "",
    phone: "",
    streetAddress: "",
    governorate: "",
  });

  // Egyptian governorates with their delivery fees in EGP
  // const governorates = [
  //   { name: "Cairo", fee: 79 },
  //   { name: "Giza", fee: 79 },
  //   { name: "Alexandria", fee: 89 },
  //   { name: "Albehira", fee: 89 },
  //   { name: "Luxor", fee: 120 },
  //   { name: "Aswan", fee: 130 },
  //   { name: "Sharm El Sheikh", fee: 140 },
  //   { name: "Port Said", fee: 90 },
  //   { name: "Suez", fee: 85 },
  //   { name: "Ismailia", fee: 80 },
  //   { name: "Mansoura", fee: 95 },
  // ];
  const governorates = [
    { name: "القاهرة", fee: 79 },
    { name: "الجيزة", fee: 79 },
    { name: "الإسكندرية", fee: 89 },
    { name: "البحيرة", fee: 89 },
    { name: "الدقهلية", fee: 89 },
    { name: "الشرقية", fee: 89 },
    { name: "المنوفية", fee: 89 },
    { name: "القليوبية", fee: 89 },
    { name: "الغربية", fee: 89 },
    { name: "كفر الشيخ", fee: 89 },
    { name: "دمياط", fee: 89 },
    { name: "بورسعيد", fee: 89 },
    { name: "الإسماعيلية", fee: 89 },
    { name: "السويس", fee: 89 },
    { name: "الفيوم", fee: 110 },
    { name: "بني سويف", fee: 110 },
    { name: "المنيا", fee: 110 },
    { name: "أسيوط", fee: 110 },
    { name: "سوهاج", fee: 110 },
    { name: "قنا", fee: 120 },
    { name: "الأقصر", fee: 120 },
    { name: "أسوان", fee: 120 },
    { name: "البحر الأحمر", fee: 120 },
    { name: "الوادي الجديد", fee: 130 },
    { name: "مطروح", fee: 120 },
    { name: "شمال سيناء", fee: 130 },
    { name: "جنوب سيناء", fee: 130 },
  ];

  const cartItems = useSelector((state) => state.cart?.cartItems || []);
  const subtotalPrice = useSelector((state) => state.cart?.totalPrice || 0);
  const dispatch = useDispatch();

  // Calculate delivery fee based on selected governorate
  const getDeliveryFee = () => {
    if (!address.governorate) return 0;
    const selectedGovernorate = governorates.find(
      (g) => g.name === address.governorate
    );
    return selectedGovernorate ? selectedGovernorate.fee : 0;
  };

  // Calculate total price including delivery fee
  const deliveryFee = getDeliveryFee();
  const totalPrice = subtotalPrice + deliveryFee;

  const handlePaymentChange = (method) => {
    setPaymentMethod(method);
    if (method === "cash") {
      setCardDetails({ cardNumber: "", expiryDate: "", cvv: "", name: "" });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name in cardDetails) {
      setCardDetails({ ...cardDetails, [name]: value });
    } else {
      setAddress({ ...address, [name]: value });
    }
  };

  // Create a direct WhatsApp URL that works with API
  const getDirectWhatsAppLink = () => {
    // WhatsApp phone number (no plus sign)
    const phoneNumber = "201002726498";

    // Create a very simple message
    let items = "";
    if (cartItems && cartItems.length > 0) {
      items = cartItems
        .map((item) => `${item.title} x${item.quantity}`)
        .join(", ");
    }

    const message = `Order: ${items}. Total: ${totalPrice} EGP (delivery: ${deliveryFee} EGP). Payment: ${
      paymentMethod === "cash" ? "Cash on Delivery" : "Credit Card"
    }. ${
      paymentMethod === "cash"
        ? `Delivery to: ${address.fullName}, ${address.phone}, ${address.streetAddress}, ${address.governorate}`
        : ""
    }`;

    // For mobile devices - use the direct WhatsApp app URL
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      return `whatsapp://send?phone=${phoneNumber}&text=${encodeURIComponent(
        message
      )}`;
    }

    // For desktop - use the web version
    return `https://web.whatsapp.com/send?phone=${phoneNumber}&text=${encodeURIComponent(
      message
    )}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cartItems || cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    if (
      paymentMethod === "cash" &&
      (!address.fullName ||
        !address.phone ||
        !address.streetAddress ||
        !address.governorate)
    ) {
      alert("Please fill in all delivery details including governorate.");
      return;
    }

    if (
      paymentMethod === "credit" &&
      (!cardDetails.cardNumber ||
        !cardDetails.expiryDate ||
        !cardDetails.cvv ||
        !cardDetails.name)
    ) {
      alert("Please fill in all credit card details.");
      return;
    }

    // Save order info to localStorage as backup
    const orderDetails = {
      items: cartItems,
      subtotal: subtotalPrice,
      delivery: deliveryFee,
      total: totalPrice,
      paymentMethod,
      address: paymentMethod === "cash" ? address : null,
      orderTime: new Date().toISOString(),
    };

    localStorage.setItem("lastOrder", JSON.stringify(orderDetails));

    // Create the WhatsApp URL
    const whatsAppUrl = getDirectWhatsAppLink();

    // Clear the cart first
    dispatch(clearCart());

    // Use a combination approach: try window.location first,
    // then fallback to window.open if needed
    if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      // On mobile, create a real link and trigger it
      const link = document.createElement("a");
      link.href = whatsAppUrl;
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // On desktop, open in new tab
      window.open(whatsAppUrl, "_blank");
    }

    // Show confirmation
    alert(
      "Order placed successfully! Opening WhatsApp to send your order details. If WhatsApp doesn't open automatically, please check your browser settings."
    );
  };

  const handleNotifyClick = (e) => {
    e.preventDefault();
    alert(
      "Thank you! We'll notify you when more payment options become available."
    );
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg mt-[100px]">
      <h2 className="text-2xl font-bold text-center mb-6">Checkout</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Payment Method Selection with Coming Soon Feature */}
        <div>
          <label className="block text-lg font-semibold mb-2">
            Payment Method
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button
              type="button"
              className={`px-4 py-2 rounded-md ${
                paymentMethod === "cash"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handlePaymentChange("cash")}
            >
              Cash on Delivery
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-md ${
                paymentMethod === "credit"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200"
              }`}
              onClick={() => handlePaymentChange("credit")}
            >
              Credit Card
            </button>

            {/* Coming Soon - Digital Wallets */}
            <div className="relative md:col-span-2 mt-2">
              <div className="border-2 border-dashed border-amber-500 bg-amber-50 rounded-md p-3 flex justify-between items-center">
                <div>
                  <span className="absolute -top-3 left-4 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    COMING SOON
                  </span>
                  <h3 className="font-medium text-gray-800 mt-1">
                    Digital Wallets
                  </h3>
                  <p className="text-sm text-gray-600">
                    Pay with Apple Pay, Google Pay, and more
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleNotifyClick}
                  className="bg-white border border-amber-500 text-amber-600 px-3 py-1 rounded-md text-sm hover:bg-amber-500 hover:text-white transition-colors"
                >
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Address Fields (Only for Cash on Delivery) */}
        {paymentMethod === "cash" && (
          <div className="space-y-3">
            <div>
              <label className="block font-medium">Full Name</label>
              <input
                type="text"
                name="fullName"
                value={address.fullName}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Phone Number</label>
              <input
                type="text"
                name="phone"
                value={address.phone}
                onChange={handleInputChange}
                placeholder="+20 123 456 7890"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Street Address</label>
              <input
                type="text"
                name="streetAddress"
                value={address.streetAddress}
                onChange={handleInputChange}
                placeholder="123 Main St, City"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block font-medium">Governorate</label>
              <select
                name="governorate"
                value={address.governorate}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-md"
                required
              >
                <option value="">Select Governorate</option>
                {governorates.map((gov) => (
                  <option key={gov.name} value={gov.name}>
                    {gov.name} - Delivery: EGP{gov.fee}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Credit Card Fields (Only for Credit Card Payment) */}
        {paymentMethod === "credit" && (
          <div className="space-y-3">
            <div>
              <label className="block font-medium">Card Number</label>
              <input
                type="text"
                name="cardNumber"
                value={cardDetails.cardNumber}
                onChange={handleInputChange}
                placeholder="1234 5678 9012 3456"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-medium">Expiry Date</label>
                <input
                  type="text"
                  name="expiryDate"
                  value={cardDetails.expiryDate}
                  onChange={handleInputChange}
                  placeholder="MM/YY"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block font-medium">CVV</label>
                <input
                  type="text"
                  name="cvv"
                  value={cardDetails.cvv}
                  onChange={handleInputChange}
                  placeholder="123"
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block font-medium">Name on Card</label>
              <input
                type="text"
                name="name"
                value={cardDetails.name}
                onChange={handleInputChange}
                placeholder="John Doe"
                className="w-full p-2 border rounded-md"
                required
              />
            </div>

            {/* Coming Soon - Installment Options */}
            <div className="relative mt-4">
              <div className="border-2 border-dashed border-indigo-500 bg-indigo-50 rounded-md p-3 flex justify-between items-center">
                <div>
                  <span className="absolute -top-3 left-4 bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                    COMING SOON
                  </span>
                  <h3 className="font-medium text-gray-800 mt-1">
                    Installment Options
                  </h3>
                  <p className="text-sm text-gray-600">
                    Pay in 3, 6, or 12 monthly installments
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleNotifyClick}
                  className="bg-white border border-indigo-500 text-indigo-600 px-3 py-1 rounded-md text-sm hover:bg-indigo-500 hover:text-white transition-colors"
                >
                  Notify Me
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="mt-6 p-4 bg-gray-50 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
          {cartItems && cartItems.length > 0 ? (
            <>
              <div className="max-h-40 overflow-y-auto mb-3">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-sm py-1"
                  >
                    <span>
                      {item.title} x{item.quantity}
                    </span>
                    <span>EGP{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>EGP{subtotalPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Fee:</span>
                <span>EGP{deliveryFee}</span>
              </div>
              <div className="flex justify-between font-bold mt-2 pt-2 border-t border-gray-300">
                <span>Total:</span>
                <span>EGP{totalPrice}</span>
              </div>
            </>
          ) : (
            <p className="text-red-500">Your cart is empty</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Confirm Order
        </button>
      </form>

      {/* Manual WhatsApp Fallback Button */}
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500 mb-2">
          If automatic WhatsApp opening doesn't work:
        </p>
        <a
          href={`https://wa.me/201002726498`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          Click here to open WhatsApp manually
        </a>
        <p className="text-xs text-gray-400 mt-1">
          (You'll need to copy-paste your order details)
        </p>
      </div>
    </div>
  );
}
