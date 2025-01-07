import React, { useState } from "react";
import { BsCart2 } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const cart = useSelector((state) => state.cart.cart);

  return (
    <nav className="bg-white border-b shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-2 md:px-6">

        {/* Center Section for desktop */}
        <div className="hidden md:flex justify-center"> 
          <img
            src="https://i.ibb.co/87jQjBs/logo.png"
            alt="Logo"
            className="h-14 md:h-16" // Increased logo size
          />
        </div>

        {/* Left Section */}
        <div className="flex items-center">
          {/* Hamburger Menu (Mobile) */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-gray-700 md:hidden"
          >
            <FiMenu size={24} />
          </button>
          {/* Links (Desktop) */}
          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } absolute left-0 top-16 w-full bg-white p-4 shadow-md md:relative md:top-0 md:block md:w-auto md:shadow-none`}
          >
            <ul className="flex flex-col items-start gap-4 md:flex-row md:items-center">
              <li>
                <Link
                  to="/" // Replace <a> with <Link> and use "to" prop
                  className="text-gray-700 hover:text-blue-500 transition"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/products"
                  className="text-gray-700 hover:text-blue-500 transition"
                >
                  Product
                </Link>
              </li>
              <li>
                <Link
                  to="/combo-products"
                  className="text-gray-700 hover:text-blue-500 transition"
                >
                  Combo Product
                </Link>
              </li>
              <li>
                <Link
                  to="/orders"
                  className="text-gray-700 hover:text-blue-500 transition"
                >
                  Order
                </Link>
              </li>
              <li>
                <Link
                  to="/bulk-order"
                  className="text-gray-700 hover:text-blue-500 transition"
                >
                  Bulk Order
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-700 hover:text-blue-500 transition"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Center Section for mobile */}
        <div className="flex md:hidden justify-center"> 
          <img
            src="https://i.ibb.co/87jQjBs/logo.png"
            alt="Logo"
            className="h-14 md:h-16" // Increased logo size
          />
        </div>

        {/* Right Section */}
        <Link className="flex items-center" to="/cart">
          <BsCart2 size={24} className="text-gray-700 cursor-pointer" />
          {cart.length > 0 && (
            <span className="ml-1 text-xs text-white bg-red-500 rounded-full px-1 translate-y-[-40%] translate-x-[-30%]">
              {cart.length}
            </span>
          )}
        </Link>

      </div>
    </nav>
  );
};

export default NavBar;