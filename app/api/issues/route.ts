import {NextRequest, NextResponse} from "next/server";
import prisma from "@/prisma/client";
import {createIssueSchema} from "@/app/validationSchemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const {success, data, error} = createIssueSchema.safeParse(body);
  if (!success)
    return NextResponse.json({errors: error?.errors}, {status: 400});
  
  const issue = await prisma.issue.create({data: data});
  return NextResponse.json(issue, {status: 201});
}