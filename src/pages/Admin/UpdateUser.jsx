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
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await API.get(`/api/protected/admin/user/get/${id}`);

        console.log("response", response);
        if (response.data.data) {
          console.log("response if", response.data.data);
          setUser(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUser();
    console.log("fetch user", user);
  }, [id]);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      await API.put(`/api/protected/admin/user/update?id=${id}`, user);
      navigate("/admin/users");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (loading) return <div className="text-center text-lg">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen flex items-center justify-center  p-6">
      <div className="bg-white bg-opacity-90 shadow-2xl rounded-2xl p-8 max-w-lg w-full text-center backdrop-blur-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Update User</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">
              First Name
            </label>
            <input
              type="text"
              name="fname"
              value={user.fname}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Last Name
            </label>
            <input
              type="text"
              name="lname"
              value={user.lname}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Mobile
            </label>
            <input
              type="text"
              name="mobile"
              value={user.mobile}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Role</label>
            <select
              name="role"
              value={user.role}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
            >
              <option value="User">User</option>
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex space-x-4">
          <button
            onClick={handleUpdate}
            className="w-full bg-blue-600 text-white py-2 rounded-lg transition-all duration-300 hover:bg-blue-700 shadow-lg"
          >
            Update
          </button>
          <button
            onClick={() => navigate("/admin/users")}
            className="w-full bg-gray-500 text-white py-2 rounded-lg transition-all duration-300 hover:bg-gray-600 shadow-lg"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUser;
