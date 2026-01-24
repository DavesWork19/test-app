'use client';
import { useRouter } from 'next/navigation';
import {
  Container,
  Flex,
  Text,
  Grid,
  Divider,
  Stack,
  ActionIcon,
} from '@mantine/core';
import HomeIcon from '../HomeIcon';
import '../Fonts.css';
import { secretCode, sportNumbersGameHeading } from '../constants';

const GamblingHeader = ({ title, subTitle, link }) => {
  const router = useRouter();

  const handleHomeClick = (event) => {
    event.preventDefault();
    if (link === 'back') {
      router.replace(`/${secretCode}`);
      router.refresh();
    } else {
      router.replace('/login');
      router.refresh();
    }
  };

  return (
    <Container pb='xl'>
      <Stack spacing='md'>
        {/* Header with title and home icon */}
        <Grid pb='md' align='center' gutter={0}>
          <Grid.Col span={2}></Grid.Col>
          <Grid.Col span={8}>
            <Text size='lg' weight={800} ta='center'>
              {sportNumbersGameHeading}
            </Text>
          </Grid.Col>
          <Grid.Col span={2}>
            <Flex justify='flex-end'>
              <ActionIcon onClick={handleHomeClick} size='lg' variant='subtle'>
                <HomeIcon color='slategray' />
              </ActionIcon>
            </Flex>
          </Grid.Col>
        </Grid>
        <Divider color='dark' />

        <Stack spacing='xs' align='center' py='sm'>
          {title && <Text>{title}</Text>}
          {subTitle && <Text>{subTitle}</Text>}
        </Stack>
      </Stack>
    </Container>
  );
};

export default GamblingHeader;
