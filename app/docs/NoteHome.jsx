'use client';
import { Timeline, Text, Center } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export const NoteHome = () => {
  const router = useRouter();

  const handleOnClick = () => {
    router.replace('/notes/update');
  };

  return (
    <Center>
      <button onClick={handleOnClick}>
        <Timeline active={0} bulletSize={24} lineWidth={2}>
          <Timeline.Item title='Add Note' bullet={<IconPlus size={12} />}>
            <Text c='dimmed' size='sm'>
              {'Click here to create a new note!'}
            </Text>
          </Timeline.Item>
        </Timeline>
      </button>
    </Center>
  );
};
