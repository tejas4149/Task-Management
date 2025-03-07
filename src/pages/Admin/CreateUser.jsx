import React, { useState } from "react";
import { useNavigate } from "react-router";
import API from "../../utils/API";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaUserTag,
  FaCalendar,
  FaImage,
} from "react-icons/fa";

const CreateUser = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
    age: "",
    mobile: "",
    role: "user",
  });

  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (key, value) => {
    setUser((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreateUser = async () => {
    setLoading(true);
    setMessage("");

    try {
      // Step 1: Create user first
      const response = await API.post("/api/protected/admin/user/create", user);
      const userId = response.data.data._id;

      console.log("User created:", response.data);

      // Step 2: Upload Profile Image (if file is selected)
      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("id", userId);

        await API.post("/api/upload/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        console.log("File uploaded successfully");
      }

      setMessage(response.data.message || "User created successfully!");
      setUser({
        fname: "",
        lname: "",
        email: "",
        password: "",
        age: "",
        mobile: "",
        role: "user",
      });
    } catch (error) {
      setMessage(error.response?.data || "Failed to create user.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-3xl p-6">
        <div className="bg-white shadow-xl rounded-lg p-8 w-full border border-gray-300">
          <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
            Create User
          </h2>

          <div className="space-y-4">
            {[
              { key: "fname", label: "First Name", icon: FaUser },
              { key: "lname", label: "Last Name", icon: FaUser },
              { key: "email", label: "Email", icon: FaEnvelope },
              {
                key: "password",
                label: "Password",
                type: "password",
                icon: FaLock,
              },
              { key: "age", label: "Age", type: "number", icon: FaCalendar },
              { key: "mobile", label: "Mobile", icon: FaPhone },
            ].map(({ key, label, type = "text", icon: Icon }) => (
              <div key={key} className="relative">
                <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
                <input
                  type={type}
                  placeholder={label}
                  value={user[key]}
                  onChange={(e) => handleChange(key, e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-gray-50 text-gray-800 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
            ))}

            {/* Upload Profile Image */}
            <div className="relative">
              <FaImage className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg" />
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 text-gray-800 border border-gray-300 rounded-lg outline-none"
              />
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={() => navigate(-1)}
                className="w-1/2 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateUser}
                className="w-1/2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-all"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create User"}
              </button>
            </div>

            {message && (
              <p className="text-center text-sm font-medium text-gray-600">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateUser;
