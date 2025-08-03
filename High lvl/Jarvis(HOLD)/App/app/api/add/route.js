import { NextResponse } from "next/server";

export async function POST(request) {
    let data = await request.json()
    // check for user in db --> If in db send true/if not send false
    
    // Giving an token for login session an making an seprate url for it

    return NextResponse.json({success: true, data})
} 
 