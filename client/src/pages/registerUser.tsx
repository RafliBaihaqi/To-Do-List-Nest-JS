import { useForm } from "react-hook-form";
import * as apiClient from "../api-clients";
import { useMutation, useQueryClient } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";

type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { showToast } = useAppContext();

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: async () => {
      showToast({
        title: "Success!",
        description: "Registration Success!",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: (error: Error) => {
      showToast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto my-auto py-10 max-w-xl border border-black rounded-lg bg-white">
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <h2 className="text-3xl font-bold">Create an Account</h2>
          <div className="flex flex-col md:flex-row gap-5">
            <label className="text-grey-700 text-sm font-bold flex-1">
              First name
              <input
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("firstName", {
                  required: "This Field Is Required",
                  maxLength: {
                    value: 10, 
                    message: "This field need 10 characters"
                  },
                })}
              ></input>
              {errors.firstName && (
                <span className="text-red-500">
                  {errors.firstName.message}{" "}
                </span>
              )}
            </label>
            <label className="text-grey-700 text-sm font-bold flex-1">
              Last name
              <input
                className="border rounded w-full py-1 px-2 font-normal"
                {...register("lastName", {
                  required: "This Field Is Required",
                  maxLength: {
                    value: 10, 
                    message: "This field need 10 characters"
                  },
                })}
              ></input>
              {errors.lastName && (
                <span className="text-red-500">{errors.lastName.message} </span>
              )}
            </label>
          </div>
          <label className="text-grey-700 text-sm font-bold flex-1">
            Email
            <input
              type="email"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("email", { required: "This Field Is Required" })}
            ></input>
            {errors.email && (
              <span className="text-red-500">{errors.email.message} </span>
            )}
          </label>
          <label className="text-grey-700 text-sm font-bold flex-1">
            Password
            <input
              type="password"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("password", {
                required: "This Field Is Required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            ></input>
            {errors.password && (
              <span className="text-red-500">{errors.password.message} </span>
            )}
          </label>
          <label className="text-grey-700 text-sm font-bold flex-1">
            Confirm Password
            <input
              type="password"
              className="border rounded w-full py-1 px-2 font-normal"
              {...register("confirmPassword", {
                validate: (val) => {
                  if (!val) {
                    return "This Field Is Required";
                  } else if (watch("password") !== val) {
                    return "Your Password Do Not Match";
                  }
                },
              })}
            ></input>
            {errors.confirmPassword && (
              <span className="text-red-500">
                {errors.confirmPassword.message}{" "}
              </span>
            )}
          </label>
          <span className="flex items-center justify-between">
            <span className="text-sm">
              Have an account{"? "}
              <Link className="underline hover:text-blue-600" to="/sign-in">
                Sign in here
              </Link>
            </span>
          </span>
          <button
            type="submit"
            className="bg-black text-white p-2 font-bold hover:bg-gray-700 text-xl"
          >
            Create Account
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
