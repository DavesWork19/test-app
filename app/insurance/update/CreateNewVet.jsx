'use client';

import {
  TextInput,
  Title,
  Card,
  Group,
  Button,
  Container,
  Paper,
  Grid,
  Center,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { createClient } from '../../utils/supabase/client';
import { useRouter } from 'next/navigation';

export const CreateNewVet = (props) => {
  const router = useRouter();
  const userID = props.userID;

  const initialValues = {
    name: '',
    phone_number: '',
    email: '',
    location: '',
  };

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: initialValues,

    validate: {
      name: (value) => (value.length > 0 ? null : 'Vet Name Needed!'),
    },
  });

  const handleExit = () => {
    router.replace('/insurance');
  };

  const handleSubmit = async (values) => {
    const supabase = createClient();
    const { error } = await supabase.from('vets').insert({
      name: values.name,
      phone_number: values.phone_number,
      email: values.email,
      location: values.location,
      last_updated: new Date(),
      user_id: userID,
    });

    if (error) {
      console.log('errorereoreoore');
    } else {
      console.log('nooo erore??????');
    }
  };

  return (
    <Container size='md'>
      <Paper shadow='xs' withBorder p='md' radius='md' bg={'lightgray'}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid pb={12}>
            <Grid.Col span={4}></Grid.Col>
            <Grid.Col span={4}>
              <Center>
                <Title>Add New Vet</Title>
              </Center>
            </Grid.Col>
            <Grid.Col span={4} mt={4}>
              <Center>
                <Button
                  variant='outline'
                  color='grey'
                  bg='white'
                  size='compact-xs'
                  radius='xl'
                  type='submit'
                  me={6}
                >
                  Save
                </Button>
                <Button
                  variant='outline'
                  color='grey'
                  bg='white'
                  size='compact-xs'
                  radius='xl'
                  onClick={handleExit}
                >
                  Exit
                </Button>
              </Center>
            </Grid.Col>
          </Grid>

          <Card shadow='sm' padding='lg' radius='md' withBorder>
            <Group justify='space-between' grow mt='md' mb='xs'>
              <TextInput
                variant={'filled'}
                key={form.key('name')}
                {...form.getInputProps('name')}
                placeholder='Vet Name'
              />
            </Group>
            <Group justify='space-between' grow mt='md' mb='xs'>
              <TextInput
                variant={'filled'}
                key={form.key('location')}
                {...form.getInputProps('location')}
                placeholder='Vet Location'
              />
            </Group>
            <Group justify='space-between' grow mt='md' mb='xs'>
              <TextInput
                variant={'filled'}
                key={form.key('email')}
                {...form.getInputProps('email')}
                placeholder='Vet Email Address'
              />
            </Group>
            <Group justify='space-between' grow mt='md' mb='xs'>
              <TextInput
                variant={'filled'}
                key={form.key('phone_number')}
                {...form.getInputProps('phone_number')}
                placeholder='Vet Phone Number'
              />
            </Group>
          </Card>
        </form>
      </Paper>
    </Container>
  );
};
