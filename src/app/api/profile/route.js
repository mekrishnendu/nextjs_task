import { connectionStr } from '@/app/lib/db';
import { Profile } from '@/app/lib/model/profile';
import { mongoose } from 'mongoose';
import { NextResponse } from 'next/server';

// POST
export async function POST(request) {
  let data = '';
  let status = '';
  let message = '';
  try {
    let payload = await request.json();
    await mongoose.connect(connectionStr);
    data = await new Profile(payload);
    status = 200;
    message = 'Success';
  } catch (error) {
    data = '';
    status = 400;
    message = 'Something went wrong';
  }
  let result = await data.save();
  return NextResponse.json({ data: result, status, message });
}

// GET THE LIST
export async function GET() {
  let data = [];
  let status = '';
  try {
    await mongoose.connect(connectionStr);
    data = await Profile.find();
    status = 200;
  } catch {
    data = 'some thing went wrong';
    status = 500;
  }

  return NextResponse.json({ data, status });
}

// UPDATE
export async function PUT(request, id) {
  console.log('put request', request, id);
  await mongoose.connect(connectionStr);
  let result = '';
  let message = '';
  let status = '';
  try {
    let payload = await request.json();
    let requestId = { _id: id.params.profileid };
    result = await Profile.findOneAndUpdate(requestId, payload);
    message = 'Successfully updated';
    status = 200;
  } catch (error) {
    result = '';
    status = 400;
    message = 'Something went wrong';
  }

  return NextResponse.json({ data: result, status, message });
}
