import { NextRequest, NextResponse } from "next/server";
import connectMongo from "../../../../utils/db";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

export async function POST(req, res) {
    connectMongo();
    const reqBody = await req.json();
    console.log(reqBody)
    const { email, password } = reqBody;
    if (!email || !password) {
        return NextResponse.json({ error: "Please enter all fields" }, { status: 400 });
    }
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "Invalid Credentials" }, { status: 400 });
        }
        const response = NextResponse.json({ msg: "Login Successful" });
        const token = jwt.sign(
            {
                id: user._id,
                email: user.email,
                name: user.name
            },
            process.env.JWT_SECRET,
            { expiresIn: "1d" });
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        response.cookies.set("user", user.username, {
            httpOnly: false,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });
        return response;
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "An error occured" })
    }


}