import {NextRequest,NextResponse} from "next/server";

export async function POST(req,res) {
    const response=NextResponse.json({msg:"Logged Out Successfully"});
    response.cookies.set('token','',{expires:Date.now()});
    response.cookies.set('user','',{expires:Date.now()});
    return response;
}
