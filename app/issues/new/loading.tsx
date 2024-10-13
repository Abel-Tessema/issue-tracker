import React from 'react';
import {Box, Skeleton} from "@radix-ui/themes";

function LoadingNewIssuePage() {
  return (
    <Box className='max-w-xl space-y-5'>
      <Skeleton className='h-8'/>
      <Skeleton height='23rem'/>
      <Skeleton width='10rem' height='2.5rem'/>
    </Box>
  );
}

export default LoadingNewIssuePage;