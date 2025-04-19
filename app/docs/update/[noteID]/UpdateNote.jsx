'use client';

import {
  TextInput,
  Textarea,
  Title,
  Card,
  Modal,
  Text,
  Group,
  Center,
  FileButton,
  Button,
  Grid,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { createClient } from '../../../utils/supabase/client';
import { replaceDocFile } from '../../../utils/supabase/storageClient';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';

export const UpdateNote = (props) => {
  const note = props.note;
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState({
    img_name: note.img_name,
    url: note.image.signedUrl,
  });
  const [successModalopened, successModalObj] = useDisclosure(false);
  const [failModalopened, failModalObj] = useDisclosure(false);

  const imageChange = (data) => {
    if (data) {
      data.url = URL.createObjectURL(data);
      setSelectedImage(data);
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  // const removeSelectedImage = () => {
  //   setSelectedImage();
  // };

  const initialValues = {
    title: note.title,
    date: new Date(note.date),
    description: note.description,
  };

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: initialValues,

    validate: {
      title: (value) => (value.length > 0 ? null : 'Title Needed!'),
      date: (value) => (value.toString().length > 0 ? null : 'Date Needed!'),
    },
  });

  const handleExit = () => {
    router.replace('/docs');
  };

  const handleDelete = async () => {
    const supabase = createClient();
    const { error } = await supabase.from('notes').delete().eq('id', note.id);
    if (!error) {
      router.replace('/docs');
    }
  };

  const handleSubmit = async (values) => {
    const supabase = createClient();
    const { error } = await supabase
      .from('notes')
      .update({
        title: values.title,
        date: values.date,
        description: values.description,
      })
      .eq('id', note.id);

    const imgObj = await replaceDocFile(
      selectedImage,
      note.user_id,
      note.id,
      note.img_name
    );

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
            <Title>Update Note</Title>
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
            key={form.key('title')}
            {...form.getInputProps('title')}
            placeholder='Title'
          />
          <DateInput
            clearable
            variant={'filled'}
            placeholder='Date'
            key={form.key('date')}
            {...form.getInputProps('date')}
            valueFormat='ddd MMM DD'
          />
        </Group>
        <Textarea
          variant={'filled'}
          placeholder={'What Happened???'}
          autosize
          minRows={7}
          cols={24}
          key={form.key('description')}
          {...form.getInputProps('description')}
        />
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
            <Center pt={12}>
              <img
                src={selectedImage.url}
                alt='Thumb'
                width={'75%'}
                height={'75%'}
                style={{ 'border-radius': '5%' }}
              />
            </Center>
          )}
        </Card.Section>
      </Card>
    </form>
  );
};
