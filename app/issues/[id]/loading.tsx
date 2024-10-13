import {Box, Card, Flex, Skeleton} from "@radix-ui/themes";

function LoadingIssueDetailsPage() {
  const lines = [1, 2, 3];
  const lineHeight = 'h-4';
  
  return (
    <Box className='max-w-xl space-y-5'>
      <Skeleton className='h-8'/>
      <Flex gapX='5'>
        <Skeleton width='5rem' className={`${lineHeight}`}/>
        <Skeleton width='8rem' className={`${lineHeight}`}/>
      </Flex>
      <Card className='space-y-5'>
        {lines.map(() => <Skeleton className={`${lineHeight}`}/>)}
      </Card>
    </Box>
  );
}

export default LoadingIssueDetailsPage;