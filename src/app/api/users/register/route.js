import { NextResponse,NextRequest } from "next/server";
import connectMongo from "../../../../utils/db";
import User from "../../../../models/userModel";
import bcrypt from 'bcryptjs';
import UsersList  from "@/models/usersListModel";
import mongoose from "mongoose";
connectMongo();


export async function POST(request){
  try {
    const req = await request.json()
    let {email,name,username,password} = req
    if(!email || !username || !password || !name){
      console.log(name,email,username,password)
      return NextResponse.json({error:'Please enter all fields',status:400})
    }
    if (!/\S+@\S+\.\S+/.test(email)) { 
      return NextResponse.json({error:'Invalid Email',status:400})
    } 
    if(password.length<6){
      return NextResponse.json({error:'Password must be at least 6 characters',status:400})
    }
    if(username.length<4){
      return NextResponse.json({error:'Username must be at least 4 characters',status:400})
    }
    if(name.length<3){
      return NextResponse.json({error:'Name must be at least 3 characters',status:400})
    }
    if(/\s/.test(username)){
      return NextResponse.json({error:'Username must not contain spaces',status:400})
    }
    username=String(username);
    name=String(name);
    email=String(email);
    password=String(password);
    username=username.toLowerCase();
    email=email.toLowerCase();
    username=username.trim();
    name=name.trim();
    email=email.trim();
    if(username.includes('!') || username.includes('@') || username.includes('#') || username.includes('$') || username.includes('%') || username.includes('^') || username.includes('&') || username.includes('*') || username.includes('(') || username.includes(')') || username.includes('_') || username.includes('=') || username.includes('+') || username.includes('[') || username.includes(']') || username.includes('{') || username.includes('}') || username.includes('|') || username.includes(';') || username.includes(':') || username.includes('\'') || username.includes('"') || username.includes(',') || username.includes('<') || username.includes('>') || username.includes('.') || username.includes('/') || username.includes('?') || username.includes('`') || username.includes('~')){
      return NextResponse.json({error:'Username must not contain special characters except \'-\'' ,status:400})
    }
    const user= await User.findOne({email});
    if(user){
        return NextResponse.json({error:'User already exists',status:400})
    }
    if(await User.findOne({username})){
        return NextResponse.json({error:'Username already exists',status:400})
    }
    const salt=await bcrypt.genSalt(10);
    password=await bcrypt.hash(password,salt);

    const newUser = new User({
        email,
        name,
        username,
        password
    })
    await newUser.save()
    const id = newUser._id;
    const usersList = new UsersList({
        name,
        username,
        id
    })
    await usersList.save()
    return NextResponse.json({msg:'User registered successfully',status:200})
  } catch (error) {
    console.log(error)
    return NextResponse.json({error:error,status:400})
  }
}
