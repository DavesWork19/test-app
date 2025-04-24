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
import { createClient } from '../../../utils/supabase/client';
import { replacePetFile } from '../../../utils/supabase/storageClient';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDisclosure } from '@mantine/hooks';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconSettings,
  IconArrowBack,
  IconDownload,
  IconTrash,
} from '@tabler/icons-react';

export const UpdatePet = (props) => {
  const pet = props.pet;
  const router = useRouter();
  const [selectedImage, setSelectedImage] = useState({
    img_name: pet.img_name,
    url: pet.image?.signedUrl,
  });
  const [successModalopened, successModalObj] = useDisclosure(false);
  const [failModalopened, failModalObj] = useDisclosure(false);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.xs})`);

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
    name: pet.name,
    weight: pet.weight,
    breed: pet.breed,
    birthday: new Date(pet.birthday),
    color: pet.color,
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

  const handleDelete = async () => {
    const supabase = createClient();
    const { error } = await supabase.from('pets').delete().eq('id', pet.id);
    if (!error) {
      router.replace('/pets');
    }
  };

  const handleSubmit = async (values) => {
    if (values === 'mobile') {
      values = form.getValues();
    }
    if (JSON.stringify(values) !== JSON.stringify(initialValues)) {
      const supabase = createClient();

      const { error } = await supabase
        .from('pets')
        .update({
          name: values.name,
          weight: values.weight,
          breed: values.breed,
          birthday: values.birthday,
          color: values.color,
          last_updated: new Date(),
        })
        .eq('id', pet.id);

      const imgObj =
        selectedImage &&
        (await replacePetFile(
          selectedImage,
          pet.user_id,
          pet.id,
          pet.img_name
        ));

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
          Continue editing or exit and return to the Pet's page
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
                  <Title>Update Pet</Title>
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
            <Card shadow='sm' padding='lg' radius='md' withBorder>
              <Group justify='space-between' grow mt='md' mb='xs'>
                <TextInput
                  variant={'filled'}
                  key={form.key('name')}
                  {...form.getInputProps('name')}
                  label={"Pet's Name"}
                  placeholder={"Enter Pet's Name"}
                />
                <DateInput
                  clearable
                  variant={'filled'}
                  key={form.key('birthday')}
                  {...form.getInputProps('birthday')}
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
                        {'Upload New File'}
                      </Button>
                    )}
                  </FileButton>
                </Group>
                {selectedImage?.url && (
                  <Center>
                    <img
                      src={selectedImage?.url}
                      alt='Thumb'
                      width={'75%'}
                      height={'75%'}
                      style={{ borderRadius: '5%' }}
                    />
                  </Center>
                )}
              </Card.Section>
            </Card>
          </Paper>
        )}
        {isMobile && (
          <Paper shadow='xs' withBorder p='md' radius='md' bg={'#fff0eb'}>
            <Group justify={'space-between'} pb={12} me={'md'}>
              <Text ms={'md'}></Text>
              <Title size={'h1'}>Update Pet</Title>
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
            <Card shadow='sm' padding='lg' radius='md' withBorder>
              <Group justify='space-between' grow mt='md' mb='xs'>
                <TextInput
                  variant={'filled'}
                  key={form.key('name')}
                  {...form.getInputProps('name')}
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
                        {'Upload New File'}
                      </Button>
                    )}
                  </FileButton>
                </Group>
                {selectedImage?.url && (
                  <Center>
                    <img
                      src={selectedImage?.url}
                      alt='Thumb'
                      width={'75%'}
                      height={'75%'}
                      style={{ borderRadius: '5%' }}
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
