import * as apiClient from "../api-clients";
import { useAppContext } from "../contexts/AppContext";
import { useMutation, useQueryClient } from "react-query";

const SignOutButton = () => {
  const queryClient = useQueryClient();
  const { showToast } = useAppContext();

  const mutation = useMutation(apiClient.signOut, {
    onSuccess: async () => {
      await queryClient.invalidateQueries("validateToken");
      showToast({
        title: "Success!",
        description: "Signed Out!",
        type: "SUCCESS",
      });
    },
    onError: (error: Error) => {
      showToast({
        title: "Uh oh! Something went wrong.",
        description: error.message,
        type: "ERROR",
      });
    },
  });

  const handleClick = () => {
    mutation.mutate();
  };

  return (
    <button
      onClick={handleClick}
      className="text-black px-3 font-bold bg-white hover:bg-gray-100 rounded-lg"
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
