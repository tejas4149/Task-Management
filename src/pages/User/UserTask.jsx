import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import API from "../../utils/API";
import { FaCheckCircle, FaComment } from "react-icons/fa";

const UserTask = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await API.get("/api/protected/user/gettask");
      setTasks(response.data.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setError("Failed to load tasks. Please try again.");
    }
  };

  const changeTaskStatus = async (taskId, newStatus) => {
    try {
      await API.put("/api/protected/user/updatestatus", {
        taskId,
        status: newStatus,
      });
      fetchTasks();
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Your Tasks</h1>

      {error && <p className="text-red-500">{error}</p>}

      {/* Task List */}
      <div className="bg-white shadow-md rounded-lg p-4">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-3 text-left">Task Title</th>
              <th className="p-3 text-left">Due Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task._id} className="border-t">
                <td className="p-3">{task.title}</td>
                <td className="p-3">
                  {new Date(task.dueDate).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <select
                    className="border p-2 rounded-md"
                    value={task.status}
                    onChange={(e) => changeTaskStatus(task._id, e.target.value)}
                  >
                    {["pending", "in progress", "completed"].map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="p-3 flex space-x-2">
                  <Link
                    to={`/user/comment/${task._id}`}
                    className="text-blue-800"
                  >
                    {/* <FaComment />  */} Comments & View
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

export default UserTask;
