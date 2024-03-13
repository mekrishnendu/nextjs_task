import { connectionStr } from '@/app/lib/db';
import { mongoose } from 'mongoose';
import { NextResponse } from 'next/server';
import { Task } from '@/app/lib/model/tasks';

// TASK ADD
export async function POST(request) {
  const { taskName, taskDescription, taskDate, taskStatus } = await request.json();
  await mongoose.connect(connectionStr);
  const addTask = new Task({
    taskName,
    taskDescription,
    taskDate,
    taskStatus,
  });

  try {
    const data = await addTask.save();
    return NextResponse.json({ data, status: 200, message: 'Successfully submitted' });
  } catch (error) {
    const data = {};
    return NextResponse.json({ data, status: 500, message: 'Task not saved, please check ' });
  }
}

// TASK GET
export async function GET() {
  try {
    await mongoose.connect(connectionStr);
    const data = await Task.find();
    return NextResponse.json({
      data,
      status: 200,
      message: data.length > 0 ? 'Success' : 'No data found',
    });
  } catch (error) {
    const data = {};
    return NextResponse.json({
      data,
      status: 500,
      message: 'Data not loaded, please check the issue',
    });
  }
}
