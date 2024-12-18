import UsersList from '@/models/usersListModel';
import connectMongo from '@/utils/db';
import {NextRequest, NextResponse} from 'next/server';
connectMongo()
export async function GET(req, res) {
    try {
        const users = await UsersList.find().select("-id -__v -_id");
        console.log(users)
        return NextResponse.json({"users":users});
    } catch (error) {
        console.log(error.message)
        
        return NextResponse.json({"message": "error"});
    }
}