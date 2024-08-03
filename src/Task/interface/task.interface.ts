import { Document } from 'mongoose';

export interface Task extends Document {
  _id: string;
  userId: string;
  title: string;
  description: string;
  status: string;
  lastUpdated: string;
}
