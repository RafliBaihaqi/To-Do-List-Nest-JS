import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from "../api-clients";
import { useAppContext } from "../contexts/AppContext";
import { Link, useNavigate } from "react-router-dom";

export type SignInFormData = {
  email: string;
  password: string;
};
const Signin = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();
  const navigate = useNavigate();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignInFormData>();

  const mutation = useMutation(apiClient.Signin, {
    onSuccess: async () => {
      showToast({
        title: "Success!",
        description: "Sign In Successful!",
        type: "SUCCESS",
      });
      await queryClient.invalidateQueries("validateToken");
      navigate("/");
    },
    onError: async (error: Error) => {
      showToast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
        type: "ERROR",
      });
    },
  });

  //Submit form function
  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="container mx-auto my-auto py-10 max-w-xl border border-black rounded-lg bg-white">
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
          <h2 className="text-3xl font-bold text-center">Sign In</h2>
          <label className="text-grey-700 text-sm font-bold flex-1">
            Email
            <input
              type="email"
              className="border rounded w-full py-2 px-3 mt-1"
              placeholder="Email"
              {...register("email", { required: "This Field Is Required" })}
            />
            {errors.email && (
              <span className="text-red-500">{errors.email.message}</span>
            )}
          </label>
          <label className="text-grey-700 text-sm font-bold flex-1">
            Password
            <input
              type="password"
              className="border rounded w-full py-2 px-3 mt-1"
              placeholder="Password"
              {...register("password", {
                required: "This Field Is Required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </label>
          <span className="flex items-center justify-between">
            <span className="text-sm">
              Not Registered?{" "}
              <Link className="underline hover:text-blue-600" to="/register">
                Create an account here
              </Link>
            </span>
          </span>
          <button
            type="submit"
            className="bg-black text-white p-2 font-bold hover:bg-gray-700 text-xl rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;
