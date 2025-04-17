import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { IoCall } from "react-icons/io5";
import {
  FaUser,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaSignOutAlt,
} from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { GiCardboardBox } from "react-icons/gi";
import { BsBoxSeam } from "react-icons/bs";
import { logout } from "../rtk/slices/authSlice";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownAgeOpen, setDropdownAgeOpen] = useState(false);
  const menuRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const cartCount = cartItems?.length || 0;
  const admin = useSelector((state) => state.auth.admin);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      if (menuOpen) return;
      setVisible(currentScroll < lastScroll || currentScroll === 0);
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen, lastScroll]);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav
      className={`bg-white shadow-md p-4 fixed w-full top-0 left-0 transition-transform duration-300 z-50 ${
        visible || menuOpen ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="w-1/3">
          <Link to="/">
            <img src="/3.png" alt="Game Shop Logo" className="w-[40%] h-[50%]" />
          </Link>
        </div>

        {/* Centered Desktop Dropdowns */}
        <div className="hidden md:flex justify-center gap-10 w-1/3 relative">
          {/* Categories Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <button className="flex items-center gap-2 font-semibold text-[#0e2c6c]">
              Categories <span className="text-gray-400">▼</span>
            </button>
            {dropdownOpen && (
              <ul className="absolute left-0 top-full bg-white shadow-lg rounded-lg mt-2 p-2 w-48 z-50">
                <li><Link to="/wheels" className="block p-2 hover:bg-gray-100">Active wheels</Link></li>
                <li><Link to="/smart" className="block p-2 hover:bg-gray-100">Smart play</Link></li>
                <li><Link to="/boys" className="block p-2 hover:bg-gray-100">For boys</Link></li>
                <li><Link to="/girls" className="block p-2 hover:bg-gray-100">For girls</Link></li>
                <li><Link to="/mix" className="block p-2 hover:bg-gray-100">Mix</Link></li>
              </ul>
            )}
          </div>

          {/* Shop by Age Dropdown */}
          <div
            className="relative group"
            onMouseEnter={() => setDropdownAgeOpen(true)}
            onMouseLeave={() => setDropdownAgeOpen(false)}
          >
            <button className="flex items-center gap-2 font-semibold text-[#0e2c6c]">
              Shop by Age <span className="text-gray-400">▼</span>
            </button>
            {dropdownAgeOpen && (
              <ul className="absolute left-0 top-full bg-white shadow-lg rounded-lg mt-2 p-2 w-48 z-50">
                <li><Link to="/age/0-1" className="block p-2 hover:bg-gray-100">0-1 Years</Link></li>
                <li><Link to="/age/1-3" className="block p-2 hover:bg-gray-100">1-3 Years</Link></li>
                <li><Link to="/age/+3" className="block p-2 hover:bg-gray-100">+3 Years</Link></li>
              </ul>
            )}
          </div>
        </div>

        {/* Contact / User / Cart */}
        <div className="w-1/3 hidden md:flex items-center justify-end gap-6">
          <div className="flex items-center gap-3">
            <IoCall size={24} color="#0e2c6c" />
            <h2 className="text-lg text-[#0e2c6c] font-semibold">
              +201002726498
            </h2>
          </div>
          <div className="flex items-center gap-4">
            {admin ? (
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-600 font-semibold"
              >
                <FaSignOutAlt size={20} />
                Logout
              </button>
            ) : (
              <Link to="/login">
                <FaUser size={24} color="#0e2c6c" />
              </Link>
            )}
            <Link to="/cart" className="relative">
              <FaShoppingCart size={24} color="#0e2c6c" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile View */}
        <div className="flex items-center md:hidden gap-4">
          <Link to="/cart" className="relative">
            <FaShoppingCart size={24} color="#0e2c6c" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>
          <button className="text-[#0e2c6c]" onClick={() => setMenuOpen(true)}>
            <FaBars size={24} />
          </button>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>}

      {/* Mobile Sidebar */}
      <div
        ref={menuRef}
        className={`fixed left-0 top-0 h-[100vh] w-3/4 bg-[#ccc] shadow-lg z-50 transition-transform ${
          menuOpen ? "translate-x-0 " : "-translate-x-full"
        } p-6`}
      >
        <button className="p-4 text-gray-700" onClick={() => setMenuOpen(false)}>
          <FaTimes />
        </button>

        <ul
          className="flex flex-col gap-6 mt-8 text-[#0e2c6c] font-semibold text-lg"
          onMouseLeave={() => {
            setDropdownOpen(false);
            setDropdownAgeOpen(false);
          }}
        >
          <li>
            <Link to="/" className="flex items-center gap-3">
              <GiCardboardBox size={20} />
              Home
            </Link>
          </li>
          <li className="relative flex items-center gap-3 cursor-pointer"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
          >
            <MdCategory size={20} />
            Categories <span className="text-gray-400">{">"}</span>
            {dropdownOpen && (
              <ul className="absolute left-0 z-10 top-full bg-white shadow-lg rounded-lg mt-2 p-2 w-48">
                <li><Link to="/wheels" className="block p-2 hover:bg-gray-100">Active wheels</Link></li>
                <li><Link to="/smart" className="block p-2 hover:bg-gray-100">Smart play</Link></li>
                <li><Link to="/boys" className="block p-2 hover:bg-gray-100">For boys</Link></li>
                <li><Link to="/girls" className="block p-2 hover:bg-gray-100">For Girls</Link></li>
                <li><Link to="/mix" className="block p-2 hover:bg-gray-100">Mix</Link></li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/products" className="flex items-center gap-3">
              <BsBoxSeam size={20} />
              All Products
            </Link>
          </li>
          <li className="relative flex items-center gap-3 cursor-pointer"
              onMouseEnter={() => setDropdownAgeOpen(true)}
              onMouseLeave={() => setDropdownAgeOpen(false)}
          >
            <MdCategory size={20} />
            Shop by Age <span className="text-gray-400">{">"}</span>
            {dropdownAgeOpen && (
              <ul className="absolute left-0 top-full bg-white shadow-lg rounded-lg mt-2 p-2 w-48">
                <li><Link to="/age/0-1" className="block p-2 hover:bg-gray-100">0-1 Years</Link></li>
                <li><Link to="/age/1-3" className="block p-2 hover:bg-gray-100">1-3 Years</Link></li>
                <li><Link to="/age/+3" className="block p-2 hover:bg-gray-100">+3 Years</Link></li>
              </ul>
            )}
          </li>
          <li>
            <Link to="/contact" className="flex items-center gap-3">
              <IoCall size={20} />
              Contact
            </Link>
          </li>
          <li>
            <Link to="/login" className="flex items-center gap-3">
              <FaUser size={20} />
              Login
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
