import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './interface/task.interface';
import { PaginationQueryDto } from './dto/pagination.dto';
import { TaskDataResponse } from './interface/task-data-response.interface';

@Injectable()
export class TasksService {
  constructor(@Inject('TASK_MODEL') private taskModel: Model<Task>) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const newTask = new this.taskModel({
      ...createTaskDto,
      lastUpdated: new Date().toLocaleString('id-ID'),
    });
    return newTask.save();
  }

  async findAll(
    userId: string,
    paginationQuery: PaginationQueryDto,
  ): Promise<TaskDataResponse> {
    const { page = 1, limit = 5 } = paginationQuery;
    const pageSize = 5;
    const skip = pageSize * (page - 1);

    const tasks = await this.taskModel.find({ userId }).skip(skip).limit(limit);
    const total = await this.taskModel.countDocuments({ userId });

    return {
      data: tasks,
      pagination: {
        total,
        page,
        pages: Math.ceil(total / pageSize),
      },
    };
  }

  async deleteTask(id: string): Promise<Task | null> {
    return this.taskModel.findOneAndDelete({ _id: id }).exec();
  }

  async getTaskByUserId(id: string, userId: string): Promise<Task | null> {
    return this.taskModel.findOne({ _id: id, userId }).exec();
  }

  async updateTaskById(
    id: string,
    userId: string,
    updateTask: Partial<Task>,
  ): Promise<Task | null> {
    return this.taskModel
      .findOneAndUpdate({ _id: id, userId }, updateTask, { new: true })
      .exec();
  }
}
