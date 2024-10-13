import React from 'react';
import Link from "next/link";
import {Box, Button} from "@radix-ui/themes";
import {Pencil2Icon} from "@radix-ui/react-icons";

interface Props {
  issueId: number
}

function EditIssueButton({issueId}: Props) {
  return (
    <Box>
      <Link href={`/issues/${issueId}/edit`}>
        <Button>
          <Pencil2Icon/>
          Edit Issue
        </Button>
      </Link>
    </Box>
  );
}

export default EditIssueButton;