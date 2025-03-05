import React, { useEffect, useState } from "react";
import API from "../../utils/API";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token"); // Get auth token
        if (!token) throw new Error("User not authenticated");

        const response = await API.get("/api/protected/user/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(response.data.data); // Store user data in state
      } catch (err) {
        setError("Failed to fetch user profile.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  if (loading)
    return <div className="text-center mt-10 text-gray-600">Loading profile...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-xl p-6 mt-10 border border-gray-200">
      {/* Profile Header */}
      <div className="flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 text-4xl font-semibold">
          {user.fname.charAt(0)}{user.lname.charAt(0)}
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mt-3">
          {user.fname} {user.lname}
        </h2>
        <p className="text-gray-500 capitalize">{user.role}</p>
      </div>

      {/* Profile Details */}
      <div className="mt-6 space-y-4 text-gray-700">
        <div className="flex items-center">
          <span className="mr-2">📧</span> 
          <strong>Email:</strong> <span className="ml-2">{user.email}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">📞</span> 
          <strong>Mobile:</strong> <span className="ml-2">{user.mobile}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">🎂</span> 
          <strong>Age:</strong> <span className="ml-2">{user.age}</span>
        </div>
        <div className="flex items-center">
          <span className="mr-2">💼</span> 
          <strong>Role:</strong> <span className="ml-2 capitalize">{user.role}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
