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
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Update User</h2>

      <label className="block">First Name</label>
      <input
        type="text"
        name="fname"
        value={user.fname}
        onChange={handleChange}
        className="w-full border p-2 mb-2"
      />

      <label className="block">Last Name</label>
      <input
        type="text"
        name="lname"
        value={user.lname}
        onChange={handleChange}
        className="w-full border p-2 mb-2"
      />

      <label className="block">Email</label>
      <input
        type="email"
        name="email"
        value={user.email}
        onChange={handleChange}
        className="w-full border p-2 mb-2"
      />

      <label className="block">Mobile</label>
      <input
        type="text"
        name="mobile"
        value={user.mobile}
        onChange={handleChange}
        className="w-full border p-2 mb-2"
      />

      <label className="block">Role</label>
      <select
        name="role"
        value={user.role}
        onChange={handleChange}
        className="w-full border p-2 mb-4"
      >
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>

      <div className="flex space-x-2">
        <button
          onClick={handleUpdate}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Update
        </button>
        <button
          onClick={() => navigate("/admin/users")}
          className="bg-gray-400 text-white px-4 py-2 rounded"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default UpdateUser;
