'use client';

import { Button } from '@mantine/core';
import { useRouter } from 'next/navigation';

export const GamblingButton = () => {
  const router = useRouter();

  const handleMT = () => {
    router.replace('/moneytime');
  };

  return (
    <Button
      variant='filled'
      color='rgba(0, 0, 0, 1)'
      size='xs'
      radius='xl'
      onClick={handleMT}
    >
      {'???'}
    </Button>
  );
};
