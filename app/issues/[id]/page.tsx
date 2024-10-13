import React from 'react';
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";

interface Props {
  params: {id: string}
}

async function IssueDetailsPage({params: {id}}: Props) {
  if (typeof id !== 'number') notFound(); /* Even though the IDE may say 'id' cannot have type 'number',
                                             it still works. It does redirect them to a 404 page. */
  
  const issue = await prisma.issue.findUnique({where: {id: parseInt(id)}});
  
  if (!issue) notFound();
  
  return (
    <>
      <p>{issue.title}</p>
      <p>{issue.description}</p>
      <p>{issue.status}</p>
      <p>{issue.createdAt.toDateString()}</p>
    </>
  );
}

export default IssueDetailsPage;