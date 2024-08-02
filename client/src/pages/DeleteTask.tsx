import React from "react";
import * as apiClient from "../api-clients";
import { useAppContext } from "../contexts/AppContext";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";

const DeleteTask = () => {
  const { showToast } = useAppContext();
  const { taskId } = useParams();
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(
    () => apiClient.deleteTask(taskId),
    {
      onSuccess: () => {
        showToast({
          title: "Success!",
          description: "Task Deleted!",
          type: "SUCCESS",
        });
        navigate("/my-task");
      },
      onError: () => {
        showToast({
          title: "Uh oh! Something went wrong.",
          description: "Error Deleting Task!",
          type: "ERROR",
        });
      },
    }
  );

  const handleDelete = () => {
    mutate();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Delete Task</h1>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete this task?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => navigate("/my-task")}
            className="bg-gray-300 text-gray-700 p-2 font-bold rounded-md hover:bg-gray-400 transition duration-300"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            disabled={isLoading}
            className={`bg-red-600 text-white p-2 font-bold rounded-md hover:bg-red-500 transition duration-300 ${
              isLoading ? "cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? "Deleting..." : "Delete Task"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteTask;
