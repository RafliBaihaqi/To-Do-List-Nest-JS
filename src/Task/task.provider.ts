import { Connection } from 'mongoose';
import { taskSchema } from './Schemas/task.schemas';

export const taskProviders = [
  {
    provide: 'TASK_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Task', taskSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
