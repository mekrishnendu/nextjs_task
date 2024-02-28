import { connectionStr } from '@/app/lib/db';
import { Profile } from '@/app/lib/model/profile';
import { mongoose } from 'mongoose';
import { NextResponse } from 'next/server';

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
    message = 'Profile updated successfully';
    status = 200;
  } catch (error) {
    status = 400;
    message = 'Something went wrong';
  }

  return NextResponse.json({ data: result, status, message });
}
