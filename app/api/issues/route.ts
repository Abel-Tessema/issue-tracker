import {NextRequest, NextResponse} from "next/server";
import z from "zod";
import prisma from "@/prisma/prismaClient";

const createIssueSchema = z.object({
  title: z.string().min(1, 'Title is required.').max(256, 'Title exceeds maximum number of characters (256).'),
  description: z.string().min(1, 'Description is required.'),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {success, data, error} = createIssueSchema.safeParse(body);
  if (!success)
    return NextResponse.json({errors: error?.errors}, {status: 400});
  
  const issue = await prisma.issue.create({data: data});
  return NextResponse.json(issue, {status: 201});
}