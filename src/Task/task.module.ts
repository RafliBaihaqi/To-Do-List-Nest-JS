import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './task.service';
import { TasksController } from './task.controller';
import { taskSchema } from './Schemas/task.schemas';
import { taskProviders } from './task.provider';
import { databaseProviders } from '../Database/database.provider';
import { DatabaseModule } from '../Database/database.modules';
import { AuthModule } from '../Auth/auth.module';

@Module({
  imports: [
    DatabaseModule,
    MongooseModule.forFeature([{ name: 'Task', schema: taskSchema }]),
    AuthModule,
  ],
  controllers: [TasksController],
  providers: [TasksService, ...taskProviders, ...databaseProviders],
})
export class TasksModule {}
