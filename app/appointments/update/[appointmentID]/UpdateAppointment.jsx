'use client';

import {
  Container,
  Button,
  Paper,
  Grid,
  Center,
  Text,
  Title,
  TextInput,
  NumberInput,
  Modal,
  Select,
  useMantineTheme,
  Menu,
  Group,
  Textarea,
  TagsInput,
} from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../utils/supabase/client';
import { IconCircleCheck, IconCircleX, IconCircle } from '@tabler/icons-react';
import { appointmentStatusConversion } from '../../../components/constants';
import { useDisclosure } from '@mantine/hooks';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconSettings,
  IconArrowBack,
  IconDownload,
  IconTrash,
  IconEdit,
  IconClipboardText,
} from '@tabler/icons-react';

export const UpdateAppointment = (props) => {
  const [editButton, setEditButton] = useState(true);
  const [successModalopened, successModalObj] = useDisclosure(false);
  const [failModalopened, failModalObj] = useDisclosure(false);
  const router = useRouter();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  const appointment = props.appointment;
  const vetNames = props.vetNames;
  const insuranceNames = props.insuranceNames;
  const categories = props.categories;

  const [status, setStatus] = useState(String(appointment.status));
  const [categorySelected, setCategorySelected] = useState();

  const initialValues = {
    title: appointment.title,
    startTime: new Date(appointment.start_time),
    endTime: appointment.end_time ? new Date(appointment.end_time) : null,
    price: appointment.price ? appointment.price : null,
    vet: appointment.vet,
    insurance: appointment.insurance,
    description: appointment.description,
    nextsteps: appointment.next_steps,
    category: appointment.category ? appointment.category.split(',') : [],
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

  const handleDelete = async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from('appointments')
      .delete()
      .eq('id', appointment.id);
    if (error) {
      failModalObj.open();
      setTimeout(() => {
        failModalObj.close();
      }, 1500);
    } else {
      router.replace('/appointments');
    }
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
        status !== String(appointment.status)) &&
      !formValidation.hasErrors
    ) {
      const supabase = createClient();
      const { error } = await supabase
        .from('appointments')
        .update({
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
        })
        .eq('id', appointment.id);

      if (error) {
        failModalObj.open();
        setTimeout(() => {
          failModalObj.close();
        }, 1500);
      } else {
        successModalObj.open();
      }
    }
  };
  return (
    <Container size='md'>
      <Modal
        opened={successModalopened}
        onClose={successModalObj.close}
        centered
        size={'xs'}
      >
        <Text size='md' fw={600} c={'green'} ta='center' pb={12}>
          Successfully Saved!
        </Text>
        <Text size='xs' fw={500} c={'green'} ta='center'>
          Continue Editing Or Head Back To The Appointment's page
        </Text>
        <Center mt={'md'}>
          <Button
            leftSection={<IconArrowBack stroke={1} size={16} />}
            size={'xs'}
            variant={'outline'}
            c={'green'}
            color={'green'}
            onClick={handleExit}
          >
            Back
          </Button>
        </Center>
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
                {editButton ? (
                  <Select
                    disabled
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
                ) : (
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
                )}
              </Center>
              {editButton ? (
                <TextInput
                  disabled
                  key={form.key('title')}
                  {...form.getInputProps('title')}
                  w={250}
                  withAsterisk
                  label='Appointment Title'
                  placeholder='Enter Appointment Title'
                />
              ) : (
                <TextInput
                  key={form.key('title')}
                  {...form.getInputProps('title')}
                  w={250}
                  withAsterisk
                  label='Appointment Title'
                  placeholder='Enter Appointment Title'
                />
              )}
              <Center mt={'md'}>
                {editButton ? (
                  <Button
                    variant='outline'
                    color='black'
                    bg='white'
                    size='compact-xs'
                    radius='xl'
                    onClick={() => setEditButton(false)}
                    me={6}
                    w={37}
                  >
                    Edit
                  </Button>
                ) : (
                  <Button
                    variant='outline'
                    color='black'
                    bg='white'
                    size='compact-xs'
                    radius='xl'
                    onClick={() => setEditButton(true)}
                    me={6}
                    w={37}
                  >
                    View
                  </Button>
                )}
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
                  radius='xl'
                  onClick={handleExit}
                  me={6}
                >
                  Back
                </Button>
                <Button
                  variant='outline'
                  color='red'
                  bg='white'
                  size='compact-xs'
                  radius='xl'
                  onClick={handleDelete}
                >
                  Delete
                </Button>
              </Center>
            </Group>

            <Title order={3} size='h3' mt={'xl'}>
              {'Details'}
            </Title>
            <Group justify='space-between' grow mt='md' mb='xs'>
              {editButton ? (
                <DateTimePicker
                  disabled
                  key={form.key('startTime')}
                  {...form.getInputProps('startTime')}
                  valueFormat='dddd, MMMM D @ h:mm A'
                  withAsterisk
                  label='Appointment Start Time'
                  placeholder='Enter Appointment Start Time'
                />
              ) : (
                <DateTimePicker
                  key={form.key('startTime')}
                  {...form.getInputProps('startTime')}
                  valueFormat='dddd, MMMM D @ h:mm A'
                  withAsterisk
                  label='Appointment Start Time'
                  placeholder='Enter Appointment Start Time'
                />
              )}
              {editButton ? (
                <Select
                  disabled
                  key={form.key('vet')}
                  {...form.getInputProps('vet')}
                  data={vetNames}
                  label='Vet Used'
                  placeholder='Select Vet Used'
                />
              ) : (
                <Select
                  key={form.key('vet')}
                  {...form.getInputProps('vet')}
                  data={vetNames}
                  label='Vet Used'
                  placeholder='Select Vet Used'
                />
              )}
            </Group>
            <Group justify='space-between' grow mt='md' mb='xs'>
              {editButton ? (
                <DateTimePicker
                  disabled
                  key={form.key('endTime')}
                  {...form.getInputProps('endTime')}
                  valueFormat='dddd, MMMM D @ h:mm A'
                  label='Appointment End Time'
                  placeholder='Enter Appointment End Time'
                />
              ) : (
                <DateTimePicker
                  key={form.key('endTime')}
                  {...form.getInputProps('endTime')}
                  valueFormat='dddd, MMMM D @ h:mm A'
                  label='Appointment End Time'
                  placeholder='Enter Appointment End Time'
                />
              )}
              {editButton ? (
                <Select
                  disabled
                  key={form.key('insurance')}
                  {...form.getInputProps('insurance')}
                  data={insuranceNames}
                  label='Insurance Used'
                  placeholder='Select Insurance Used'
                />
              ) : (
                <Select
                  key={form.key('insurance')}
                  {...form.getInputProps('insurance')}
                  data={insuranceNames}
                  label='Insurance Used'
                  placeholder='Select Insurance Used'
                />
              )}
            </Group>
            <Group justify='space-between' grow mt='md' mb='xs'>
              {editButton ? (
                <NumberInput
                  disabled
                  prefix='$'
                  step={0.01}
                  key={form.key('price')}
                  {...form.getInputProps('price')}
                  label='Appointment Price'
                  placeholder='Enter Appointment Price'
                />
              ) : (
                <NumberInput
                  prefix='$'
                  step={0.01}
                  key={form.key('price')}
                  {...form.getInputProps('price')}
                  label='Appointment Price'
                  placeholder='Enter Appointment Price'
                />
              )}
              {editButton ? (
                <TagsInput
                  disabled
                  key={form.key('category')}
                  {...form.getInputProps('category')}
                  label='Category(ies?)'
                  placeholder='Select Category'
                  defaultValue={form.getValues().category}
                />
              ) : (
                <TagsInput
                  key={form.key('category')}
                  {...form.getInputProps('category')}
                  label='Category(ies?)'
                  placeholder='Select Category'
                  data={categories}
                />
              )}
            </Group>

            <Title order={3} size='h3' mt={'xl'} mb={'sm'}>
              {'Description'}
            </Title>

            {editButton ? (
              <Textarea
                disabled
                key={form.key('description')}
                {...form.getInputProps('description')}
                autosize
                placeholder='Enter Description'
              />
            ) : (
              <Textarea
                key={form.key('description')}
                {...form.getInputProps('description')}
                autosize
                placeholder='Enter Description'
              />
            )}

            <Title order={3} size='h3' mt={'xl'} mb={'sm'}>
              {'Next Steps'}
            </Title>
            {editButton ? (
              <Textarea
                disabled
                key={form.key('nextsteps')}
                {...form.getInputProps('nextsteps')}
                autosize
                placeholder='Enter Next Steps'
              />
            ) : (
              <Textarea
                key={form.key('nextsteps')}
                {...form.getInputProps('nextsteps')}
                autosize
                placeholder='Enter Next Steps'
              />
            )}
          </Paper>
        )}
        {isMobile && (
          <Paper shadow='xs' withBorder p='md' bg={color}>
            <Group justify={'space-between'}>
              <Center mt={'md'}>{icon}</Center>
              {editButton ? (
                <TextInput
                  disabled
                  key={form.key('title')}
                  {...form.getInputProps('title')}
                  withAsterisk
                  label='Appointment Title'
                  placeholder='Enter Appointment Title'
                />
              ) : (
                <TextInput
                  key={form.key('title')}
                  {...form.getInputProps('title')}
                  withAsterisk
                  label='Appointment Title'
                  placeholder='Enter Appointment Title'
                />
              )}
              <Center mt={'md'}>
                <Menu shadow='md' width={100}>
                  <Menu.Target>
                    <IconSettings stroke={2} />
                  </Menu.Target>
                  <Menu.Dropdown>
                    {editButton ? (
                      <Menu.Item
                        leftSection={<IconEdit stroke={2} size={16} />}
                        onClick={() => setEditButton(false)}
                      >
                        <Text size={'md'} fw={500}>
                          Edit
                        </Text>
                      </Menu.Item>
                    ) : (
                      <Menu.Item
                        leftSection={<IconClipboardText stroke={2} size={16} />}
                        onClick={() => setEditButton(true)}
                      >
                        <Text size={'md'} fw={500}>
                          View
                        </Text>
                      </Menu.Item>
                    )}
                    <Menu.Item
                      leftSection={<IconDownload stroke={2} size={16} />}
                      type='submit'
                      onClick={() => handleSubmit('mobile')}
                    >
                      <Text size={'md'} fw={500}>
                        Save
                      </Text>
                    </Menu.Item>
                    {/* <Menu.Divider /> */}
                    <Menu.Item
                      leftSection={<IconArrowBack stroke={2} size={16} />}
                      onClick={handleExit}
                    >
                      <Text size={'md'} fw={500}>
                        Back
                      </Text>
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item
                      leftSection={
                        <IconTrash color='red' stroke={2} size={16} />
                      }
                      onClick={handleDelete}
                    >
                      <Text size={'md'} fw={500} c='red'>
                        Delete
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
              {editButton ? (
                <Select
                  disabled
                  value={status}
                  onChange={setStatus}
                  data={[
                    { label: 'Upcoming', value: '2' },
                    { label: 'Completed', value: '1' },
                    { label: 'Canceled', value: '0' },
                  ]}
                  allowDeselect={false}
                  label='Appointment Status'
                />
              ) : (
                <Select
                  value={status}
                  onChange={setStatus}
                  data={[
                    { label: 'Upcoming', value: '2' },
                    { label: 'Completed', value: '1' },
                    { label: 'Canceled', value: '0' },
                  ]}
                  allowDeselect={false}
                  label='Appointment Status'
                />
              )}
            </Group>
            <Group justify='space-between' grow mt='md' mb='xs'>
              {editButton ? (
                <DateTimePicker
                  disabled
                  key={form.key('startTime')}
                  {...form.getInputProps('startTime')}
                  valueFormat='dddd, MMMM D @ h:mm A'
                  label='Appointment Start Time'
                  placeholder='Enter Appointment Start Time'
                />
              ) : (
                <DateTimePicker
                  key={form.key('startTime')}
                  {...form.getInputProps('startTime')}
                  valueFormat='dddd, MMMM D @ h:mm A'
                  label='Appointment Start Time'
                  placeholder='Enter Appointment Start Time'
                />
              )}
            </Group>
            <Group justify='space-between' grow mt='md' mb='xs'>
              {editButton ? (
                <DateTimePicker
                  disabled
                  key={form.key('endTime')}
                  {...form.getInputProps('endTime')}
                  valueFormat='dddd, MMMM D @ h:mm A'
                  label='Appointment End Time'
                  placeholder='Enter Appointment End Time'
                />
              ) : (
                <DateTimePicker
                  key={form.key('endTime')}
                  {...form.getInputProps('endTime')}
                  valueFormat='dddd, MMMM D @ h:mm A'
                  label='Appointment End Time'
                  placeholder='Enter Appointment End Time'
                />
              )}
            </Group>
            <Group justify='space-between' grow mt='md' mb='xs'>
              {editButton ? (
                <NumberInput
                  disabled
                  prefix='$'
                  step={0.01}
                  key={form.key('price')}
                  {...form.getInputProps('price')}
                  label='Appointment Price'
                  placeholder='Enter Appointment Price'
                />
              ) : (
                <NumberInput
                  prefix='$'
                  step={0.01}
                  key={form.key('price')}
                  {...form.getInputProps('price')}
                  label='Appointment Price'
                  placeholder='Enter Appointment Price'
                />
              )}
            </Group>
            <Group justify='space-between' grow mt='md' mb='xs'>
              {editButton ? (
                <Select
                  disabled
                  key={form.key('vet')}
                  {...form.getInputProps('vet')}
                  data={vetNames}
                  label='Vet Used'
                  placeholder='Add Vet'
                />
              ) : (
                <Select
                  key={form.key('vet')}
                  {...form.getInputProps('vet')}
                  data={vetNames}
                  label='Vet Used'
                  placeholder='Add Vet'
                />
              )}
              {editButton ? (
                <Select
                  disabled
                  key={form.key('insurance')}
                  {...form.getInputProps('insurance')}
                  data={insuranceNames}
                  label='Insurance Used'
                  placeholder='Add Insurance'
                />
              ) : (
                <Select
                  key={form.key('insurance')}
                  {...form.getInputProps('insurance')}
                  data={insuranceNames}
                  label='Insurance Used'
                  placeholder='Add Insurance'
                />
              )}
            </Group>
            <Group justify='space-between' grow mt='md' mb='xl'>
              {editButton ? (
                <TagsInput
                  disabled
                  key={form.key('category')}
                  {...form.getInputProps('category')}
                  label='Category(ies?)'
                  placeholder='Select Category'
                  defaultValue={form.getValues().category}
                />
              ) : (
                <TagsInput
                  key={form.key('category')}
                  {...form.getInputProps('category')}
                  label='Category(ies?)'
                  placeholder='Select Category'
                  data={categories}
                />
              )}
            </Group>

            <Title order={3} size='h3' mt={'xl'} mb={'sm'}>
              {'Description'}
            </Title>

            {editButton ? (
              <Textarea
                disabled
                key={form.key('description')}
                {...form.getInputProps('description')}
                autosize
                placeholder='Enter Description'
              />
            ) : (
              <Textarea
                key={form.key('description')}
                {...form.getInputProps('description')}
                autosize
                placeholder='Enter Description'
              />
            )}

            <Title order={3} size='h3' mt={'xl'} mb={'sm'}>
              {'Next Steps'}
            </Title>
            {editButton ? (
              <Textarea
                disabled
                key={form.key('nextsteps')}
                {...form.getInputProps('nextsteps')}
                autosize
                placeholder='Enter Next Steps'
              />
            ) : (
              <Textarea
                key={form.key('nextsteps')}
                {...form.getInputProps('nextsteps')}
                autosize
                placeholder='Enter Next Steps'
              />
            )}
          </Paper>
        )}
      </form>
    </Container>
  );
};
