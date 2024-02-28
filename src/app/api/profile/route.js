import { connectionStr } from '@/app/lib/db';
import { Profile } from '@/app/lib/model/profile';
import { mongoose } from 'mongoose';
import { NextResponse } from 'next/server';

// POST
export async function POST(request) {
  let profile = [];
  let status = '';
  let message = '';
  try {
    let payload = await request.json();
    await mongoose.connect(connectionStr);
    profile = await new Profile(payload);
    await profile.save();
    status = 200;
    message = 'Profile added successfully';
  } catch (error) {
    status = 400;
    message = 'Something went wrong';
  }
  return NextResponse.json({ data: profile, status, message });
}

// GET THE LIST
export async function GET() {
  let data = [];
  let status = '';
  let message = '';

  try {
    await mongoose.connect(connectionStr);
    data = await Profile.find();
    status = 200;
    message = data.length > 0 ? 'Success' : 'No data found';
  } catch {
    message = 'Failed to load data';
    status = 500;
  }
  return NextResponse.json({ data, status, message });
}
