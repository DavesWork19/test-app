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
  Modal,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure } from '@mantine/hooks';
import { createClient } from '../../../../utils/supabase/client';
import { useRouter } from 'next/navigation';

export const UpdateInsurance = (props) => {
  const [successModalopened, successModalObj] = useDisclosure(false);
  const [failModalopened, failModalObj] = useDisclosure(false);
  const router = useRouter();
  const insurance = props.insurance;
  const petNames = props.petNames;

  const initialValues = {
    company: insurance.company,
    policy: insurance.policy,
    policy_start: insurance.policy_start
      ? new Date(insurance.policy_start)
      : null,
    policy_end: insurance.policy_end ? new Date(insurance.policy_end) : null,
    pet: insurance.pet,
  };

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: initialValues,

    validate: {
      policy_end: (value, values) =>
        (value >= values.policy_start) | (value === null)
          ? null
          : 'End Date Must Be Later Than Start Date or Empty!',
    },
  });

  const handleExit = () => {
    router.replace('/vetsandinsurance');
  };

  const handleDelete = async () => {
    const supabase = createClient();
    const { error } = await supabase
      .from('insurances')
      .delete()
      .eq('id', insurance.id);

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
    if (JSON.stringify(values) !== JSON.stringify(initialValues)) {
      const supabase = createClient();
      console.log(values, 'v');
      const { error } = await supabase
        .from('insurances')
        .update({
          company: values.company,
          policy: values.policy,
          policy_start:
            values.policy_start && values.policy_start.toISOString(),
          policy_end: values.policy_end && values.policy_end.toISOString(),
          last_updated: new Date(),
          pet: values.pet,
        })
        .eq('id', insurance.id);
      console.log('error', error, values);
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
          Continue editing or exit and return to the Vets & Insurances page
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
          Something went wrong!
        </Text>
      </Modal>
      <Paper shadow='xs' withBorder p='md' radius='md' bg={'#fff0eb'}>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Grid pb={12}>
            <Grid.Col span={4}></Grid.Col>
            <Grid.Col span={4}>
              <Center>
                <Title>Add Insurance Policy</Title>
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
                  Exit
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

          <Card shadow='sm' padding='lg' radius='md' withBorder>
            <Group justify='space-between' grow mt='md' mb='xs'>
              <TextInput
                variant={'filled'}
                key={form.key('company')}
                {...form.getInputProps('company')}
                placeholder='Insurance Company'
              />
            </Group>
            <Group justify='space-between' grow mt='md' mb='xs'>
              <TextInput
                variant={'filled'}
                key={form.key('policy')}
                {...form.getInputProps('policy')}
                placeholder='Insurance Policy Number'
              />
              <Select
                variant={'filled'}
                key={form.key('pet')}
                {...form.getInputProps('pet')}
                data={petNames}
                placeholder='Pet Covered'
              />
            </Group>
            <Group justify='space-between' grow mt='md' mb='xs'>
              <DateInput
                clearable
                variant={'filled'}
                key={form.key('policy_start')}
                {...form.getInputProps('policy_start')}
                valueFormat='MMMM D, YYYY'
                placeholder='Coverage Start Date'
              />
              <DateInput
                clearable
                variant={'filled'}
                key={form.key('policy_end')}
                {...form.getInputProps('policy_end')}
                valueFormat='MMMM D, YYYY'
                placeholder='Coverage End Date'
              />
            </Group>
          </Card>
        </form>
      </Paper>
    </Container>
  );
};
