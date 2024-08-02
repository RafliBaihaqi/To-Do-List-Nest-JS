import ManageTaskForm from "../forms/ManageTaskForm";
import * as apiClient from "../api-clients";
import { useAppContext } from "../contexts/AppContext";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
const Addtask = () => {
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(apiClient.addTask, {
    onSuccess: () => {
      showToast({
        title: "Success!",
        description: "Task Saved!",
        type: "SUCCESS",
      });
      navigate("/my-task");
    },
    onError: () => {
      showToast({
        title: "Uh oh! Something went wrong.",
        description: "Error Saving Task!",
        type: "ERROR",
      });
      navigate("/my-task");
    },
  });

  const handleSave = (taskFormData: URLSearchParams) => {
    console.log(taskFormData);
    mutate(taskFormData);
  };

  return <ManageTaskForm onSave={handleSave} isLoading={isLoading} />;
};

export default Addtask;
