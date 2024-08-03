import { Task } from './task.interface'; // Ensure you have a Task interface defined

export interface TaskDataResponse {
  data: Task[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}
