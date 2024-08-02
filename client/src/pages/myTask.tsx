import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-clients";
import { useState } from "react";
import { CiCalendarDate } from "react-icons/ci";
import { GrStatusGood } from "react-icons/gr";
import Pagination from "../components/Pagination";
import { TaskType, TaskDataResponse } from "../types"; // Ensure you import your types

const MyTask = () => {
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const { data: TaskData } = useQuery<TaskDataResponse>(
    ["fetchTask", page, limit],
    () => apiClient.fetchTask(page, limit),
    {
      onError: () => {},
    }
  );

  if (!TaskData) {
    return <span>No Tasks Found!</span>;
  }

  const {
    data: tasks,
    pagination: { page: currentPage, pages: totalPages },
  } = TaskData;

  return (
    <div className="container mx-auto py-10 flex-1">
      <div className="space-y-5">
        <span className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">My Tasks</h1>
          <Link
            to="/add-task"
            className="flex items-center bg-blue-600 text-white text-xl font-bold p-3 rounded-md hover:bg-blue-500 transition duration-300"
          >
            Add Task
          </Link>
        </span>
        <div className="grid grid-cols-1 gap-8">
          {tasks.map((Task: TaskType) => (
            <div
              key={Task._id}
              className="flex flex-col justify-between border border-gray-300 rounded-lg p-6 shadow-lg gap-5 bg-white"
            >
              <h2 className="text-2xl font-bold text-gray-800">{Task.title}</h2>
              <div className="whitespace-pre-line text-gray-700">
                {Task.description}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                  <CiCalendarDate className="mr-2 text-blue-500" />
                  <span className="text-gray-600">
                    Last Updated: {Task.lastUpdated}
                  </span>
                </div>
                <div className="flex items-center bg-gray-100 p-3 rounded-lg">
                  <GrStatusGood className="mr-2 text-green-500" />
                  <span className="text-gray-600">Status: {Task.status}</span>
                </div>
              </div>
              <div className="flex justify-end space-x-3 mt-4">
                <Link
                  to={`/delete-task/${Task._id}`}
                  className="bg-red-600 text-white text-lg font-bold p-2 rounded-md hover:bg-red-500 transition duration-300"
                >
                  Delete
                </Link>
                <Link
                  to={`/edit-task/${Task._id}`}
                  className="bg-blue-600 text-white text-lg font-bold p-2 rounded-md hover:bg-blue-500 transition duration-300"
                >
                  Edit
                </Link>
              </div>
            </div>
          ))}
          <div>
            <Pagination
              page={currentPage || 1}
              pages={totalPages || 1}
              onPageChange={(page) => setPage(page)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyTask;
