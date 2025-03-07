import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import API from "../../utils/API";

const UpdateUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    mobile: "",
    role: "User",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get(`/api/protected/admin/user/get/${id}`);
        if (response.data.data) {
          setUser(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    if (id) fetchUser();
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/api/protected/admin/user/${id}`, user);
      navigate("/admin/users");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-xl p-6">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Update User
        </h2>

        {/* Form Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium">
              First Name
            </label>
            <input
              type="text"
              name="fname"
              value={user.fname}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Last Name</label>
            <input
              type="text"
              name="lname"
              value={user.lname}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={user.mobile}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium">Role</label>
            <select
              name="role"
              value={user.role}
              disabled
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            >
              <option value="User">User</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between mt-6">
          <button
            onClick={handleUpdate}
            className="w-1/2 bg-blue-600 text-white font-semibold py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 mr-2"
          >
            Update
          </button>
          <button
            onClick={() => navigate("/admin/users")}
            className="w-1/2 bg-gray-400 text-white font-semibold py-2 rounded-lg hover:bg-gray-500 transition-all duration-300"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
