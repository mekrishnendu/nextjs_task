import { connectionStr } from '@/app/lib/db';
import { Users } from '@/app/lib/model/userregistration';
import { mongoose } from 'mongoose';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request) {
  const { name, lastname, email, password, phone, gender } = await request.json();
  await mongoose.connect(connectionStr);
  const existingUser = await Users.findOne({ email });

  if (existingUser) {
    return new NextResponse('Email is already in use', { status: 400 });
  }
  const hashedPassword = await bcrypt.hash(password, 5);
  const newUser = new Users({
    name,
    lastname,
    email,
    password: hashedPassword,
    phone,
    gender,
  });

  try {
    await newUser.save();
    return new Users('User is registered', { status: 200 });
  } catch (error) {
    return newUser({
      status: 500,
      message: 'Some things went wrong, please try again later',
    });
  }
}
