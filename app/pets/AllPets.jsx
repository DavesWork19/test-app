'use client';

import { IconCircleCheck, IconPlus } from '@tabler/icons-react';
import { Center, Timeline, Text, Paper } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { getPetFile } from '../utils/supabase/storageClient';

export const AllPets = (props) => {
  const router = useRouter();

  const pets = props.pets;
  const files = props.files;

  console.log('test', files);

  const activePets = pets.length - 1;
  const icon = <IconCircleCheck size={12} />;

  const handleOnClick = (id) => {
    router.replace(`/pets/update/${id}`);
  };

  const handleAddPet = () => {
    router.replace('/pets/update');
  };

  return (
    <Center>
      <Timeline active={activePets} bulletSize={24} lineWidth={2}>
        {pets.map((pet) => {
          const options = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
          };
          const birthday = new Date(pet.birthday);
          const updatedBirthday = birthday
            ? birthday.toLocaleDateString('en-US', options)
            : '';

          return (
            <Timeline.Item
              bullet={icon}
              title={pet.name}
              lineVariant={'solid'}
              key={pet.id}
              //   color={'dimmed'}
            >
              <Text c='dimmed' size='xs' mb={8}>
                {`- ${updatedBirthday}`}
              </Text>

              <Paper
                shadow='xs'
                withBorder
                p='md'
                w={250}
                radius='md'
                // bg={color}
                component='button'
                onClick={() => handleOnClick(pet.id)}
              >
                <img
                  src={files.signedUrl}
                  alt='Thumb'
                  width={'100%'}
                  height={'100%'}
                />
                {/* {pet.description && (
                  <div>
                    <Text size='md' fw={600} ta={'start'}>
                      {'Description'}
                    </Text>
                    <List icon='•'>
                      <List.Item   ta={'start'}>
                        <Text lineClamp={1}>{note.description}</Text>
                      </List.Item>
                    </List>
                  </div>
                )} */}
              </Paper>
            </Timeline.Item>
          );
        })}

        <Timeline.Item title='Add Pet' bullet={<IconPlus size={12} />}>
          <Paper
            shadow='xs'
            withBorder
            p='md'
            w={250}
            radius='md'
            component='button'
            onClick={handleAddPet}
          >
            <Text c='dimmed' size='sm'>
              {'Click here to add a new pet!'}
            </Text>
          </Paper>
        </Timeline.Item>
      </Timeline>
    </Center>
  );
};
