import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Book from "./Book";
import AdminBtn from "./AdminBtn";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // State for hamburger menu toggle

  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth >= 950);

  useEffect(() => {
    function handleScreen() {
      setIsSmallScreen(window.innerWidth >= 950);
    }
    window.addEventListener("resize", handleScreen);
    return () => window.removeEventListener("resize", handleScreen);
  }, []);
  return (
    <nav
      className={`${
        isSmallScreen ? "px-16" : "px-4"
      } w-full flex justify-between items-center p-4  bg-white shadow-md sticky top-0 z-50`}
    >
      {/* Logo Section */}
      <Link to={"/"}>
        <div className="logo text-2xl font-bold text-green-600">Logo</div>
      </Link>

      {/* Navigation Links for Larger Screens */}
      <div className="hidden sm:flex gap-6 text-lg items-center">
        <Link
          to="/"
          className="nav-link hover:text-gray-600 transition duration-300"
        >
          Home
        </Link>
        <Link
          to="/therapies"
          className="nav-link hover:text-gray-600 transition duration-300"
        >
          Therapies
        </Link>
        <Link
          to="/contact"
          className="nav-link hover:text-gray-600 transition duration-300"
        >
          Contact Us
        </Link>
      </div>

      {/* "Book" Button Always Visible */}
      <div className="flex items-center">
        <Link to={"/admin/admin-dashboard"}>
          <AdminBtn />
        </Link>
        <Link
          to={"/admin"}
          className="px-4 py-2 bg-gray-800 rounded-3xl text-white border-2 hover:bg-green-600"
        >
          Admin Login
        </Link>
        {/* Hamburger Menu Icon for Small Screens */}
        <div className="sm:hidden ml-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <span
              className={`block h-1 w-6 bg-green-600 rounded transform transition duration-300 ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block h-1 w-6 bg-green-600 rounded my-1 transition duration-300 ${
                isOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block h-1 w-6 bg-green-600 rounded transform transition duration-300 ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Dropdown Menu for Small Screens */}
      {isOpen && (
        <div className="sm:hidden absolute top-16 left-0 w-full bg-white shadow-md">
          <ul className="flex flex-col gap-4 p-4 text-lg">
            <li>
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-600 transition duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/therapies"
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-600 transition duration-300"
              >
                Therapies
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-600 transition duration-300"
              >
                Contact Us
              </Link>
            </li>
            <li>
              <Link
                to="/admin"
                onClick={() => setIsOpen(false)}
                className="hover:text-gray-600 transition duration-300"
              >
                Admin Login
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
