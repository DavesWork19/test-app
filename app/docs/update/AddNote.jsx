'use client';

import {
  TextInput,
  Textarea,
  Title,
  Card,
  Group,
  Center,
  FileButton,
  Button,
  Modal,
  Grid,
  Text,
  Menu,
  useMantineTheme,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { createClient } from '../../utils/supabase/client';
import { uploadDocFile } from '../../utils/supabase/storageClient';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import { useMediaQuery } from '@mantine/hooks';
import { IconSettings, IconArrowBack, IconDownload } from '@tabler/icons-react';

export const AddNote = (props) => {
  const userID = props.userID;
  const today = new Date();
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState();
  const [successModalopened, successModalObj] = useDisclosure(false);
  const [failModalopened, failModalObj] = useDisclosure(false);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

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
    title: null,
    date: today,
    description: null,
  };

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: initialValues,

    validate: {
      title: (value) => !value && 'Title Needed!',
      date: (value) => !value && 'Date Needed!',
    },
  });

  const handleExit = () => {
    router.replace('/docs');
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
      const { data, error } = await supabase
        .from('notes')
        .upsert({
          title: values.title,
          date: values.date,
          description: values.description,
        })
        .select();

      const imgObj =
        selectedImage &&
        (await uploadDocFile(selectedImage, userID, data[0].id));

      if (!error & !imgObj) {
        successModalObj.open();
        setTimeout(() => {
          successModalObj.close();
          router.replace('/docs');
        }, 2000);
      } else {
        failModalObj.open();
        setTimeout(() => {
          failModalObj.close();
        }, 1500);
      }
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
          This Doc Is Now Available In The Doc's page
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
      {!isMobile && (
        <Grid pb={12}>
          <Grid.Col span={4}></Grid.Col>
          <Grid.Col span={4}>
            <Center>
              <Title>Add Doc</Title>
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
                Back
              </Button>
            </Center>
          </Grid.Col>
        </Grid>
      )}
      {isMobile && (
        <Group justify={'space-between'} pb={12} me={'xl'}>
          <Text ms={'lg'}></Text>
          <Title size={'h1'} ms={'xl'}>
            Add Doc
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
        </Group>
      )}
      <Card shadow='sm' padding='lg' radius='md' withBorder>
        <Group justify='space-between' grow mt='md' mb='xs'>
          <TextInput
            variant={'filled'}
            key={form.key('title')}
            {...form.getInputProps('title')}
            withAsterisk
            label='Document Title'
            placeholder='Enter Document Title'
          />
          <DateInput
            clearable
            variant={'filled'}
            key={form.key('date')}
            {...form.getInputProps('date')}
            withAsterisk
            label='Document Date'
            placeholder='Enter Document Date'
            valueFormat={'dddd, MMMM D'}
          />
        </Group>
        <Textarea
          variant={'filled'}
          label='Document Description'
          placeholder={'Enter Document Description'}
          autosize
          minRows={7}
          cols={24}
          key={form.key('description')}
          {...form.getInputProps('description')}
        />
        <Card.Section py={24} px={24}>
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
                alt='Document...'
                width={'75%'}
                height={'75%'}
                style={{ borderRadius: '5%' }}
              />
            </Center>
          )}
        </Card.Section>
      </Card>
    </form>
  );
};
