'use client';

import { Carousel } from '@mantine/carousel';
import { Button, Paper, Title, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/navigation';

export const Test = (props) => {
  const data = props.data;
  const router = useRouter();

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);
  const slides = data?.map((vet) => (
    <Carousel.Slide key={vet.id}>
      <Paper
        shadow='md'
        p='xl'
        radius='md'
        bg={'green'}
        // style={{ backgroundImage: `url(${vet.image})` }}
      >
        <div>
          {/* <Text size='xs'>{vet.category}</Text> */}
          <Title order={3}>{vet.name}</Title>
        </div>
        <Button
          variant='white'
          color='dark'
          onClick={() => router.replace(`/insurance/update/${vet.id}`)}
        >
          Edit
        </Button>
      </Paper>
    </Carousel.Slide>
  ));

  return (
    <Carousel
      slideSize={{ base: '100%', sm: '50%' }}
      slideGap={{ base: 2, sm: 'xl' }}
      align='center'
      slidesToScroll={1}
      // slidesToScroll={mobile ? 1 : 2}
    >
      <Carousel.Slide key={'createNewVet'}>
        <Paper
          shadow='md'
          p='xl'
          radius='md'
          bg={'green'}
          // style={{ backgroundImage: `url(${vet.image})` }}
        >
          <div>
            {/* <Text size='xs'>{vet.category}</Text> */}
            <Title order={3}>{'Create New Vet'}</Title>
          </div>
          <Button
            variant='white'
            color='dark'
            onClick={() => router.replace('/insurance/update')}
          >
            Create
          </Button>
        </Paper>
      </Carousel.Slide>
      {slides}
    </Carousel>
  );
};
