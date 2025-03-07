import React, { useEffect, useRef, useState } from "react";
import { useParams, Link } from "react-router";
import API from "../../utils/API";
import { FaArrowLeft, FaPaperPlane } from "react-icons/fa";

const UserComment = () => {
  const { taskId } = useParams();
  const [task, setTask] = useState(null);
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const commentsEndRef = useRef(null);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const taskResponse = await API.get(`/api/protected/user/gettasks/${taskId}`);
        if (taskResponse?.data.data) setTask(taskResponse.data.data);
      } catch (error) {
        console.error("Error fetching task", error);
      }
    };

    fetchTaskDetails();
  }, [taskId]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const commentsResponse = await API.get(`/api/protected/user/getcomments/${taskId}`);
        if (commentsResponse?.data.data) {
          setComments(commentsResponse.data.data);
        }
      } catch (error) {
        console.error("Error fetching comments", error);
      }
    };
    
    fetchComments();
  }, [taskId, fetchTrigger]);

  const handleAddComment = async () => {
    if (!comment.trim()) return;
    try {
      const response = await API.post(`/api/protected/user/comment/${taskId}`, {
        comment,
      });

      if (response?.data.success) {
        setComment(""); // Clear input field
        setFetchTrigger(prev => !prev); // Trigger re-fetch of comments
      }
    } catch (error) {
      console.error("Error adding comment", error);
    }
  };

  if (!task)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500">
        Loading...
      </div>
    );

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col items-center overflow-y-auto">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-4xl">
        <Link
          to="/user/tasks"
          className="flex items-center text-blue-600 hover:text-blue-800 mb-4 transition"
        >
          <FaArrowLeft className="mr-2" /> Back to Tasks
        </Link>

        <h1 className="text-3xl font-semibold mb-4 text-gray-800">Task Details</h1>
        <div className="bg-gray-100 p-5 rounded-lg shadow-md">
          <p className="text-gray-600 font-semibold">Title:</p>
          <p className="text-lg">{task.title}</p>

          <p className="text-gray-600 font-semibold mt-3">Description:</p>
          <p className="text-lg">{task.description}</p>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-3 text-gray-800">Comments</h2>
          <div className="bg-white shadow-md p-4 rounded-lg max-h-60 overflow-y-auto">
            {comments.length > 0 ? (
              comments.map((c, index) => (
                <div key={index} className="p-3 border-b last:border-none">
                  <p className="text-sm">
                    <strong className="text-gray-800">
                      {c.userId?.fname} {c.userId?.lname}:
                    </strong>{" "}
                    {c.comment}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(c.createdAt).toLocaleString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center">No comments yet.</p>
            )}
            <div ref={commentsEndRef} />
          </div>
        </div>

        <div className="mt-6 flex flex-col">
          <textarea
            className="border border-gray-300 p-3 w-full rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            rows={3}
          />
          <button
            onClick={handleAddComment}
            className="flex items-center justify-center bg-blue-500 text-white px-4 py-2 mt-2 rounded-lg hover:bg-blue-600 transition shadow-md active:scale-95"
          >
            <FaPaperPlane className="mr-2" /> Add Comment
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserComment;
