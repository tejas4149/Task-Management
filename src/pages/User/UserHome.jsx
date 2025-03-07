import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  FaTasks,
  FaCheckCircle,
  FaClock,
  FaExclamationTriangle,
} from "react-icons/fa";
import API from "../../utils/API";

const UserHome = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await API.get("/api/protected/user/getuserstat");
        setStats(response.data.data);
      } catch (err) {
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center text-gray-700 text-xl">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center text-red-500 text-xl">
        {error}
      </div>
    );
  }

  const statItems = [
    {
      title: "Total Tasks",
      value: stats.totalTasks,
      icon: <FaTasks className="text-blue-500 text-3xl" />,
      onClick: () => navigate("/user/tasks"),
    },
    {
      title: "Completed Tasks",
      value: stats.completedTasks,
      icon: <FaCheckCircle className="text-green-500 text-3xl" />,
    },
    {
      title: "Pending Tasks",
      value: stats.pendingTasks,
      icon: <FaClock className="text-yellow-500 text-3xl" />,
    },
    {
      title: "Delayed Tasks",
      value: stats.delayedTasks,
      icon: <FaExclamationTriangle className="text-red-500 text-3xl" />,
    },
  ];

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        User Dashboard
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {statItems.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg flex items-center p-5 space-x-4 transition-transform hover:scale-105 cursor-pointer"
            onClick={stat.onClick}
          >
            <div className="p-3 rounded-full bg-gray-100">{stat.icon}</div>
            <div>
              <h2 className="text-gray-600 text-sm font-medium">
                {stat.title}
              </h2>
              <p className="text-xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserHome;
