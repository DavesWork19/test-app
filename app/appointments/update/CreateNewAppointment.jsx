'use client';

import {
  Container,
  Button,
  Paper,
  Grid,
  Center,
  Text,
  TextInput,
  NumberInput,
  NativeSelect,
} from '@mantine/core';
import { DateTimePicker, TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../utils/supabase/client';
import { IconPlus } from '@tabler/icons-react';

export const CreateNewAppointment = (props) => {
  const [editButton, setEditButton] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const userID = props.userID;

  const initialValues = {
    title: '',
    startTime: '',
    endTime: '',
    status: 'Upcoming',
    price: '',
    vetname: '',
    vetlocation: '',
    vetphone: '',
    vetemail: '',
    description: '',
    nextsteps: '',
  };

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: initialValues,

    validate: {
      title: (value) => (value.length > 0 ? null : 'Title Required!'),
      startTime: (value) =>
        value.toString().length > 0 ? null : 'Start Time Required!',
    },
    // validate: {
    //   vetemail: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    // },
  });

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
  };
  const udpatedStartTime = form.getValues().startTime
    ? form.getValues().startTime.toLocaleDateString('en-US', options)
    : '';

  const udpatedEndTime = form.getValues().endTime
    ? form.getValues().endTime.toLocaleDateString('en-US', options)
    : '';

  const handleSubmit = async (values) => {
    if (JSON.stringify(values) !== JSON.stringify(initialValues)) {
      let startTimeStr = null;
      if (values.startTime) {
        const dateStartTime = values.startTime;
        const offset = dateStartTime.getTimezoneOffset();
        const adjustedDate = new Date(
          dateStartTime.getTime() - offset * 60 * 1000
        );
        startTimeStr = adjustedDate.toISOString();
      }
      let endTimeStr = null;
      if (values.endTime) {
        const dateEndTime = values.endTime;
        const offset = dateEndTime.getTimezoneOffset();
        const adjustedDate = new Date(
          dateEndTime.getTime() - offset * 60 * 1000
        );
        endTimeStr = adjustedDate.toISOString();
      }
      let updatedStatus = null;
      if (values.status) {
        if (values.status === 'Canceled') {
          updatedStatus = 0;
        } else if (values.status === 'Completed') {
          updatedStatus = 1;
        } else if (values.status === 'Upcoming') {
          updatedStatus = 2;
        }
      }

      const updatedPrice = values.price ? values.price : null;

      const { error } = await supabase.from('appointments').insert({
        title: values.title,
        start_time: startTimeStr,
        end_time: endTimeStr,
        status: updatedStatus,
        price: updatedPrice,
        description: values.description,
        next_steps: values.nextsteps,
        user_id: userID,
      });

      if (!error) {
        router.replace('/appointments');
      } else {
        console.log(error);
      }
    } else {
      router.replace('/appointments');
    }
  };
  return (
    <Container size='md'>
      <Paper shadow='xs' withBorder p='md' radius='md' bg={'blue'}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid pb={24}>
            <Grid.Col span='content' ps={40} pe={0} pb={0} pt={18} fz={'h4'}>
              <IconPlus size={12} />
            </Grid.Col>
            <Grid.Col span={2} ps={2} pt={14} fz={'h4'}>
              {editButton ? (
                form.getValues().status
              ) : (
                <NativeSelect
                  key={form.key('status')}
                  {...form.getInputProps('status')}
                  data={['Upcoming', 'Completed', 'Canceled']}
                />
              )}
            </Grid.Col>
            <Grid.Col span={6}>
              <Center fz={'h2'} fw={700}>
                {editButton ? (
                  form.getValues().title
                ) : (
                  <TextInput
                    key={form.key('title')}
                    {...form.getInputProps('title')}
                    placeholder='Enter title'
                  />
                )}
              </Center>
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
                    View
                  </Button>
                )}
                <Button
                  variant='outline'
                  color='grey'
                  bg='white'
                  size='compact-xs'
                  radius='xl'
                  type='submit'
                >
                  Save and Exit
                </Button>
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
                    <Text fw={550} pt={'sm'} pb={'lg'}>
                      {'Start'}
                    </Text>
                  )}
                </Grid.Col>
                <Grid.Col span={10} p={2} h={40}>
                  {editButton ? (
                    udpatedStartTime
                  ) : (
                    <DateTimePicker
                      key={form.key('startTime')}
                      {...form.getInputProps('startTime')}
                      valueFormat='ddd MMM DD, h:mm A'
                      placeholder='Enter appointment start time'
                    />
                  )}
                </Grid.Col>
                <Grid.Col span={2} p={2} fw={550}>
                  {editButton ? (
                    <Text fw={550}>{'Pick Up'}</Text>
                  ) : (
                    <Text fw={550} pt={'sm'}>
                      {'Pick Up'}
                    </Text>
                  )}
                </Grid.Col>
                <Grid.Col span={10} p={2} h={40}>
                  {editButton ? (
                    udpatedEndTime
                  ) : (
                    <DateTimePicker
                      key={form.key('endTime')}
                      {...form.getInputProps('endTime')}
                      valueFormat='ddd MMM DD, h:mm A'
                      placeholder='Enter appointment end time'
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
                    `$${form.getValues().price}`
                  ) : (
                    <NumberInput
                      prefix='$'
                      step={0.01}
                      key={form.key('price')}
                      {...form.getInputProps('price')}
                      placeholder='Enter price'
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
                    form.getValues().vetname
                  ) : (
                    <TextInput
                      key={form.key('vetname')}
                      {...form.getInputProps('vetname')}
                      placeholder="Enter vet's name"
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
                    form.getValues().vetlocation
                  ) : (
                    <TextInput
                      key={form.key('vetlocation')}
                      {...form.getInputProps('vetlocation')}
                      placeholder="Enter vet's address"
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
                    form.getValues().vetphone
                  ) : (
                    <NumberInput
                      decimalSeparator='-'
                      key={form.key('vetphone')}
                      {...form.getInputProps('vetphone')}
                      placeholder="Enter vet's phone number"
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
                    form.getValues().vetemail
                  ) : (
                    <TextInput
                      key={form.key('vetemail')}
                      {...form.getInputProps('vetemail')}
                      placeholder="Enter vet's email address"
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
              {form.getValues().description}
            </Text>
          ) : (
            <TextInput
              key={form.key('description')}
              {...form.getInputProps('description')}
              placeholder='Enter a description'
            />
          )}

          <Text size='lg' fw={700}>
            {'Next Steps'}
          </Text>
          {editButton ? (
            <Text size='lg' ms={6} mb={'xl'}>
              {form.getValues().nextsteps}
            </Text>
          ) : (
            <TextInput
              key={form.key('nextsteps')}
              {...form.getInputProps('nextsteps')}
              placeholder='Enter next steps'
            />
          )}
        </form>
      </Paper>
    </Container>
  );
};
