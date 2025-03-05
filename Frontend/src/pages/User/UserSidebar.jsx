import React from "react";
import { FaHome, FaTasks, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router";

const UserSidebar = ({ isSidebarOpen }) => {
  const location = useLocation(); // Get current route

  return (
    <aside
      className={`h-screen w-64 bg-white text-gray-900 fixed top-0 left-0 shadow-lg flex flex-col border-r border-gray-200 transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-64"
      } md:translate-x-0 mt-16`}
    >
      {/* Sidebar Header */}
      <div className="p-5 text-lg font-semibold text-center border-b border-gray-300 bg-blue-400 text-white">
        User Dashboard
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          <SidebarItem
            to="/user"
            icon={<FaHome />}
            label="Home"
            active={location.pathname === "/user"}
          />
          <SidebarItem
            to="/user/tasks"
            icon={<FaTasks />}
            label="Tasks"
            active={location.pathname === "/user/tasks"}
          />
          <SidebarItem
            to="/user/profile"
            icon={<FaUser />}
            label="Profile"
            active={location.pathname === "/user/profile"}
          />
        </ul>
      </nav>
    </aside>
  );
};

// Reusable Sidebar Item Component
const SidebarItem = ({ to, icon, label, active }) => {
  return (
    <li>
      <Link
        to={to}
        className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-300 ${
          active
            ? "bg-blue-400 text-white border-l-4 border-blue-400"
            : "hover:bg-gray-100 text-gray-700"
        }`}
      >
        <span className="text-xl">{icon}</span> {label}
      </Link>
    </li>
  );
};

export default UserSidebar;
