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
  };

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: initialValues,

    validate: {
      title: (value) => (value.length > 0 ? null : 'Title Required!'),
      startTime: (value) =>
        value.toString().length > 0 ? null : 'Start Time Required!',
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
      JSON.stringify(values) !== JSON.stringify(initialValues) &&
      status !== appointment.status &&
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
        })
        .eq('id', appointment.id);

      if (error) {
        failModalObj.open();
        setTimeout(() => {
          failModalObj.close();
        }, 1500);
      } else {
        successModalObj.open();
        setTimeout(() => {
          successModalObj.close();
        }, 1500);
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
          Continue editing or exit and return to the Appointments page
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
            <Grid pb={24}>
              <Grid.Col span='content' ps={40} pe={0} pb={0} pt={12} fz={'h4'}>
                {icon}
              </Grid.Col>
              <Grid.Col span={2} ps={2} pt={8} fz={'h4'}>
                {editButton ? (
                  <Text size={'xl'} fw={600} pt={4} ps={8}>
                    {appointmentStatusConversion[parseInt(status)]}
                  </Text>
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
              </Grid.Col>
              <Grid.Col span={6}>
                <Center fz={'h2'} fw={700}>
                  {editButton ? (
                    <Title order={2} size='h1'>
                      {form.getValues().title}
                    </Title>
                  ) : (
                    <TextInput
                      key={form.key('title')}
                      {...form.getInputProps('title')}
                      placeholder='Enter Appointment Title'
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
                      me={6}
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
              </Grid.Col>
            </Grid>

            <Grid>
              <Grid.Col span={12}>
                <Title order={3} size='h3' mt={'xl'}>
                  {'Details'}
                </Title>
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size={'lg'} fw={700}>
                  {'Start'}
                </Text>
                {editButton ? (
                  <DateTimePicker
                    disabled
                    key={form.key('startTime')}
                    {...form.getInputProps('startTime')}
                    valueFormat='dddd, MMMM D @ h:mm A'
                    placeholder='Enter Appointment Start Time'
                  />
                ) : (
                  <DateTimePicker
                    key={form.key('startTime')}
                    {...form.getInputProps('startTime')}
                    valueFormat='dddd, MMMM D @ h:mm A'
                    placeholder='Enter Appointment Start Time'
                  />
                )}
                <Text size={'lg'} fw={700} mt={'xs'}>
                  {'Pick Up'}
                </Text>
                {editButton ? (
                  <DateTimePicker
                    disabled
                    key={form.key('endTime')}
                    {...form.getInputProps('endTime')}
                    valueFormat='dddd, MMMM D @ h:mm A'
                    placeholder='Enter Appointment End Time'
                  />
                ) : (
                  <DateTimePicker
                    key={form.key('endTime')}
                    {...form.getInputProps('endTime')}
                    valueFormat='dddd, MMMM D @ h:mm A'
                    placeholder='Enter Appointment End Time'
                  />
                )}
                <Text size={'lg'} fw={700} mt={'xs'}>
                  {'Price'}
                </Text>
                {editButton ? (
                  <NumberInput
                    disabled
                    prefix='$'
                    step={0.01}
                    key={form.key('price')}
                    {...form.getInputProps('price')}
                    placeholder='Enter Price'
                  />
                ) : (
                  <NumberInput
                    prefix='$'
                    step={0.01}
                    key={form.key('price')}
                    {...form.getInputProps('price')}
                    placeholder='Enter Price'
                  />
                )}
              </Grid.Col>
              <Grid.Col span={6}>
                <Text size={'lg'} fw={700}>
                  {'Vet'}
                </Text>
                {editButton ? (
                  <Select
                    disabled
                    key={form.key('vet')}
                    {...form.getInputProps('vet')}
                    data={vetNames}
                    placeholder='Add Vet'
                  />
                ) : (
                  <Select
                    key={form.key('vet')}
                    {...form.getInputProps('vet')}
                    data={vetNames}
                    placeholder='Add Vet'
                  />
                )}
                <Text size={'lg'} fw={700} mt={'xs'}>
                  {'Insurance'}
                </Text>
                {editButton ? (
                  <Select
                    disabled
                    key={form.key('insurance')}
                    {...form.getInputProps('insurance')}
                    data={insuranceNames}
                    placeholder='Add Insurance'
                  />
                ) : (
                  <Select
                    key={form.key('insurance')}
                    {...form.getInputProps('insurance')}
                    data={insuranceNames}
                    placeholder='Add Insurance'
                  />
                )}
                <Text size={'lg'} fw={700} mt={'xs'}>
                  {'Category'}
                </Text>
                {editButton ? (
                  <Select
                    disabled
                    value={categorySelected}
                    onChange={setCategorySelected}
                    data={[
                      { label: 'Add New Vet', value: '0' },
                      { label: 'Dental', value: '1' },
                      { label: 'for fun', value: '2' },
                      { label: 'others', value: '3' },
                    ]}
                    placeholder='Select Category'
                  />
                ) : (
                  <Select
                    // value={categorySelected}
                    // onChange={setCategorySelected}
                    searchable
                    searchValue={categorySelected}
                    onSearchChange={setCategorySelected}
                    data={[
                      { label: 'Add New Vet', value: '0' },
                      { label: 'Dental', value: '1' },
                      { label: 'for fun', value: '2' },
                      { label: 'others', value: '3' },
                    ]}
                    placeholder='Select Category'
                  />
                )}
              </Grid.Col>
            </Grid>

            <Title order={3} size='h3' mt={'xl'}>
              {'Review'}
            </Title>
            {editButton ? (
              <TextInput
                disabled
                key={form.key('description')}
                {...form.getInputProps('description')}
                placeholder='Enter Description'
              />
            ) : (
              <TextInput
                key={form.key('description')}
                {...form.getInputProps('description')}
                placeholder='Enter Description'
              />
            )}

            <Title order={3} size='h3' mt={'md'}>
              {'Next Steps'}
            </Title>
            {editButton ? (
              <TextInput
                disabled
                key={form.key('nextsteps')}
                {...form.getInputProps('nextsteps')}
                placeholder='Enter Next Steps'
              />
            ) : (
              <TextInput
                key={form.key('nextsteps')}
                {...form.getInputProps('nextsteps')}
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
                <Select
                  disabled
                  searchable
                  searchValue={categorySelected}
                  onSearchChange={setCategorySelected}
                  data={[
                    { label: 'Add New Vet', value: '0' },
                    { label: 'Dental', value: '1' },
                    { label: 'for fun', value: '2' },
                    { label: 'others', value: '3' },
                  ]}
                  label='Category(ies?)'
                  placeholder='Select Category'
                />
              ) : (
                <Select
                  searchable
                  searchValue={categorySelected}
                  onSearchChange={setCategorySelected}
                  data={[
                    { label: 'Add New Vet', value: '0' },
                    { label: 'Dental', value: '1' },
                    { label: 'for fun', value: '2' },
                    { label: 'others', value: '3' },
                  ]}
                  label='Category(ies?)'
                  placeholder='Select Category'
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
