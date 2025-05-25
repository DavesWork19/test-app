'use client';

import {
  IconCircle,
  IconCircleCheck,
  IconCircleX,
  IconPlus,
} from '@tabler/icons-react';
import {
  Center,
  Timeline,
  Text,
  Paper,
  List,
  Group,
  Select,
} from '@mantine/core';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const AllAppointments = (props) => {
  const router = useRouter();
  const [filter, setFilter] = useState(false);

  const appointments = props.appointments;
  const categories = props.categories;

  const activeAppointments = appointments.length - 1;

  const handleOnClick = (id) => {
    router.replace(`/appointments/update/${id}`);
  };

  const handleAddAppointment = () => {
    router.replace('/appointments/update');
  };

  return (
    <>
      <Center>
        <Timeline active={activeAppointments} bulletSize={24} lineWidth={2}>
          {appointments.map((appointment) => {
            let lineVariant = '';
            let color = '';
            let icon = '';

            if (appointment.status === 0) {
              lineVariant = 'dashed';
              color = 'red';
              icon = <IconCircleX size={12} />;
            } else if (appointment.status === 1) {
              lineVariant = 'solid';
              color = 'green';
              icon = <IconCircleCheck size={12} />;
            } else if (appointment.status === 2) {
              lineVariant = 'solid';
              color = 'blue';
              icon = <IconCircle size={12} />;
            }

            const options = {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
            };
            const startTimeDate = new Date(appointment.start_time);
            const udpatedStartTime = startTimeDate
              ? startTimeDate.toLocaleDateString('en-US', options)
              : '';

            return (
              <Timeline.Item
                bullet={icon}
                title={appointment.title}
                lineVariant={lineVariant}
                key={appointment.id}
                color={color}
              >
                <Text c='dimmed' size='xs' mb={8}>
                  {`- ${udpatedStartTime}`}
                </Text>

                <Paper
                  shadow='xs'
                  withBorder
                  bd={color}
                  p='md'
                  w={250}
                  radius='md'
                  bg={color}
                  component='button'
                  onClick={() => handleOnClick(appointment.id)}
                >
                  {appointment.description && (
                    <div>
                      <Text size='md' fw={600} ta={'start'}>
                        {'Description'}
                      </Text>
                      <List icon='•' pb={12}>
                        <List.Item ta={'start'}>
                          <Text lineClamp={1}>{appointment.description}</Text>
                        </List.Item>
                      </List>
                    </div>
                  )}
                  {appointment.next_steps && (
                    <div>
                      <Text size='md' fw={600} ta={'start'}>
                        {'Next Steps'}
                      </Text>
                      <List icon='•'>
                        <List.Item ta={'start'}>
                          <Text lineClamp={1}>{appointment.next_steps}</Text>
                        </List.Item>
                      </List>
                    </div>
                  )}
                </Paper>
              </Timeline.Item>
            );
          })}

          <Timeline.Item
            title='Add Appointment'
            bullet={<IconPlus size={12} />}
          >
            <Paper
              shadow='xs'
              withBorder
              p='md'
              w={250}
              radius='md'
              component='button'
              onClick={handleAddAppointment}
            >
              <Text c='dimmed' size='sm'>
                {'Click here to create a new appointment'}
              </Text>
            </Paper>
          </Timeline.Item>
        </Timeline>
      </Center>
    </>
  );
};
