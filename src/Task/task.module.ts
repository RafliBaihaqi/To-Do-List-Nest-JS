import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksService } from './task.service';
import { TasksController } from './task.controller';
import { taskSchema } from './Schemas/task.schemas';
import { taskProviders } from './task.provider';
import { databaseProviders } from 'src/Database/database.provider';
import { DatabaseModule } from 'src/Database/database.modules';
import { AuthModule } from 'src/auth/auth.module';

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
