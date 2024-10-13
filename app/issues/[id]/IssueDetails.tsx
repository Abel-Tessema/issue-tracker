import React from 'react';
import {Box, Card, Flex, Heading, Text} from "@radix-ui/themes";
import IssueStatusBadge from "../../components/IssueStatusBadge";
import Markdown from "react-markdown";
import {Issue} from "@prisma/client";

interface Props {
  issue: Issue
}

function IssueDetails({issue}: Props) {
  return (
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
  );
}

export default IssueDetails;