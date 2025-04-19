'use client';

import { IconPlus } from '@tabler/icons-react';
import { Avatar, Center, Group, Text, Paper, Title } from '@mantine/core';
import { useRouter } from 'next/navigation';

export const AllPets = (props) => {
  const router = useRouter();

  const pets = props.pets;

  const handleOnClick = (id) => {
    router.replace(`/pets/update/${id}`);
  };

  const handleAddPet = () => {
    router.replace('/pets/update');
  };

  return (
    <div>
      {/* <Center>
        <Title pb={'md'}>All Pets</Title>
      </Center> */}
      {pets.map((pet) => {
        const birthday = new Date(pet.birthday);
        const diffInMilliseconds = new Date() - birthday;
        const diffInSeconds = diffInMilliseconds / 1000;
        const diffInMinutes = diffInSeconds / 60;
        const diffInHours = Math.floor(diffInMinutes / 60);
        const diffInDays = Math.floor(diffInHours / 24);
        const diffInYears = Math.floor(diffInDays / 365);

        const updatedBirthday = diffInYears
          ? `${diffInYears} Years and ${Math.floor(
              diffInDays - diffInYears * 365
            )} Days Old!`
          : `${diffInDays} Days Old!`;

        return (
          <Center key={pet.id} pb={12}>
            <Paper
              shadow='xs'
              withBorder
              p='md'
              w={300}
              radius='md'
              // bg={color}
              component='button'
              onClick={() => handleOnClick(pet.id)}
            >
              <Group align={'flex-start'}>
                {pet.image ? (
                  <Avatar size={'lg'} src={pet.image.signedUrl} />
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width={65}
                    height={65}
                    viewBox='2 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth={1}
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    className='icon icon-tabler icons-tabler-outline icon-tabler-user-circle'
                  >
                    <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                    <path d='M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0' />
                    <path d='M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0' />
                    <path d='M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855' />
                  </svg>
                )}
                <div>
                  {pet.name && (
                    <Text size='md' fw={600} ta={'start'} mb={6}>
                      {pet.name}
                    </Text>
                  )}
                  {pet.birthday && (
                    <Text c='dimmed' size='xs'>
                      {`${updatedBirthday}`}
                    </Text>
                  )}
                </div>
              </Group>
            </Paper>
          </Center>
        );
      })}

      <Center>
        <Paper
          shadow='xs'
          withBorder
          p='md'
          w={300}
          radius='md'
          component='button'
          onClick={handleAddPet}
        >
          <Group>
            <IconPlus size={12} />
            <Text c='dimmed' size='sm'>
              {'Click here to add a new pet!'}
            </Text>
          </Group>
        </Paper>
      </Center>
    </div>
  );
};
