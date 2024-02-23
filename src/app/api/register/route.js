import { connectionStr } from '@/app/lib/db';
import { Member } from '@/app/lib/model/userregistration';
import { mongoose } from 'mongoose';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request) {
  const { firstName, lastName, email, phone, gender, password } = await request.json();
  await mongoose.connect(connectionStr);
  const existingUser = await Member.findOne({ email });

  if (existingUser) {
    return new NextResponse('Email is already in use', { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 5);
  const newMember = new Member({
    firstName,
    lastName,
    email,
    phone,
    gender,
    password: hashedPassword,
  });

  try {
    await newMember.save();
    return new NextResponse('User is registered', { status: 200 });
  } catch (error) {
    return new NextResponse({
      status: 500,
      message: 'Some things went wrong, please try again later',
    });
  }
}
