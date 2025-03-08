'use client';

import { Center, Timeline, Text, Paper } from '@mantine/core';
import { IconCircle, IconCircleCheck, IconCircleX } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { months } from '../constants';
import classes from './HomeAppointment.module.css';

export const HomeAppointments = (props) => {
  const router = useRouter();

  const appointments = props.appointments;

  const handleOnClick = (route) => {
    router.push(`/${props.userID}/appointments/${route}`);
  };

  return (
    <Center className={classes.appointmentContainer}>
      <Timeline active={5} bulletSize={24} lineWidth={2}>
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
          const dateTime = new Date(appointment.datetime);
          const date = `${
            months[dateTime.getMonth()]
          } ${dateTime.getDate()}, ${dateTime.getFullYear()}`;
          const time = `${dateTime.getHours()}:${dateTime.getMinutes()}`;

          return (
            <Timeline.Item
              bullet={icon}
              title={`${appointment.title} - ${date} @ ${time}`}
              lineVariant={lineVariant}
              key={appointment.datetime}
              color={color}
            >
              <Paper
                shadow='xs'
                withBorder
                p='md'
                radius='md'
                bg={color}
                onClick={() => handleOnClick(appointment.appointmentid)}
              >
                <Text size='sm' mb={'sm'}>
                  {appointment.description}
                </Text>
                <Text size='xs' mt={4}>
                  {`- ${appointment.vetname}`}
                </Text>
              </Paper>
            </Timeline.Item>
          );
        })}
      </Timeline>
    </Center>
  );
};
