import { TaskType } from "../../backend/src/shared/types";
import { RegisterFormData } from "./pages/registerUser";
import { SignInFormData } from "./pages/signIn";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
//import.meta.env.VITE_API_BASE_URL

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/validate-token`, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Token invalid");
  }

  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    credentials: "include",
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Error During Sign Out");
  }
};

export const Signin = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};


export const addTask = async (taskFormData: URLSearchParams) => {
  const response = await fetch(`${API_BASE_URL}/api/task`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: taskFormData.toString(),
  });

  if (!response.ok) {
    throw new Error("Error adding task");
  }
  return response.json();
};

export const fetchTask = async (page: number, limit: number): Promise<TaskDataResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/task?page=${page}&limit=${limit}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching tasks");
  }
  return response.json();
};
export const fetchTasksById = async (taskId: string): Promise<TaskType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/task/${taskId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching task");
  }
  return response.json();
};

export const deleteTask = async (taskId: string): Promise<TaskType> => {
  const response = await fetch(`${API_BASE_URL}/api/task/delete/${taskId}`, {
    method: "DELETE",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error deleting task");
  }
};

export const updateTaskById = async (taskFormData: URLSearchParams) => {
  const response = await fetch(
    `${API_BASE_URL}/api/task/edit/${taskFormData.get("taskId")}`,
    {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: taskFormData.toString(),
    }
  );
  if (!response.ok) {
    throw new Error("Error updating task");
  }
  return response.json();
};
