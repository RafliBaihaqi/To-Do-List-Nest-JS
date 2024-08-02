import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Layout from "./layout/layout";
import Addtask from "./pages/Addtask";
import Register from "./pages/registerUser";
import Signin from "./pages/signIn";
import { useAppContext } from "./contexts/AppContext";
import MyTask from "./pages/myTask";
import Home from "./pages/Home";
import DeleteTask from "./pages/DeleteTask";
import EditTask from "./pages/EditPage";
const App = () => {
  const { isLoggedIn } = useAppContext();
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home/>
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <p>Search Page</p>
            </Layout>
          }
        />
        <Route
          path="/register"
          element={
            <Layout>
              <Register />
            </Layout>
          }
        />
        <Route
          path="/sign-in"
          element={
            <Layout>
              <Signin />
            </Layout>
          }
        />
        {isLoggedIn && (
          <>
            <Route
              path="/add-task"
              element={
                <Layout>
                  <Addtask />
                </Layout>
              }
            />
            <Route
              path="/my-task"
              element={
                <Layout>
                  <MyTask />
                </Layout>
              }
            />
            <Route
              path="/delete-task/:taskId"
              element={
                <Layout>
                  <DeleteTask />
                </Layout>
              }
            />
            <Route
              path="/edit-task/:taskId"
              element={
                <Layout>
                  <EditTask />
                </Layout>
              }
            />
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
