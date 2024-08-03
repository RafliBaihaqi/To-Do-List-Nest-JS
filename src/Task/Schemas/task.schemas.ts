import * as mongoose from 'mongoose';

export const taskSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  status: { type: String, required: true },
  lastUpdated: { type: String, required: true },
});
