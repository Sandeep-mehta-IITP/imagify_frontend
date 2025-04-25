import React, { useContext, useState, useEffect, useRef } from "react";
import { assets } from "../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { user, setShowLogin, logout, credit } = useContext(AppContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Toggle dropdown on profile icon click
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between py-4">
      {/* logo */}
      <Link to={"/"}>
        <img src={assets.logo} alt="" className="w-28 sm:w-32 lg:w-40" />
      </Link>

      <div>
        {user ? (
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => navigate("/buy")}
              className="flex items-center gap-2 bg-blue-100 px-4 sm:px-6 py-1.5 sm:py-3 cursor-pointer rounded-full hover:scale-105 transition-all duration-700"
            >
              <img src={assets.credit_star} alt="" className="w-5" />
              <p className="text-xs sm:text-sm font-medium text-gray-600">
                Credits left: {credit}
              </p>
            </button>
            <p className="text-gray-600 max-sm:hidden pl-4">Hi, {user.name}</p>
            <div className="relative group" ref={dropdownRef}>
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="w-10 drop-shadow cursor-pointer"
                onClick={toggleDropdown}
              />
              <div
                className={`absolute top-0 right-0 z-10 text-black rounded pt-12 sm:group-hover:block ${
                  isDropdownOpen ? "block" : "hidden"
                } sm:${isDropdownOpen ? "block" : "hidden"}`}
              >
                <ul className="list-none m-0 p-2 bg-white rounded-md border text-sm w-24">
                  <li
                    onClick={() => {
                      logout();
                      setIsDropdownOpen(false);
                    }}
                    className="py-1 px-2 cursor-pointer hover:bg-gray-100 rounded"
                  >
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 sm:gap-5">
            <p className="cursor-pointer" onClick={() => navigate("/buy")}>
              Pricing
            </p>
            <button
              onClick={() => setShowLogin(true)}
              className="bg-zinc-800 text-white px-7 py-2 sm:px-10 cursor-pointer text-sm rounded-full"
            >
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
