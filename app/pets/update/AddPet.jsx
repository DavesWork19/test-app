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
  useMantineTheme,
  Menu,
  Container,
  Paper,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { createClient } from '../../utils/supabase/client';
import { uploadPetFile } from '../../utils/supabase/storageClient';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import { useMediaQuery } from '@mantine/hooks';
import { IconSettings, IconArrowBack, IconDownload } from '@tabler/icons-react';

export const AddPet = (props) => {
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
      name: (value) => !value && 'Name Needed!',
      birthday: (value) => !value && 'Birthday Needed!',
    },
  });

  const handleExit = () => {
    router.replace('/pets');
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
        selectedImage &&
        (await uploadPetFile(selectedImage, userID, data[0].id));

      if (!error & !imgObj) {
        successModalObj.open();
        setTimeout(() => {
          successModalObj.close();
          router.replace('/pets');
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
          This Pet Is Now Available In The Pets's page
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

      <form onSubmit={form.onSubmit(handleSubmit)}>
        {!isMobile && (
          <Paper shadow='xs' withBorder p='md' radius='md' bg={'#fff0eb'}>
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
                    Back
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
                  withAsterisk
                  label={"Pet's Name"}
                  placeholder={"Enter Pet's Name"}
                />
                <DateInput
                  clearable
                  variant={'filled'}
                  key={form.key('birthday')}
                  {...form.getInputProps('birthday')}
                  withAsterisk
                  valueFormat='MMMM D, YYYY'
                  label={"Pet's Birthday"}
                  placeholder={"Enter Pet's Birthday"}
                />
              </Group>
              <Group justify='space-between' grow mt='md' mb='xs'>
                <TextInput
                  variant={'filled'}
                  key={form.key('color')}
                  {...form.getInputProps('color')}
                  label={"Pet's Color(s)"}
                  placeholder={"Enter Pet's Color(s)"}
                />
              </Group>
              <Group justify='space-between' grow mt='md' mb='xs'>
                <TextInput
                  variant={'filled'}
                  key={form.key('weight')}
                  {...form.getInputProps('weight')}
                  label={"Pet's Weight"}
                  placeholder={"Enter Pet's Weight"}
                />
                <TextInput
                  variant={'filled'}
                  key={form.key('breed')}
                  {...form.getInputProps('breed')}
                  label={"Pet's Breed"}
                  placeholder={"Enter Pet's Breed"}
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
          </Paper>
        )}
        {isMobile && (
          <Paper shadow='xs' withBorder p='md' radius='md' bg={'#fff0eb'}>
            <Group justify={'space-between'} pb={12} me={'xl'}>
              <Text ms={'lg'}></Text>
              <Title size={'h1'} ms={'xl'}>
                Add Pet
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
            <Card shadow='sm' padding='lg' radius='md' withBorder>
              <Group justify='space-between' grow mt='md' mb='xs'>
                <TextInput
                  variant={'filled'}
                  key={form.key('name')}
                  {...form.getInputProps('name')}
                  withAsterisk
                  label={"Pet's Name"}
                  placeholder={"Enter Pet's Name"}
                />
              </Group>
              <Group justify='space-between' grow mt='md' mb='xs'>
                <DateInput
                  clearable
                  variant={'filled'}
                  key={form.key('birthday')}
                  {...form.getInputProps('birthday')}
                  withAsterisk
                  valueFormat='MMMM D, YYYY'
                  label={"Pet's Birthday"}
                  placeholder={"Enter Pet's Birthday"}
                />
              </Group>
              <Group justify='space-between' grow mt='md' mb='xs'>
                <TextInput
                  variant={'filled'}
                  key={form.key('color')}
                  {...form.getInputProps('color')}
                  label={"Pet's Color(s)"}
                  placeholder={"Enter Pet's Color(s)"}
                />
              </Group>
              <Group justify='space-between' grow mt='md' mb='xs'>
                <TextInput
                  variant={'filled'}
                  key={form.key('weight')}
                  {...form.getInputProps('weight')}
                  label={"Pet's Weight"}
                  placeholder={"Enter Pet's Weight"}
                />
              </Group>
              <Group justify='space-between' grow mt='md' mb='xs'>
                <TextInput
                  variant={'filled'}
                  key={form.key('breed')}
                  {...form.getInputProps('breed')}
                  label={"Pet's Breed"}
                  placeholder={"Enter Pet's Breed"}
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
          </Paper>
        )}
      </form>
    </Container>
  );
};
