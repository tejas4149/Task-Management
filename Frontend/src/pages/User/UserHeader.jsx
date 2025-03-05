import React, { useState, useEffect } from "react";
import { FaBars, FaUserCircle, FaSignOutAlt, FaUser } from "react-icons/fa";

const UserHeader = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest("#profile-dropdown")) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const handleLogout = () => {
    console.log("User signed out");
    localStorage.removeItem("authToken");
    window.location.href = "/";
  };

  return (
    <nav className="bg-blue-400 p-4 shadow-md fixed w-full z-20 border-b border-gray-200">
      <div className="flex justify-between items-center w-full px-4 md:px-8">
        {/* Sidebar Toggle Button */}
        <button
          className="text-white text-2xl md:hidden focus:outline-none"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <FaBars />
        </button>

        {/* Title */}
        <div className="text-black text-xl md:text-2xl font-bold tracking-wide">
          Task Management
        </div>

        {/* Profile Dropdown */}
        <div className="relative" id="profile-dropdown">
          <button
            className="text-white text-3xl focus:outline-none"
            onClick={(e) => {
              e.stopPropagation();
              setDropdownOpen(!dropdownOpen);
            }}
          >
            <FaUserCircle />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded-md border border-gray-200 overflow-hidden">
              <a
                href="/user/profile"
                className="flex items-center gap-3 px-4 py-3 text-gray-800 hover:bg-gray-100 cursor-pointer"
              >
                <FaUser className="text-blue-500" />
                Profile
              </a>
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-3 px-4 py-3 text-red-600 hover:bg-gray-100 cursor-pointer"
              >
                <FaSignOutAlt className="text-red-500" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserHeader;
