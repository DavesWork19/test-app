'use client';

import {
  TextInput,
  Textarea,
  Card,
  Group,
  Center,
  FileButton,
  Button,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { createClient } from '../../utils/supabase/client';
import { uploadFile } from '../../utils/supabase/storageClient';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const NoNote = (props) => {
  const userID = props.userID;
  const today = new Date();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState();

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
    title: '',
    date: today,
    description: '',
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

  const handleSubmit = async (values) => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('notes')
      .upsert({
        title: values.title,
        date: values.date,
        description: values.description,
        user_id: userID,
      })
      .select();
    const imgObj = await uploadFile(selectedImage, userID, data[0].id);
    console.log('selecte imagae', selectedImage);
    console.log('img ob', imgObj);

    if (error) {
      console.log('errorereoreoore');
    } else {
      console.log('nooo erore??????');
    }
  };

  const imgText = selectedImage ? 'Upload New File' : 'Upload File';

  return (
    <form onSubmit={form.onSubmit(handleSubmit)} className='mt-8 mb-2'>
      <Card shadow='sm' padding='lg' radius='md' withBorder>
        <Group justify='flex-end'>
          <Button
            variant='outline'
            color='grey'
            bg='white'
            size='compact-xs'
            radius='xl'
            type='submit'
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
        </Group>
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
