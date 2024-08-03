// src/tasks/tasks.controller.ts
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Query,
} from '@nestjs/common';
import { TasksService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { JwtAuthGuard } from '../Auth/jwt/jwt-auth.guard';
import { PaginationQueryDto } from './dto/pagination.dto';
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
  ) {
    const userId = req.user.userId;
    return this.tasksService.findAll(userId, paginationQuery);
  }
}
