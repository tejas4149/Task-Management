import React, { useState } from "react";
import { Outlet } from "react-router"; // ✅ FIXED: Changed to react-router-dom
import UserSidebar from "./UserSidebar";
import UserHeader from "./UserHeader";

const UserLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <UserSidebar isSidebarOpen={isSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <UserHeader
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />

        {/* Page Content */}
        <main className={`p-6 transition-all duration-300 mt-16 ${
          isSidebarOpen ? "ml-64" : "ml-0"
        }`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
