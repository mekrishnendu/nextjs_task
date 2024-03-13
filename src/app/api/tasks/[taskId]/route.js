import { connectionStr } from '@/app/lib/db';
import { mongoose } from 'mongoose';
import { NextResponse } from 'next/server';
import { Task } from '@/app/lib/model/tasks';

// UPDATE
export async function PUT(request, id) {
  console.log('put request', request, id);
  await mongoose.connect(connectionStr);
  let payload = await request.json();
  let requestId = {
    _id: id.params.taskId,
  };
  let result = await Task.findOneAndUpdate(requestId, payload);
  try {
    return NextResponse.json({ data: result, status: 200, message: 'Successfully updated' });
  } catch (error) {
    NextResponse.json({ data: {}, status: 500, message: 'Task not saved, have some error!!!' });
  }
}

// GET BY ID
export async function GET(id) {
  await mongoose.connect(connectionStr);
  let taskId = id.params.taskId;
  let requestId = { _id: taskId }; // _id used in mongo DB
  let result = await Task.findById(requestId);
  try {
    return NextResponse.json({ data: result, status: 200, message: 'Success' });
  } catch (error) {
    return NextResponse.json({ data: {}, status: 500, message: 'Error!!!, have some error' });
  }
}

// DELETE
export async function DELETE(id) {
  await mongoose.connect(connectionStr);
  let taskId = id.params.taskId;
  let requestId = { _id: taskId }; // _id used in mongo DB
  let result = await Task.findByIdAndDelete(requestId);
  try {
    return NextResponse.json({ data: result, status: 200, message: 'Successfully deleted' });
  } catch (error) {
    return NextResponse.json({ data: {}, status: 500, message: 'Failed to delete' });
  }
}
