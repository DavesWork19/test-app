'use client';

import { Container, Button, Paper, Grid, Center, Text } from '@mantine/core';
import { IconCircle, IconCircleCheck, IconCircleX } from '@tabler/icons-react';
import {
  appointmentStatusConversion,
  months,
} from '@/app/components/constants';

export const Appointments = (props) => {
  const appointmentData = props.appointmentData;
  const status = appointmentData.status;

  let color = '';
  if (status === 0) {
    color = 'red';
  } else if (status === 1) {
    color = 'green';
  } else if (status === 2) {
    color = 'blue';
  }
  let icon = '';
  if (status === 0) {
    icon = <IconCircleX size={10} />;
  } else if (status === 1) {
    icon = <IconCircleCheck size={10} />;
  } else if (status === 2) {
    icon = <IconCircle size={10} />;
  }

  const dateTime = new Date(appointmentData.datetime);
  const date = `${
    months[dateTime.getMonth()]
  } ${dateTime.getDate()}, ${dateTime.getFullYear()}`;
  const fullTime = dateTime.toLocaleString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const ampm = fullTime.slice(fullTime.length - 2);
  const time = `${dateTime.getHours()}:${dateTime.getMinutes()} ${ampm}`;

  const [hour, minutes] = appointmentData.hours.split('.');
  const updatedMinutes = (minutes * 60) / 100;
  const updatedDuration =
    hour === '0'
      ? `${updatedMinutes} minutes`
      : `${hour} hours and ${updatedMinutes} minutes`;

  return (
    <Container size='md'>
      <Paper shadow='xs' withBorder p='md' radius='md' bg={color}>
        <Grid pb={24}>
          <Grid.Col span='content' ps={40} pe={0} pb={0} pt={18} fz={'h4'}>
            {icon}
          </Grid.Col>
          <Grid.Col span={2} ps={2} pt={14} fz={'h4'}>
            {appointmentStatusConversion[status]}
          </Grid.Col>
          <Grid.Col span={6}>
            <Center
              fz={'h2'}
              fw={700}
            >{`${appointmentData.title} Appointment`}</Center>
          </Grid.Col>
          <Grid.Col span={3} pt={11}>
            <Center>
              <Button
                variant='default'
                color='green'
                size='compact-xs'
                radius='xl'
              >
                Edit
              </Button>
            </Center>
          </Grid.Col>
        </Grid>
        <Text size='lg' fw={700} mb={'sm'}>
          {'Details'}
        </Text>

        <Grid ms={6} mb={'xl'}>
          <Grid.Col span={7}>
            <Grid ms={60} mt={12}>
              <Grid.Col span={2} p={2} fw={550}>
                {'Start'}
              </Grid.Col>
              <Grid.Col span={10} p={2}>
                {`${time} on ${date}`}
              </Grid.Col>
              <Grid.Col span={2} p={2} fw={550}>
                {'Duration'}
              </Grid.Col>
              <Grid.Col span={10} p={2}>
                {updatedDuration}
              </Grid.Col>
              <Grid.Col span={2} p={2} fw={550}>
                {'Price'}
              </Grid.Col>
              <Grid.Col span={10} p={2}>
                {`$${appointmentData.price}`}
              </Grid.Col>
            </Grid>
          </Grid.Col>
          <Grid.Col span={5}>
            <Grid>
              <Grid.Col span={2} p={2} fw={550}>
                {'Vet'}
              </Grid.Col>
              <Grid.Col span={10} p={2}>
                {appointmentData.vetname}
              </Grid.Col>
              <Grid.Col span={2} p={2} fw={550}>
                {'Location'}
              </Grid.Col>
              <Grid.Col span={10} p={2}>
                {appointmentData.vetlocation}
              </Grid.Col>
              <Grid.Col span={2} p={2} fw={550}>
                {'Phone'}
              </Grid.Col>
              <Grid.Col span={10} p={2}>
                {appointmentData.vetphone}
              </Grid.Col>
              <Grid.Col span={2} p={2} fw={550}>
                {'Email'}
              </Grid.Col>
              <Grid.Col span={10} p={2}>
                {appointmentData.vetemail}
              </Grid.Col>
            </Grid>
          </Grid.Col>
        </Grid>

        <Text size='lg' fw={700}>
          {'Review'}
        </Text>
        <Text size='lg' ms={6} mb={'sm'}>
          {appointmentData.description}
        </Text>
        <Text size='lg' fw={700}>
          {'Next Steps'}
        </Text>
        <Text size='lg' ms={6} mb={'xl'}>
          {appointmentData.nextsteps}
        </Text>
      </Paper>
    </Container>
  );
};
