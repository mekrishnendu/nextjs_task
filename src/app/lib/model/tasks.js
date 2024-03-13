import mongoose from 'mongoose';
const { Schema } = mongoose;
const taskSchema = new Schema(
  {
    taskName: {
      type: String,
      required: true,
    },
    taskDescription: {
      type: String,
      required: true,
    },
    taskDate: {
      type: String,
      required: true,
    },
    taskStatus: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);
export const Task = mongoose.models.Task || mongoose.model('Task', taskSchema);
