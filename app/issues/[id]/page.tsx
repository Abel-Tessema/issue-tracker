import React from 'react';
import prisma from "@/prisma/client";
import {notFound} from "next/navigation";
import {Box, Button, Card, Flex, Grid, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "@/app/components/IssueStatusBadge";
import Markdown from "react-markdown";
import Link from "next/link";
import {Pencil2Icon} from "@radix-ui/react-icons";

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
      <Box className='max-w-xl space-y-5'>
        <Heading>{issue.title}</Heading>
        <Flex gapX='5'>
          <IssueStatusBadge status={issue.status}/>
          <Text>{issue.createdAt.toDateString()}</Text>
        </Flex>
        <Card className='prose'>
          <Text><Markdown>{issue.description}</Markdown></Text>
        </Card>
      </Box>
      <Box>
        <Link href={`/issues/${issueId}/edit`}>
          <Button>
            <Pencil2Icon/>
            Edit Issue
          </Button>
        </Link>
      </Box>
    </Grid>
  );
}

export default IssueDetailsPage;