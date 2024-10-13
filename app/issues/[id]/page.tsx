import React from 'react';
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Card, Flex, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";

interface Props {
  params: {id: string}
}

async function IssueDetailsPage({params: {id}}: Props) {
  const issueId = parseInt(id);
  if (isNaN(issueId)) notFound();
  
  const issue = await prisma.issue.findUnique({where: {id: issueId}});
  
  if (!issue) notFound();
  
  return (
    <div className='space-y-5'>
      <Heading>{issue.title}</Heading>
      <Flex gapX='5'>
        <IssueStatusBadge status={issue.status}/>
        <Text>{issue.createdAt.toDateString()}</Text>
      </Flex>
      <Card>
        <Text>{issue.description}</Text>
      </Card>
    </div>
  );
}

export default IssueDetailsPage;