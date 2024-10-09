import { Task } from '../src/interface/task.interface';
import {RegisterFormData} from "../src/pages/registerUser"
import { SignInFormData } from './pages/signIn';
import { TaskDataResponse } from '../src/interface/task-data-response.interface';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/user/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
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
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Token invalid');
  }

  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/auth/logout`, {
    credentials: 'include',
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Error During Sign Out');
  }
};

export const Signin = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  const responseBody = await response.json();

  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const addTask = async (taskFormData: URLSearchParams) => {
  const response = await fetch(`${API_BASE_URL}/tasks`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: taskFormData.toString(),
  });

  if (!response.ok) {
    throw new Error('Error adding task');
  }
  return response.json();
};

export const fetchTask = async (
  page: number = 1,
  limit: number = 10,
): Promise<TaskDataResponse> => {
  const response = await fetch(
    `${API_BASE_URL}/tasks?page=${page}&limit=${limit}`,
    {
      credentials: 'include',
    },
  );
  if (!response.ok) {
    throw new Error('Error fetching tasks');
  }
  return response.json();
};

export const fetchTasksById = async (taskId: string): Promise<Task[]> => {
  const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Error fetching task');
  }
  return response.json();
};

export const deleteTask = async (taskId: string)=> {
  const response = await fetch(`${API_BASE_URL}/tasks/delete/${taskId}`, {
    method: 'DELETE',
    credentials: 'include',
  });
  if (!response.ok) {
    throw new Error('Error deleting task');
  }
};

export const updateTaskById = async (taskFormData: URLSearchParams) => {
  const response = await fetch(
    `${API_BASE_URL}/tasks/edit/${taskFormData.get('taskId')}`,
    {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: taskFormData.toString(),
    },
  );
  if (!response.ok) {
    throw new Error('Error updating task');
  }
  return response.json();
};
