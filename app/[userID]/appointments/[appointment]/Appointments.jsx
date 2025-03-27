'use client';

import { Container, Button, Paper, Grid, Center, Text } from '@mantine/core';
import { TextInput, NumberInput } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';

import { IconCircle, IconCircleCheck, IconCircleX } from '@tabler/icons-react';
import {
  appointmentStatusConversion,
  months,
} from '@/app/components/constants';
import { useForm } from '@mantine/form';
import { useState } from 'react';

export const Appointments = (props) => {
  const userID = props.userID;
  const appointment = props.appointment;
  const appointmentData = props.appointmentData;
  const status = appointmentData.status;
  const [editButton, setEditButton] = useState(true);

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
  const startTime = `${time} on ${date}`;

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: {
      start: dateTime,
      price: appointmentData.price,
      vetname: appointmentData.vetname,
      vetlocation: appointmentData.vetlocation,
      vetphone: appointmentData.vetphone.split('-').join('.'),
      vetemail: appointmentData.vetemail,
      description: appointmentData.description,
      nextsteps: appointmentData.nextsteps,
    },

    validate: {
      vetemail: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleSubmit = async (values) => {
    await fetch(`/api/${userID}/appointmentData/${appointment}/put`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
  };

  return (
    <Container size='md'>
      <Paper shadow='xs' withBorder p='md' radius='md' bg={color}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
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
            <Grid.Col span={3} pt={12}>
              <Center>
                {editButton ? (
                  <Button
                    variant='outline'
                    color='black'
                    bg='white'
                    size='compact-xs'
                    radius='xl'
                    type='submit'
                    onClick={() => setEditButton(false)}
                  >
                    Edit
                  </Button>
                ) : (
                  <Button
                    variant='outline'
                    color='grey'
                    bg='white'
                    size='compact-xs'
                    radius='xl'
                    onClick={() => setEditButton(true)}
                  >
                    Save
                  </Button>
                )}
              </Center>
            </Grid.Col>
          </Grid>

          <Text size='lg' fw={700} mt={'md'}>
            {'Details'}
          </Text>
          <Grid ms={6} mb={'xl'}>
            <Grid.Col span={5}>
              <Grid ms={60} mt={12}>
                <Grid.Col span={2} p={2} fw={550}>
                  {editButton ? (
                    <Text fw={550}>{'Start'}</Text>
                  ) : (
                    <Text fw={550} pt={'sm'}>
                      {'Start'}
                    </Text>
                  )}
                </Grid.Col>
                <Grid.Col span={10} p={2} h={40}>
                  {editButton ? (
                    startTime
                  ) : (
                    <DateTimePicker
                      key={form.key('start')}
                      {...form.getInputProps('start')}
                    />
                  )}
                </Grid.Col>
                <Grid.Col span={2} p={2} fw={550}>
                  {editButton ? (
                    <Text fw={550}>{'Duration'}</Text>
                  ) : (
                    <Text fw={550} pt={'sm'}>
                      {'Duration'}
                    </Text>
                  )}
                </Grid.Col>
                <Grid.Col span={10} p={2} h={40}>
                  {editButton ? (
                    updatedDuration
                  ) : (
                    <TextInput
                      key={form.key('start')}
                      {...form.getInputProps('start')}
                    />
                  )}
                </Grid.Col>
                <Grid.Col span={2} p={2} fw={550}>
                  {editButton ? (
                    <Text fw={550}>{'Price'}</Text>
                  ) : (
                    <Text fw={550} pt={'sm'}>
                      {'Price'}
                    </Text>
                  )}
                </Grid.Col>
                <Grid.Col span={10} p={2} h={40}>
                  {editButton ? (
                    `$${appointmentData.price}`
                  ) : (
                    <NumberInput
                      prefix='$'
                      step={0.01}
                      key={form.key('price')}
                      {...form.getInputProps('price')}
                    />
                  )}
                </Grid.Col>
              </Grid>
            </Grid.Col>
            <Grid.Col span={7}>
              <Grid ps={60}>
                <Grid.Col span={2} p={2} fw={550}>
                  {editButton ? (
                    <Text fw={550}>{'Vet'}</Text>
                  ) : (
                    <Text fw={550} pt={'sm'}>
                      {'Vet'}
                    </Text>
                  )}
                </Grid.Col>
                <Grid.Col span={10} p={2} h={40}>
                  {editButton ? (
                    appointmentData.vetname
                  ) : (
                    <TextInput
                      key={form.key('vetname')}
                      {...form.getInputProps('vetname')}
                    />
                  )}
                </Grid.Col>
                <Grid.Col span={2} p={2} fw={550}>
                  {editButton ? (
                    <Text fw={550}>{'Location'}</Text>
                  ) : (
                    <Text fw={550} pt={'sm'}>
                      {'Location'}
                    </Text>
                  )}
                </Grid.Col>
                <Grid.Col span={10} p={2} h={40}>
                  {editButton ? (
                    appointmentData.vetlocation
                  ) : (
                    <TextInput
                      key={form.key('vetlocation')}
                      {...form.getInputProps('vetlocation')}
                    />
                  )}
                </Grid.Col>
                <Grid.Col span={2} p={2} fw={550}>
                  {editButton ? (
                    <Text fw={550}>{'Phone'}</Text>
                  ) : (
                    <Text fw={550} pt={'sm'}>
                      {'Phone'}
                    </Text>
                  )}
                </Grid.Col>
                <Grid.Col span={10} p={2} h={40}>
                  {editButton ? (
                    appointmentData.vetphone
                  ) : (
                    <NumberInput
                      decimalSeparator='-'
                      key={form.key('vetphone')}
                      {...form.getInputProps('vetphone')}
                    />
                  )}
                </Grid.Col>
                <Grid.Col span={2} p={2} fw={550}>
                  {editButton ? (
                    <Text fw={550}>{'Email'}</Text>
                  ) : (
                    <Text fw={550} pt={'sm'}>
                      {'Email'}
                    </Text>
                  )}
                </Grid.Col>
                <Grid.Col span={10} p={2} h={40}>
                  {editButton ? (
                    appointmentData.vetemail
                  ) : (
                    <TextInput
                      key={form.key('vetemail')}
                      {...form.getInputProps('vetemail')}
                    />
                  )}
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>

          <Text size='lg' fw={700}>
            {'Review'}
          </Text>
          {editButton ? (
            <Text size='lg' ms={6} mb={'sm'}>
              {appointmentData.description}
            </Text>
          ) : (
            <TextInput
              key={form.key('description')}
              {...form.getInputProps('description')}
            />
          )}

          <Text size='lg' fw={700}>
            {'Next Steps'}
          </Text>
          {editButton ? (
            <Text size='lg' ms={6} mb={'xl'}>
              {appointmentData.nextsteps}
            </Text>
          ) : (
            <TextInput
              key={form.key('nextsteps')}
              {...form.getInputProps('nextsteps')}
            />
          )}
        </form>
      </Paper>
    </Container>
  );
};
