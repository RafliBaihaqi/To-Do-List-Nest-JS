import ManageTaskForm from "../forms/ManageTaskForm";
import * as apiClient from "../api-clients";
import { useParams, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQuery } from "react-query";

const EditTask = () => {
  const { taskId } = useParams();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const { data: task } = useQuery(
    "fetchTaskById",
    () => apiClient.fetchTasksById(taskId || ""),
    {
      enabled: !!taskId,
    }
  );

  const { mutate, isLoading } = useMutation(apiClient.updateTaskById, {
    onSuccess: () => {
      showToast({
        title: "Success!",
        description: "Task Updated Successfully",
        type: "SUCCESS",
      });
      navigate("/my-task");
    },
    onError: () => {
      showToast({
        title: "Uh oh! Something went wrong.",
        description: "Error Updating Task",
        type: "ERROR",
      });
    },
  });

  const handleSave = (taskFormData: URLSearchParams) => {
    mutate(taskFormData);
  };
  return (
    <ManageTaskForm task={task} onSave={handleSave} isLoading={isLoading} />
  );
};

export default EditTask;
