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
  Put,
  HttpException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../Auth/jwt/jwt-auth.guard';
import { PaginationQueryDto } from './dto/pagination.dto';
import { TaskDataResponse } from './interface/task-data-response.interface';
import { Request, Response } from 'express';
import { Task } from './interface/task.interface';
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createTask(
    @Body() createTaskDto: CreateTaskDto,
    @Req() req: Request & { user: { userId: string } },
  ) {
    try {
      if (!req.user || !req.user.userId) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }

      const userId = req.user.userId;
      const task = await this.tasksService.createTask({
        ...createTaskDto,
        userId,
      });
      return {
        statusCode: HttpStatus.CREATED,
        message: 'Task created successfully',
        task,
      };
    } catch (error) {
      if (error.status === HttpStatus.UNAUTHORIZED) {
        throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
      }
      throw new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Req() req: Request & { user: { userId: string } },
    @Query() paginationQuery: PaginationQueryDto,
  ): Promise<TaskDataResponse> {
    try {
      const userId = req.user.userId;
      const tasks = await this.tasksService.findAll(userId, paginationQuery);

      if (!tasks) {
        throw new NotFoundException('No tasks found');
      }

      return tasks;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new HttpException(
        'Error fetching tasks',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Delete('/delete/:id')
  @UseGuards(JwtAuthGuard)
  async deleteTask(
    @Param('id') id: string,
    @Req() req: Request & { user: { userId: string } },
    @Res() res: Response,
  ) {
    try {
      const userId = req.user.userId;
      const deleteTask = await this.tasksService.deleteTask(id);
      const task = await this.tasksService.getTaskByUserId(id, userId);

      if (!task) {
        throw new NotFoundException('Task not found');
      }

      if (task.userId !== userId) {
        throw new ForbiddenException(
          'You do not have permission to delete this task',
        );
      }

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

  @Put('/edit/:id')
  @UseGuards(JwtAuthGuard)
  async editTask(
    @Param('id') id: string,
    @Body() updateTask: Partial<Task>,
    @Req() req: Request & { user: { userId: string } },
    @Res() res: Response,
  ) {
    try {
      const userId = req.user.userId;
      const d = new Date();
      updateTask.lastUpdated = d.toLocaleString('id-ID');

      const task = await this.tasksService.updateTaskById(
        id,
        userId,
        updateTask,
      );

      if (!task) {
        return res
          .status(HttpStatus.NOT_FOUND)
          .json({ message: 'Task not found' });
      }

      if (task.userId !== userId) {
        throw new ForbiddenException(
          'You do not have permission to delete this task',
        );
      }

      return res.status(HttpStatus.CREATED).json(task);
    } catch (error) {
      return res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error Updating Task' });
    }
  }
}
