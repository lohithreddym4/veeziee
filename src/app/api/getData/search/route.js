import UsersList from '@/models/usersListModel';
import connectMongo from '@/utils/db';
import {NextRequest, NextResponse} from 'next/server';
import jwt from 'jsonwebtoken'
import User from '@/models/userModel';

connectMongo()
export async function GET(req, res) {
    try {
        const url=new URL(req.url)
        const user=url.searchParams.get("user");
        const token=req.cookies.get('token').value;
        const reqUserId=jwt.verify(token,process.env.JWT_SECRET).id
        const reqUser=await User.findById(reqUserId).select('friendsList -_id');
        console.log(reqUser.friendsList)
        const searchList=friendsList.map

        const users = await UsersList.find({ username: { $regex: `^${user}`, $options: 'i' } }).select("-id -__v -_id");

        return NextResponse.json({"users":users});
    } catch (error) {
        console.log(error.message)
        
        return NextResponse.json({"message": "error"});
    }
}