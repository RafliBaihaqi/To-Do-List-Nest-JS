import { useFormContext } from "react-hook-form";
import { TaskFormData } from "./ManageTaskForm";


const DetailsSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<TaskFormData>();

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6">Add / Edit Task</h1>
      
      <div className="flex flex-col gap-4">
        <label className="text-gray-700 text-sm font-bold">
          Title
          <input
            type="text"
            className="border rounded w-full py-2 px-3 mt-1 text-gray-700"
            {...register("title", { required: "This Field Is Required" })}
          />
          {errors.title && (
            <span className="text-red-500 text-sm mt-1">{errors.title.message}</span>
          )}
        </label>
        
        <label className="text-gray-700 text-sm font-bold">
          Description
          <textarea
            rows={5}
            className="border rounded w-full py-2 px-3 mt-1 text-gray-700"
            {...register("description", { required: "This Field Is Required" })}
          />
          {errors.description && (
            <span className="text-red-500 text-sm mt-1">{errors.description.message}</span>
          )}
        </label>
        
        <label className="text-gray-700 text-sm font-bold">
          Status
          <select
            {...register("status", { required: "This Field Is Required" })}
            className="border rounded w-full py-2 px-3 mt-1 text-gray-700"
          >
            <option value="" disabled className="text-sm font-bold">
              Select Task Status
            </option>
            {["Not Started", "Completed", "In Progress", "Canceled"].map((status, index) => (
              <option key={index} value={status} className="text-sm">
                {status}
              </option>
            ))}
          </select>
          {errors.status && (
            <span className="text-red-500 text-sm mt-1">{errors.status.message}</span>
          )}
        </label>
      </div>
    </div>
  );
};

export default DetailsSection;
