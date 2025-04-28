'use client';

import {
  Container,
  Button,
  Paper,
  Group,
  Center,
  Text,
  Title,
  TextInput,
  Textarea,
  NumberInput,
  Modal,
  Select,
  Menu,
  useMantineTheme,
  TagsInput,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../utils/supabase/client';
import { IconCircleCheck, IconCircleX, IconCircle } from '@tabler/icons-react';
import { useDisclosure } from '@mantine/hooks';
import { useMediaQuery } from '@mantine/hooks';
import { IconSettings, IconArrowBack, IconDownload } from '@tabler/icons-react';

export const AddAppointment = (props) => {
  const [successModalopened, successModalObj] = useDisclosure(false);
  const [failModalopened, failModalObj] = useDisclosure(false);
  const [status, setStatus] = useState('2');
  const router = useRouter();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  const vetNames = props.vetNames;
  const insuranceNames = props.insuranceNames;
  const categories = props.categories;

  const initialValues = {
    title: null,
    startTime: null,
    endTime: null,
    price: null,
    vet: null,
    insurance: null,
    description: null,
    nextsteps: null,
    category: [],
  };

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: initialValues,

    validate: {
      title: (value) => !value && 'Title Required!',
      startTime: (value) => !value && 'Start Time Required!',
    },
  });

  let color = '';
  let icon = '';

  if (status === '0') {
    color = 'red';
    icon = <IconCircleX size={24} />;
  } else if (status === '1') {
    color = 'green';
    icon = <IconCircleCheck size={24} />;
  } else if (status === '2') {
    color = 'blue';
    icon = <IconCircle size={24} />;
  }

  const handleExit = () => {
    router.replace('/appointments');
  };

  const handleSubmit = async (values) => {
    let formValidation = null;
    if (values === 'mobile') {
      values = form.getValues();
      formValidation = form.validate();
    } else {
      formValidation = { hasErrors: false };
    }

    if (
      (JSON.stringify(values) !== JSON.stringify(initialValues) ||
        status !== '2') &&
      !formValidation.hasErrors
    ) {
      const supabase = createClient();
      const { error } = await supabase.from('appointments').insert({
        title: values.title,
        start_time: values.startTime && values.startTime.toISOString(),
        end_time: values.endTime && values.endTime.toISOString(),
        status: parseInt(status),
        price: values.price && values.price,
        vet: values.vet,
        insurance: values.insurance,
        description: values.description,
        next_steps: values.nextsteps,
        category: values.category.length !== 0 && values.category.join(),
      });

      if (error) {
        failModalObj.open();
        setTimeout(() => {
          failModalObj.close();
        }, 1500);
      } else {
        successModalObj.open();
        setTimeout(() => {
          successModalObj.close();
          router.replace('/appointments');
        }, 2000);
      }
    }
  };
  return (
    <Container size='md'>
      <Modal
        opened={successModalopened}
        onClose={successModalObj.close}
        centered
        withCloseButton={false}
        size={'xs'}
      >
        <Text size='md' fw={600} c={'green'} ta='center' pb={12}>
          Successfully Saved!
        </Text>
        <Text size='xs' fw={500} c={'green'} ta='center'>
          This Appointment Is Now Available In The Appointments's page
        </Text>
      </Modal>
      <Modal
        opened={failModalopened}
        onClose={failModalObj.close}
        centered
        withCloseButton={false}
        size={'xs'}
      >
        <Text size='md' fw={600} c={'red'} ta='center' pb={12}>
          Error!
        </Text>
        <Text size='xs' fw={500} c={'red'} ta='center'>
          Something went wrong! Please try again
        </Text>
      </Modal>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        {!isMobile && (
          <Paper shadow='xs' withBorder p='md' bg={color}>
            <Group justify={'space-between'}>
              <Center>
                <Center mt={'md'} me={'xs'}>
                  {icon}
                </Center>
                <Select
                  value={status}
                  onChange={setStatus}
                  data={[
                    { label: 'Upcoming', value: '2' },
                    { label: 'Completed', value: '1' },
                    { label: 'Canceled', value: '0' },
                  ]}
                  allowDeselect={false}
                  withAsterisk
                  label='Appointment Status'
                />
              </Center>
              <TextInput
                key={form.key('title')}
                {...form.getInputProps('title')}
                w={250}
                withAsterisk
                label='Appointment Title'
                placeholder='Enter Appointment Title'
              />
              <Center>
                <Button
                  variant='outline'
                  color='black'
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
                  color='black'
                  bg='white'
                  size='compact-xs'
                  radius='md'
                  onClick={handleExit}
                  me={6}
                >
                  Back
                </Button>
              </Center>
            </Group>

            <Title order={3} size='h3' mt={'xl'}>
              {'Details'}
            </Title>
            <Group justify='space-between' grow mt='md' mb='xs'>
              <DateTimePicker
                key={form.key('startTime')}
                {...form.getInputProps('startTime')}
                valueFormat='dddd, MMMM D @ h:mm A'
                withAsterisk
                label='Appointment Start Time'
                placeholder='Enter Appointment Start Time'
              />
              <Select
                key={form.key('vet')}
                {...form.getInputProps('vet')}
                data={vetNames}
                label='Vet Used'
                placeholder='Select Vet Used'
              />
            </Group>
            <Group justify='space-between' grow mt='md' mb='xs'>
              <DateTimePicker
                key={form.key('endTime')}
                {...form.getInputProps('endTime')}
                valueFormat='dddd, MMMM D @ h:mm A'
                label='Appointment End Time'
                placeholder='Enter Appointment End Time'
              />
              <Select
                key={form.key('insurance')}
                {...form.getInputProps('insurance')}
                data={insuranceNames}
                label='Insurance Used'
                placeholder='Select Insurance Used'
              />
            </Group>
            <Group justify='space-between' grow mt='md' mb='xs'>
              <NumberInput
                prefix='$'
                step={0.01}
                key={form.key('price')}
                {...form.getInputProps('price')}
                label='Appointment Price'
                placeholder='Enter Appointment Price'
              />
              <TagsInput
                key={form.key('category')}
                {...form.getInputProps('category')}
                label='Category(ies?)'
                placeholder='Select Category'
                data={categories}
              />
            </Group>

            <Title order={3} size='h3' mt={'xl'} mb={'sm'}>
              {'Description'}
            </Title>

            <Textarea
              key={form.key('description')}
              {...form.getInputProps('description')}
              autosize
              placeholder='Enter Description'
            />

            <Title order={3} size='h3' mt={'xl'} mb={'sm'}>
              {'Next Steps'}
            </Title>
            <Textarea
              key={form.key('nextsteps')}
              {...form.getInputProps('nextsteps')}
              autosize
              placeholder='Enter Next Steps'
            />
          </Paper>
        )}
        {isMobile && (
          <Paper shadow='xs' withBorder p='md' bg={color}>
            <Group justify={'space-between'}>
              <Center mt={'md'}>{icon}</Center>
              <TextInput
                key={form.key('title')}
                {...form.getInputProps('title')}
                withAsterisk
                label='Appointment Title'
                placeholder='Enter Appointment Title'
              />
              <Center mt={'md'}>
                <Menu shadow='md' width={100}>
                  <Menu.Target>
                    <IconSettings stroke={2} />
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      leftSection={<IconDownload stroke={2} size={16} />}
                      type='submit'
                      onClick={() => handleSubmit('mobile')}
                    >
                      <Text size={'md'} fw={500}>
                        Save
                      </Text>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                      leftSection={<IconArrowBack stroke={2} size={16} />}
                      onClick={handleExit}
                    >
                      <Text size={'md'} fw={500}>
                        Back
                      </Text>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Center>
            </Group>
            <Title order={3} size='h3' mt={'xl'}>
              {'Details'}
            </Title>
            <Group justify='space-between' grow mt='md' mb='xs'>
              <Select
                value={status}
                onChange={setStatus}
                data={[
                  { label: 'Upcoming', value: '2' },
                  { label: 'Completed', value: '1' },
                  { label: 'Canceled', value: '0' },
                ]}
                allowDeselect={false}
                withAsterisk
                label='Appointment Status'
              />
            </Group>
            <Group justify='space-between' grow mt='md' mb='xs'>
              <DateTimePicker
                key={form.key('startTime')}
                {...form.getInputProps('startTime')}
                valueFormat='dddd, MMMM D @ h:mm A'
                withAsterisk
                label='Appointment Start Time'
                placeholder='Enter Appointment Start Time'
              />
            </Group>
            <Group justify='space-between' grow mt='md' mb='xs'>
              <DateTimePicker
                key={form.key('endTime')}
                {...form.getInputProps('endTime')}
                valueFormat='dddd, MMMM D @ h:mm A'
                label='Appointment End Time'
                placeholder='Enter Appointment End Time'
              />
            </Group>
            <Group justify='space-between' grow mt='md' mb='xs'>
              <NumberInput
                prefix='$'
                step={0.01}
                key={form.key('price')}
                {...form.getInputProps('price')}
                label='Appointment Price'
                placeholder='Enter Appointment Price'
              />
            </Group>
            <Group justify='space-between' grow mt='md' mb='xs'>
              <Select
                key={form.key('vet')}
                {...form.getInputProps('vet')}
                data={vetNames}
                label='Vet Used'
                placeholder='Select Vet Used'
              />
              <Select
                key={form.key('insurance')}
                {...form.getInputProps('insurance')}
                data={insuranceNames}
                label='Insurance Used'
                placeholder='Select Insurance Used'
              />
            </Group>
            <Group justify='space-between' grow mt='md' mb='xl'>
              <TagsInput
                key={form.key('category')}
                {...form.getInputProps('category')}
                label='Category(ies?)'
                placeholder='Select Category'
                data={categories}
              />
            </Group>

            <Title order={3} size='h3' mt={'xl'} mb={'sm'}>
              {'Description'}
            </Title>

            <Textarea
              key={form.key('description')}
              {...form.getInputProps('description')}
              autosize
              placeholder='Enter Description'
            />

            <Title order={3} size='h3' mt={'xl'} mb={'sm'}>
              {'Next Steps'}
            </Title>
            <Textarea
              key={form.key('nextsteps')}
              {...form.getInputProps('nextsteps')}
              autosize
              placeholder='Enter Next Steps'
            />
          </Paper>
        )}
      </form>
    </Container>
  );
};
