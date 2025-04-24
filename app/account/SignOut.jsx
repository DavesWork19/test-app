'use client';

import {
  TextInput,
  Title,
  Text,
  Card,
  Group,
  Button,
  Container,
  Paper,
  Grid,
  Center,
  Select,
  NumberInput,
  Modal,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { createClient } from '../utils/supabase/client';
import { useRouter } from 'next/navigation';
import { useMediaQuery } from '@mantine/hooks';
import { IconDownload } from '@tabler/icons-react';

export const SignOut = (props) => {
  const [successModalopened, successModalObj] = useDisclosure(false);
  const [failModalopened, failModalObj] = useDisclosure(false);
  const supabase = createClient();
  const router = useRouter();
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);
  const userInfo = props.userInfo;
  const email = props.email;

  const initialValues = {
    first_name: userInfo.first_name,
    last_name: userInfo.last_name,
    address: userInfo.address,
    apartment: userInfo.apartment,
    city: userInfo.city,
    state: userInfo.state,
    zipcode: userInfo.zipcode,
    phone_number: userInfo.phone_number,
  };

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: initialValues,

    validate: {
      first_name: (value) => (value === null ? 'First Name Needed!' : null),
    },
  });

  const handleSubmit = async (values) => {
    if (JSON.stringify(values) !== JSON.stringify(initialValues)) {
      const supabase = createClient();

      const { error } = await supabase
        .from('user_info')
        .update({
          first_name: values.first_name,
          last_name: values.last_name,
          address: values.address,
          apartment: values.apartment,
          city: values.city,
          state: values.state,
          zipcode: values.zipcode,
          phone_number: values.phone_number,
        })
        .eq('user_id', userInfo.user_id);

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

  const handleOnClick = async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace('/login');
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
          Something Went Wrong! Try Again Soon!
        </Text>
      </Modal>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        {!isMobile && (
          <Paper shadow='xs' withBorder p='md' radius='md' bg={'#fff0eb'}>
            <Grid pb={12}>
              <Grid.Col span={4}></Grid.Col>
              <Grid.Col span={4}>
                <Center>
                  <Title>Account Info</Title>
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
                </Center>
              </Grid.Col>
            </Grid>
            <Card shadow='sm' padding='lg' radius='md' withBorder>
              <Group justify='space-between' grow mt='md' mb={'xs'}>
                <TextInput
                  variant={'filled'}
                  key={form.key('first_name')}
                  {...form.getInputProps('first_name')}
                  placeholder='First Name'
                />
                <TextInput
                  variant={'filled'}
                  key={form.key('last_name')}
                  {...form.getInputProps('last_name')}
                  placeholder='Last Name'
                />
                <NumberInput
                  variant={'filled'}
                  key={form.key('phone_number')}
                  {...form.getInputProps('phone_number')}
                  placeholder='Phone Number'
                />
                <TextInput disabled variant={'filled'} value={email} />
              </Group>
              <Group justify='space-between' grow mt='md' mb='xs'>
                <TextInput
                  variant={'filled'}
                  key={form.key('address')}
                  {...form.getInputProps('address')}
                  placeholder='Address'
                />
                <TextInput
                  variant={'filled'}
                  key={form.key('apartment')}
                  {...form.getInputProps('apartment')}
                  placeholder='Unit Number'
                />
              </Group>
              <Group justify='space-between' grow mt='md' mb='xs'>
                <TextInput
                  variant={'filled'}
                  key={form.key('city')}
                  {...form.getInputProps('city')}
                  placeholder='City'
                />
                <Select
                  variant={'filled'}
                  key={form.key('state')}
                  {...form.getInputProps('state')}
                  data={[
                    { label: 'Alabama', value: '0' },
                    { label: 'Alaska', value: '1' },
                    { label: 'Arizona', value: '2' },
                    { label: 'Arkansas', value: '3' },
                    { label: 'California', value: '4' },
                    { label: 'Colorado', value: '5' },
                    { label: 'Connecticut', value: '6' },
                    { label: 'Delaware', value: '7' },
                    { label: 'District of Columbia', value: '8' },
                    { label: 'Florida', value: '9' },
                    { label: 'Georgia', value: '10' },
                    { label: 'Hawaii', value: '11' },
                    { label: 'Idaho', value: '12' },
                    { label: 'Illinois', value: '13' },
                    { label: 'Indiana', value: '14' },
                    { label: 'Iowa', value: '15' },
                    { label: 'Kansas', value: '16' },
                    { label: 'Kentucky', value: '17' },
                    { label: 'Louisiana', value: '18' },
                    { label: 'Maine', value: '19' },
                    { label: 'Maryland', value: '20' },
                    { label: 'Massachusetts', value: '21' },
                    { label: 'Michigan', value: '22' },
                    { label: 'Minnesota', value: '23' },
                    { label: 'Mississippi', value: '24' },
                    { label: 'Missouri', value: '25' },
                    { label: 'Montana', value: '26' },
                    { label: 'Nebraska', value: '27' },
                    { label: 'Nevada', value: '28' },
                    { label: 'New Hampshire', value: '29' },
                    { label: 'New Jersey', value: '30' },
                    { label: 'New Mexico', value: '31' },
                    { label: 'New York', value: '32' },
                    { label: 'North Carolina', value: '33' },
                    { label: 'North Dakota', value: '34' },
                    { label: 'Ohio', value: '35' },
                    { label: 'Oklahoma', value: '36' },
                    { label: 'Oregon', value: '37' },
                    { label: 'Pennsylvania', value: '38' },
                    { label: 'Rhode Island', value: '39' },
                    { label: 'South Carolina', value: '40' },
                    { label: 'South Dakota', value: '41' },
                    { label: 'Tennessee', value: '42' },
                    { label: 'Texas', value: '43' },
                    { label: 'Utah', value: '44' },
                    { label: 'Vermont', value: '45' },
                    { label: 'Virginia', value: '46' },
                    { label: 'Washington', value: '47' },
                    { label: 'West Virginia', value: '48' },
                    { label: 'Wisconsin', value: '49' },
                    { label: 'Wyoming', value: '50' },
                  ]}
                  placeholder='State'
                />
                <NumberInput
                  variant={'filled'}
                  key={form.key('zipcode')}
                  {...form.getInputProps('zipcode')}
                  placeholder='ZipCode'
                />
              </Group>
            </Card>
            <Center>
              <Button
                w={500}
                radius={'md'}
                mt={'xl'}
                color={'red'}
                onClick={handleOnClick}
              >
                Sign Out
              </Button>
            </Center>
          </Paper>
        )}
        {isMobile && (
          <Paper shadow='xs' withBorder p='md' radius='md' bg={'#fff0eb'}>
            <Group justify={'space-between'} pb={12}>
              <Text ms={'xl'}></Text>
              <Title size={'h1'} ms={'xl'}>
                Account
              </Title>
              <Button
                radius={'md'}
                variant={'light'}
                c={'dark'}
                type='submit'
                leftSection={<IconDownload stroke={2} size={16} />}
              >
                <Text size={'md'} fw={500}>
                  Save
                </Text>
              </Button>
            </Group>

            <Card shadow='sm' padding='lg' radius='md' withBorder>
              <Group justify='space-between' grow mt='md' mb={'xs'}>
                <TextInput
                  variant={'filled'}
                  key={form.key('first_name')}
                  {...form.getInputProps('first_name')}
                  label='First Name'
                  placeholder='Enter First Name'
                />
                <TextInput
                  variant={'filled'}
                  key={form.key('last_name')}
                  {...form.getInputProps('last_name')}
                  label='Last Name'
                  placeholder='Enter Last Name'
                />
              </Group>
              <Group justify='space-between' grow mt='md' mb='xs'>
                <NumberInput
                  variant={'filled'}
                  key={form.key('phone_number')}
                  {...form.getInputProps('phone_number')}
                  label='Phone Number'
                  placeholder='Enter Phone Number'
                />
              </Group>
              <Group justify='space-between' grow mt='md' mb='xs'>
                <TextInput
                  disabled
                  variant={'filled'}
                  value={email}
                  label={'Email'}
                />
              </Group>
              <Group justify='space-between' grow mt='md' mb='xs'>
                <TextInput
                  variant={'filled'}
                  key={form.key('address')}
                  {...form.getInputProps('address')}
                  label='Address'
                  placeholder='Enter Address'
                />
              </Group>
              <Group justify='space-between' grow mt='md' mb='xs'>
                <TextInput
                  variant={'filled'}
                  key={form.key('apartment')}
                  {...form.getInputProps('apartment')}
                  label='Unit Number'
                  placeholder='Enter Unit Number'
                />
                <TextInput
                  variant={'filled'}
                  key={form.key('city')}
                  {...form.getInputProps('city')}
                  label='City'
                  placeholder='Enter City'
                />
              </Group>
              <Group justify='space-between' grow mt='md' mb='xs'>
                <Select
                  variant={'filled'}
                  key={form.key('state')}
                  {...form.getInputProps('state')}
                  data={[
                    { label: 'Alabama', value: '0' },
                    { label: 'Alaska', value: '1' },
                    { label: 'Arizona', value: '2' },
                    { label: 'Arkansas', value: '3' },
                    { label: 'California', value: '4' },
                    { label: 'Colorado', value: '5' },
                    { label: 'Connecticut', value: '6' },
                    { label: 'Delaware', value: '7' },
                    { label: 'District of Columbia', value: '8' },
                    { label: 'Florida', value: '9' },
                    { label: 'Georgia', value: '10' },
                    { label: 'Hawaii', value: '11' },
                    { label: 'Idaho', value: '12' },
                    { label: 'Illinois', value: '13' },
                    { label: 'Indiana', value: '14' },
                    { label: 'Iowa', value: '15' },
                    { label: 'Kansas', value: '16' },
                    { label: 'Kentucky', value: '17' },
                    { label: 'Louisiana', value: '18' },
                    { label: 'Maine', value: '19' },
                    { label: 'Maryland', value: '20' },
                    { label: 'Massachusetts', value: '21' },
                    { label: 'Michigan', value: '22' },
                    { label: 'Minnesota', value: '23' },
                    { label: 'Mississippi', value: '24' },
                    { label: 'Missouri', value: '25' },
                    { label: 'Montana', value: '26' },
                    { label: 'Nebraska', value: '27' },
                    { label: 'Nevada', value: '28' },
                    { label: 'New Hampshire', value: '29' },
                    { label: 'New Jersey', value: '30' },
                    { label: 'New Mexico', value: '31' },
                    { label: 'New York', value: '32' },
                    { label: 'North Carolina', value: '33' },
                    { label: 'North Dakota', value: '34' },
                    { label: 'Ohio', value: '35' },
                    { label: 'Oklahoma', value: '36' },
                    { label: 'Oregon', value: '37' },
                    { label: 'Pennsylvania', value: '38' },
                    { label: 'Rhode Island', value: '39' },
                    { label: 'South Carolina', value: '40' },
                    { label: 'South Dakota', value: '41' },
                    { label: 'Tennessee', value: '42' },
                    { label: 'Texas', value: '43' },
                    { label: 'Utah', value: '44' },
                    { label: 'Vermont', value: '45' },
                    { label: 'Virginia', value: '46' },
                    { label: 'Washington', value: '47' },
                    { label: 'West Virginia', value: '48' },
                    { label: 'Wisconsin', value: '49' },
                    { label: 'Wyoming', value: '50' },
                  ]}
                  label='State'
                  placeholder='State'
                />
                <NumberInput
                  variant={'filled'}
                  key={form.key('zipcode')}
                  {...form.getInputProps('zipcode')}
                  label='Zip Code'
                  placeholder='Enter Zip Code'
                />
              </Group>
            </Card>
            <Center>
              <Button
                w={500}
                radius={'md'}
                mt={'xl'}
                color={'red'}
                onClick={handleOnClick}
              >
                Sign Out
              </Button>
            </Center>
          </Paper>
        )}
      </form>
    </Container>
  );
};
