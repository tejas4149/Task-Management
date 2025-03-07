import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import API from "../../utils/API";

const UserTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await API.get("/api/protected/user/gettask");
      setTasks(response.data.data || []);
    } catch (error) {
      console.error("Error fetching tasks:", error);
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
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task._id} className="border-t">
                  <td className="p-3">{task.title}</td>
                  <td className="p-3">{new Date(task.dueDate).toLocaleDateString()}</td>
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
                    <Link to={`/user/comment/${task._id}`} className="text-blue-800">
                      Comments & View
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No tasks available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserTask;
