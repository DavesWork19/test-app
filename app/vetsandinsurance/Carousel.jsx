'use client';

import { Carousel } from '@mantine/carousel';
import {
  Button,
  Group,
  Paper,
  Title,
  Center,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useRouter } from 'next/navigation';

export const CarouselData = (props) => {
  const allData = props.data;
  const type = props.type;
  const router = useRouter();

  const theme = useMantineTheme();
  const mobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm})`);

  const carouselKey = type === 'vet' ? 'addNewVet' : 'addNewInsurance';
  const carouselUpdateRoute =
    type === 'vet'
      ? '/vetsandinsurance/vets/update'
      : '/vetsandinsurance/insurances/update';
  const carouselTitle = type === 'vet' ? 'Add New Vet' : 'Add New Insurance';
  const carouselMarginTop = type === 'vet' ? null : 'md';

  return (
    <Carousel
      slideSize={{ base: '100%', sm: '50%' }}
      slideGap={{ base: 2, sm: 'xl' }}
      align='center'
      slidesToScroll={1}
      // slidesToScroll={mobile ? 1 : 2}
      mt={carouselMarginTop}
    >
      <Carousel.Slide key={carouselKey}>
        <Paper shadow='md' p='xl' radius='md'>
          <Center>
            <Button
              bg={'lightgrey'}
              onClick={() => router.replace(carouselUpdateRoute)}
            >
              <Title order={3} c='dark'>
                {carouselTitle}
              </Title>
            </Button>
          </Center>
        </Paper>
      </Carousel.Slide>
      {allData?.map((data) => (
        <Carousel.Slide key={data.id}>
          <Paper shadow='md' p='xl' radius='md'>
            <Group justify={'space-between'}>
              <Title order={2}>
                {type === 'vet' ? data.name : data.company}
              </Title>
              <Button
                bg={'lightgrey'}
                c='dark'
                onClick={() =>
                  router.replace(`${carouselUpdateRoute}/${data.id}`)
                }
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
