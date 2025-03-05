import React, { useEffect, useState } from "react";
import { Link } from "react-router"; // Use react-router-dom for routing
import API from "../../utils/API";
import { FaEdit, FaTrash, FaComment } from "react-icons/fa";

const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [userFilter, setUserFilter] = useState("All");

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await API.get("/api/protected/admin/task/gettasks");
        setTasks(response?.data?.data ?? []);
        setFilteredTasks(response?.data?.data ?? []);
      } catch (error) {
        console.error("Error fetching tasks", error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    let filtered = tasks;

    if (statusFilter !== "All") {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }

    if (userFilter !== "All") {
      filtered = filtered.filter(
        (task) =>
          task.userId &&
          `${task.userId.fname} ${task.userId.lname}` === userFilter
      );
    }

    setFilteredTasks(filtered);
  }, [statusFilter, userFilter, tasks]);

  const handleDelete = async (taskId) => {
    try {
      await API.delete(`/api/protected/admin/task/delete/${taskId}`);
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== taskId));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Admin Tasks</h1>
        <Link
          to="/admin/create-task"
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Create Task
        </Link>
      </div>

      {/* Filters */}
      <div className="flex space-x-4 mb-4">
        <div>
          <label className="block text-sm font-medium">Sort by Status:</label>
          <select
            className="border p-2 rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            {["All", "pending", "in progress", "completed"].map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Sort by User:</label>
          <select
            className="border p-2 rounded-md"
            value={userFilter}
            onChange={(e) => setUserFilter(e.target.value)}
          >
            {[
              "All",
              ...new Set(
                tasks.map((task) =>
                  task.userId
                    ? `${task.userId.fname} ${task.userId.lname}`
                    : "Unknown"
                )
              ),
            ].map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tasks Table */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">User Name</th>
              <th className="p-3 text-left">Task Title</th>
              <th className="p-3 text-left">Due Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredTasks.map((task) => (
              <tr key={task._id} className="border-t">
                <td className="p-3">
                  {task.userId
                    ? `${task.userId.fname} ${task.userId.lname}`
                    : "Unknown"}
                </td>
                <td className="p-3">{task.title}</td>
                <td className="p-3">
                  {new Date(task.dueDate).toLocaleDateString()}
                </td>
                <td className="p-3 capitalize">{task.status}</td>
                <td className="p-3 flex space-x-2">
                  <Link to={`/admin/update-task/${task._id}`} className="text-blue-600">
                    <FaEdit />
                  </Link>
                  <button onClick={() => handleDelete(task._id)} className="text-red-600">
                    <FaTrash />
                  </button>
                  <Link to={`/admin/comment/${task._id}`} className="text-green-600">
                    <FaComment />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTasks;
