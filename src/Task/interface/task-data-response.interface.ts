import { Task } from './task.interface';

export interface TaskDataResponse {
  data: Task[];
  pagination: {
    total: number;
    page: number;
    pages: number;
  };
}
