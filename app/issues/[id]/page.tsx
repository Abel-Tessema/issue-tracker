import React from 'react';
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Grid} from "@radix-ui/themes";
import EditIssueButton from "@/app/issues/[id]/EditIssueButton";
import IssueDetails from "@/app/issues/[id]/IssueDetails";

interface Props {
  params: {id: string}
}

async function IssueDetailsPage({params: {id}}: Props) {
  const issueId = parseInt(id);
  if (isNaN(issueId)) notFound();
  
  const issue = await prisma.issue.findUnique({where: {id: issueId}});
  
  if (!issue) notFound();
  
  return (
    <Grid columns={{initial: '1', md: '2'}} className='space-y-5'>
      <IssueDetails issue={issue}/>
      <EditIssueButton issueId={issueId}/>
    </Grid>
  );
}

export default IssueDetailsPage;