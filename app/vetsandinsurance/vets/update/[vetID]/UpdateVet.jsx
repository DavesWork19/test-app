'use client';

import {
  TextInput,
  NumberInput,
  Text,
  Title,
  Card,
  Group,
  Center,
  Button,
  Grid,
  Container,
  Paper,
  useMantineTheme,
  Menu,
  Modal,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { createClient } from '../../../../utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconSettings,
  IconArrowBack,
  IconDownload,
  IconTrash,
} from '@tabler/icons-react';

export const UpdateVet = (props) => {
  const vet = props.vet;
  const router = useRouter();
  const [successModalopened, successModalObj] = useDisclosure(false);
  const [failModalopened, failModalObj] = useDisclosure(false);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

  const initialValues = {
    name: vet.name,
    phone_number: vet.phone_number,
    email: vet.email,
    location: vet.location,
  };

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: initialValues,

    validate: {
      name: (value) => !value && "Vet's Name Needed!",
      email: (value) =>
        value && (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
    },
  });

  const handleExit = () => {
    router.replace('/vetsandinsurance');
  };

  const handleDelete = async () => {
    const supabase = createClient();
    const { error } = await supabase.from('vets').delete().eq('id', vet.id);
    if (error) {
      failModalObj.open();
      setTimeout(() => {
        failModalObj.close();
      }, 1500);
    } else {
      router.replace('/vetsandinsurance');
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
      !formValidation.hasErrors
    ) {
      const supabase = createClient();
      const { error } = await supabase
        .from('vets')
        .update({
          name: values.name,
          phone_number: values.phone_number,
          email: values.email,
          location: values.location,
          last_updated: new Date(),
        })
        .eq('id', vet.id);

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
          Continue Editing Or Head Back To The Vet's Section
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
          Something went wrong!
        </Text>
      </Modal>
      <Paper shadow='xs' withBorder p='md' radius='md' bg={'#fff0eb'}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          {!isMobile && (
            <Grid pb={12}>
              <Grid.Col span={4}></Grid.Col>
              <Grid.Col span={4}>
                <Center>
                  <Title>Update Vet</Title>
                </Center>
              </Grid.Col>
              <Grid.Col span={4} mt={4}>
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
                    radius='xl'
                    me={6}
                    onClick={handleExit}
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
          )}
          {isMobile && (
            <Group justify={'space-between'} pb={12} me={'xl'}>
              <Text ms={'lg'}></Text>
              <Title size={'h1'} ms={'xl'}>
                Update Vet
              </Title>
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
                    leftSection={<IconTrash color='red' stroke={2} size={16} />}
                    onClick={handleDelete}
                  >
                    <Text size={'md'} fw={500} c='red'>
                      Delete
                    </Text>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          )}
          <Card shadow='sm' padding='lg' radius='md' withBorder>
            <Group justify='space-between' grow mt='md' mb='xs'>
              <TextInput
                withAsterisk
                variant={'filled'}
                key={form.key('name')}
                {...form.getInputProps('name')}
                label="Vet's Name"
                placeholder="Enter Vet's Name"
              />
            </Group>
            <Group justify='space-between' grow mt='md' mb='xs'>
              <TextInput
                variant={'filled'}
                key={form.key('location')}
                {...form.getInputProps('location')}
                label="Vet's Location"
                placeholder="Enter Vet's Location"
              />
            </Group>
            <Group justify='space-between' grow mt='md' mb='xs'>
              <TextInput
                variant={'filled'}
                key={form.key('email')}
                {...form.getInputProps('email')}
                label="Vet's Email Address"
                placeholder="Enter Vet's Email Address"
              />
            </Group>
            <Group justify='space-between' grow mt='md' mb='xs'>
              <NumberInput
                variant={'filled'}
                key={form.key('phone_number')}
                {...form.getInputProps('phone_number')}
                label="Vet's Phone Number"
                placeholder="Enter  Vet's Phone Number"
              />
            </Group>
          </Card>
        </form>
      </Paper>
    </Container>
  );
};
