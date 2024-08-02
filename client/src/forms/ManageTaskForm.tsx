import { useForm, FormProvider } from "react-hook-form";
import { TaskType } from "../../../backend/src/shared/types";
import DetailsSection from "./DetailsSection";
import { useEffect } from "react";

export type TaskFormData = {
  title: string;
  description: string;
  status: string;
};

type Props = {
  task?: TaskType;
  onSave: (taskFormData: URLSearchParams) => void;
  isLoading: boolean;
};

const ManageTaskForm = ({ task, onSave, isLoading }: Props) => {
  const formMethods = useForm<TaskFormData>();
  const { handleSubmit, reset } = formMethods;

  useEffect(() => {
    reset(task);
  }, [task, reset]);

  const onSubmit = handleSubmit((formDataJson: TaskFormData) => {
    const formData = new URLSearchParams();

    if (task) {
      formData.append("taskId", task._id);
    }
    formData.append("title", formDataJson.title);
    formData.append("description", formDataJson.description);
    formData.append("status", formDataJson.status);
    formData.append("dueDate", formDataJson.status);

    onSave(formData);
  });

  return (
    <FormProvider {...formMethods}>
      <div className="container mx-auto py-10 flex-1">
        <form className="flex flex-col gap-10" onSubmit={onSubmit}>
          <DetailsSection />
          <span className="flex justify-end">
            <button
              disabled={isLoading}
              type="submit"
              className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl disabled:bg-gray-500"
            >
              {isLoading ? "Saving...." : "Save"}
            </button>
          </span>
        </form>
      </div>
    </FormProvider>
  );
};

export default ManageTaskForm;
