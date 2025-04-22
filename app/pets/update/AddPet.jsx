'use client';

import {
  TextInput,
  Text,
  Title,
  Card,
  Group,
  Center,
  FileButton,
  Button,
  Grid,
  Modal,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { createClient } from '../../utils/supabase/client';
import { uploadPetFile } from '../../utils/supabase/storageClient';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';

export const AddPet = (props) => {
  const userID = props.userID;
  const today = new Date();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState();
  const [successModalopened, successModalObj] = useDisclosure(false);
  const [failModalopened, failModalObj] = useDisclosure(false);

  const imageChange = (data) => {
    if (data) {
      setSelectedImage(data);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  const initialValues = {
    name: null,
    weight: null,
    breed: null,
    birthday: null,
    color: null,
  };

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: initialValues,

    validate: {
      name: (value) => (value.length > 0 ? null : 'Name Needed!'),
    },
  });

  const handleExit = () => {
    router.replace('/pets');
  };

  const handleSubmit = async (values) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('pets')
      .upsert({
        name: values.name,
        weight: values.weight,
        breed: values.breed,
        birthday: values.birthday,
        color: values.color,
        last_updated: new Date(),
      })
      .select();

    const imgObj =
      selectedImage && (await uploadPetFile(selectedImage, userID, data[0].id));

    if (!error & !imgObj) {
      successModalObj.open();
      setTimeout(() => {
        successModalObj.close();
      }, 1500);
    } else {
      failModalObj.open();
      setTimeout(() => {
        failModalObj.close();
      }, 1500);
    }
  };

  const imgText = selectedImage ? 'Upload New File' : 'Upload File';

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
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
          Something went wrong!
        </Text>
      </Modal>
      <Grid pb={12}>
        <Grid.Col span={4}></Grid.Col>
        <Grid.Col span={4}>
          <Center>
            <Title>Add Pet</Title>
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
            placeholder="Pet's Name"
          />
          <DateInput
            clearable
            variant={'filled'}
            key={form.key('birthday')}
            {...form.getInputProps('birthday')}
            valueFormat='MMMM D, YYYY'
            placeholder="Pet's Birthday"
          />
        </Group>
        <Group justify='space-between' grow mt='md' mb='xs'>
          <TextInput
            variant={'filled'}
            key={form.key('weight')}
            {...form.getInputProps('weight')}
            placeholder="Pet's Weight"
          />
          <TextInput
            variant={'filled'}
            key={form.key('breed')}
            {...form.getInputProps('breed')}
            placeholder="Pet's Breed"
          />
          <TextInput
            variant={'filled'}
            key={form.key('color')}
            {...form.getInputProps('color')}
            placeholder="Pet's Color(s)"
          />
        </Group>

        <Card.Section py={36} px={24}>
          <Group justify='space-between' grow mt='md' mb='xs'>
            <FileButton onChange={imageChange}>
              {(props) => (
                <Button {...props} bg={'cyan'}>
                  {imgText}
                </Button>
              )}
            </FileButton>
            {/* <button onClick={removeSelectedImage}>Remove This Image</button> */}
          </Group>
          {selectedImage && (
            <Center>
              <img
                src={URL.createObjectURL(selectedImage)}
                alt='Thumb'
                width={'100%'}
                height={'100%'}
              />
            </Center>
          )}
        </Card.Section>
      </Card>
    </form>
  );
};
