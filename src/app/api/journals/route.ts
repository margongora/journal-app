'use server'
import { db } from "@/src/db/db";
import { journals, NewJournal } from "@/src/db/schema/journal";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
    const data = await db.select().from(journals); 
    
    return Response.json({ data });
}

export async function POST(req: NextRequest) {
    const data = await req.json();

    console.log(data as NewJournal);
    await db.insert(journals).values(data);

    return Response.json('Success!')
}