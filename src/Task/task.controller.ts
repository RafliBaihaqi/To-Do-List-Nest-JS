// src/tasks/tasks.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Query,
  Delete,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../auth/jwt/jwt-auth.guard';
import { PaginationQueryDto } from './dto/pagination.dto';
import { TaskDataResponse } from './interface/task-data-response.interface';
import { Request, Response } from 'express';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req: Request & { user: { userId: string } },
  ) {
    const userId = req.user.userId;
    const task = await this.tasksService.createTask({
      ...createTaskDto,
      userId,
    });
    return task;
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Req() req: Request & { user: { userId: string } },
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<TaskDataResponse> {
    const userId = req.user.userId;
    return this.tasksService.findAll(userId, paginationQuery);
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteTask(@Param('id') id: string, @Res() res: Response) {
    try {
      const deleteTask = await this.tasksService.deleteTask(id);

      if (!deleteTask) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Task not found' });
      }

      return res.status(HttpStatus.OK).json({ message: 'Task deleted' });
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error Deleting Task' });
    }
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  async getTask(
    @Req() req: Request & { user: { userId: string } },
    @Param('id') id: string,
    @Res() res: Response,
  ) {
    try {
      const userId = req.user.userId;
      const task = await this.tasksService.getTaskByUserId(id, userId);
      if (!task) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Task not found' });
      }
      return res.json(task);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error fetching task' });
    }
  }
}
