import {NextResponse} from 'next/server'

export async function POST(req,res){
    try {
        const url=new URL(req.url)
        const user=url.searchParams.get("user");
        const token=req.cookies.get('token').value;
        const reqUserId=jwt.verify(token,process.env.JWT_SECRET).id
        
        const reqUser=await User.findById(reqUserId);
       
    } catch (error) {
        return NextResponse.json({error:"An error occured"})
    }

}