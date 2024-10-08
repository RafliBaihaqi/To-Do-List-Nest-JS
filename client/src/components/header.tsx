import { Link } from "react-router-dom";
import { useAppContext } from "../contexts/AppContext";
import SignOutButton from "./signOutButton";

const Header = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <div className="bg-black py-6">
      <div className="container mx-auto flex justify-between">
        <span className="text-3xl text-white font-bold tracking-tight">
          <Link to="/">To Do List App</Link>
        </span>
        <span className="flex space-x-2">
          {isLoggedIn ? (
            <>
              <Link
                className="flex items-center text-white px-3 border rounded-lg border-black font-bold hover:bg-slate-300"
                to="/add-task"
              >
                Add Task
              </Link>
              <Link
                className="flex items-center text-white px-3 border rounded-lg border-black font-bold hover:bg-slate-300"
                to="/my-task"
              >
                My Task
              </Link>
              <SignOutButton />
            </>
          ) : (
            <Link
              to="/sign-in"
              className="flex bg-white items-center text-black px-3 border rounded-lg border-black font-bold hover:bg-gray-100"
              style={{ borderRadius: "5px" }}
            >
              Sign In
            </Link>
          )}
        </span>
      </div>
    </div>
  );
};

export default Header;
