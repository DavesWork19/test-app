'use client';
import { Timeline, Text, Center } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export const NoAppointments = () => {
  const router = useRouter();

  const handleOnClick = () => {
    router.replace('/appointments/update');
  };

  return (
    <Center>
      <button onClick={handleOnClick}>
        <Timeline active={0} bulletSize={24} lineWidth={2}>
          <Timeline.Item
            title='Add Appointment'
            bullet={<IconPlus size={12} />}
          >
            <Text c='dimmed' size='sm'>
              {'Click here to create a new appointment'}
            </Text>
          </Timeline.Item>
        </Timeline>
      </button>
    </Center>
  );
};
