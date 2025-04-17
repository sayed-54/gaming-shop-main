import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "./rtk/slices/authSlice";
import "./App.css";
import Footer from "./Footer/Footer";
import Header from "./head/Header";
import Info from "./info/Info";
import Navbar from "./Navbar/Navbar";
import OurProducts from "./our-products/OurProducts";
import Login from "./Login/Login";
import AllProducts from "./all-products/AllProducts";
import Filter from "./filter/Filter";
import { useState } from "react";
import ProductDetails from "./product-details/ProductDetails";
import Cart from "./cart/Cart_";
import Checkout from "./checkout/Checkout";
import BoysToys from "./forBoys/ForBoys";
import GirlsToys from "./forBoys/ForGirls";
import Mix from "./forBoys/Mix";
import AdminDashboard from "./adminDashboard/AdminDashboard";
import ProductForm from "./adminDashboard/ProductForm";
import Contact from "./contact/Contact";
import AgeProducts from "./ageProduct/AgeProducts";
// import BundlesOffer from "./bundles-offer/BundlesOffer";
import HomeProducts from "./Home-products/HomeProducts";
import Wheels from "./wheels/ActiveWheels";
import MovingText from "./moving-banner/MovingText";
import { MovingImage } from "./moving-banner/MovingImages";
import Smart from "./smart-play/Smart";

function App() {
  const [age, setAge] = useState("");
  const admin = useSelector((state) => state.auth.admin);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="app">
      <Navbar />
      {admin && (
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white p-2 rounded-md m-4"
        >
          Logout
        </button>
      )}
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Header />
              <MovingText />
              <OurProducts age={age} setAge={setAge} />
              <MovingImage />
              {/* <BundlesOffer /> */}
              <HomeProducts />
              <Info />
              <Footer />
            </div>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/products" element={<AllProducts />} />
        <Route path="/filter" element={<Filter age={age} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/boys" element={<BoysToys />} />
        <Route path="/girls" element={<GirlsToys />} />
        <Route path="/mix" element={<Mix />} />
        {/* <Route path="/bundles" element={<BundlesOffer />} /> */}
        <Route path="/wheels" element={<Wheels />} />
        <Route path="/smart" element={<Smart />} />
        <Route path="/age/:age" element={<AgeProducts />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route
          path="/admin/add"
          element={admin ? <ProductForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/admin/edit/:id"
          element={admin ? <ProductForm /> : <Navigate to="/login" />}
        />

        <Route
          path="/contact"
          element={
            <>
              <Contact /> <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
