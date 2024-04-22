'use server'
import { db } from "@/src/db/db";
import { journals, NewJournal } from "@/src/db/schema/journal";
import { eq } from "drizzle-orm";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
	const data = await db.select().from(journals); 
	
	if (data === undefined) {
		return Response.json({error: 'Error fetching journals from database'}, {
				status: 400
		})
	}

	return Response.json({ data });
}

export async function POST(req: NextRequest) {
	const data = await req.json();
	await db.insert(journals).values(data);

	return Response.json('Success!');
}

export async function PUT(req: NextRequest) {
	const data = await req.json();
	await db.update(journals).set(data).where(eq(journals.id, data.id))
}