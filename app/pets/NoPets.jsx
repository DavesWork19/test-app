'use client';
import { Timeline, Text, Center, Paper } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export const NoPets = () => {
  const router = useRouter();

  const handleOnClick = () => {
    router.replace('/pets/update');
  };

  return (
    <Center>
      <Paper
        shadow='xs'
        withBorder
        p='md'
        w={250}
        radius='md'
        component='button'
        onClick={handleOnClick}
      >
        <Timeline active={0} bulletSize={24} lineWidth={2}>
          <Timeline.Item title='Add Pet' bullet={<IconPlus size={12} />}>
            <Text c='dimmed' size='sm'>
              {'Click here to add a new pet!'}
            </Text>
          </Timeline.Item>
        </Timeline>
      </Paper>
    </Center>
  );
};
