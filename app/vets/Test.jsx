'use client';

import { Carousel } from '@mantine/carousel';
import { Button, Group, Paper, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/navigation';

export const Test = (props) => {
  const data = props.data;
  const router = useRouter();

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  return (
    <Carousel
      slideSize={{ base: '100%', sm: '50%' }}
      slideGap={{ base: 2, sm: 'xl' }}
      align='center'
      slidesToScroll={1}
      // slidesToScroll={mobile ? 1 : 2}
    >
      <Carousel.Slide key={'addNewVet'}>
        <Paper shadow='md' p='xl' radius='md' bg={'#fff0eb'}>
          <Button
            variant='white'
            color='dark'
            onClick={() => router.replace('/vets/update')}
          >
            <Title order={3}>{'Add New Vet'}</Title>
          </Button>
        </Paper>
      </Carousel.Slide>
      {data?.map((vet) => (
        <Carousel.Slide key={vet.id}>
          <Paper shadow='md' p='xl' radius='md' bg={'#fff0eb'}>
            <Group>
              <Title order={2}>{vet.name}</Title>
              <Button
                variant='white'
                color='dark'
                onClick={() => router.replace(`/vets/update/${vet.id}`)}
              >
                Edit
              </Button>
            </Group>
          </Paper>
        </Carousel.Slide>
      ))}
    </Carousel>
  );
};
