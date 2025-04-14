'use client';

import {
  IconCircle,
  IconCircleCheck,
  IconCircleX,
  IconPlus,
} from '@tabler/icons-react';
import { Center, Timeline, Text, Paper, Container } from '@mantine/core';
import { useRouter } from 'next/navigation';

export const AllNotes = (props) => {
  const router = useRouter();

  const notes = props.notes;

  const activeNotes = notes.length - 1;
  const icon = <IconCircleCheck size={12} />;

  const handleOnClick = (id) => {
    router.replace(`/docs/update/${id}`);
  };

  const handleAddNote = () => {
    router.replace('/docs/update');
  };

  return (
    <Center>
      <Timeline active={activeNotes} bulletSize={24} lineWidth={2}>
        {notes.map((note) => {
          const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          };
          const startTimeDate = new Date(note.date);
          const udpatedStartTime = startTimeDate
            ? startTimeDate.toLocaleDateString('en-US', options)
            : '';

          return (
            <Timeline.Item
              bullet={icon}
              title={note.title}
              lineVariant={'solid'}
              key={note.id}
              //   color={'dimmed'}
            >
              <Text c='dimmed' size='xs' mb={8}>
                {`- ${udpatedStartTime}`}
              </Text>

              <Paper
                shadow='xs'
                withBorder
                p='md'
                w={250}
                radius='md'
                // bg={color}
                component='button'
                onClick={() => handleOnClick(note.id)}
              >
                {note.description && (
                  <div>
                    <Text size='md' mr={200} fw={500}>
                      {'Description'}
                    </Text>
                    <Text size='sm' mb={'sm'} pr={150}>
                      {note.description}
                    </Text>
                  </div>
                )}
              </Paper>
            </Timeline.Item>
          );
        })}

        <Timeline.Item title='Add Note' bullet={<IconPlus size={12} />}>
          <Paper
            shadow='xs'
            withBorder
            p='md'
            w={250}
            radius='md'
            component='button'
            onClick={handleAddNote}
          >
            <Text c='dimmed' size='sm'>
              {'Click here to create a new note'}
            </Text>
          </Paper>
        </Timeline.Item>
      </Timeline>
    </Center>
  );
};
