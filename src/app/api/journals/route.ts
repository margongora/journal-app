'use server'
import { db } from "@/src/db/db";
import { journals } from "@/src/db/schema/journal";

export async function GET(req: Request) {
    const data = await db.select().from(journals); 
    
    return Response.json({ data });
}