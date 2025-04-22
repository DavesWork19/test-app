'use client';

import { Container, Paper, Center, Divider, Group, Text } from '@mantine/core';
import {
  IconUserCircle,
  IconCalendarClock,
  IconNotes,
  IconAmbulance,
  IconPaw,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export const HomePageInfo = () => {
  const router = useRouter();

  const handleOnClick = (route) => {
    router.replace(`/${route}`);
  };

  return (
    <Container>
      <Center>
        <Paper
          shadow='xs'
          withBorder
          p='md'
          mb={'md'}
          w={300}
          radius='md'
          component='button'
          onClick={() => handleOnClick('appointments')}
        >
          <Group>
            <IconCalendarClock stroke={1} />
            <div>
              <Text size='sm' ta={'start'}>
                {'Appointment Page'}
              </Text>
              <Text c={'dimmed'} size='sm' ms={'xs'} ta={'start'}>
                {'Where your appointments live.'}
              </Text>
            </div>
          </Group>
        </Paper>
      </Center>
      <Center>
        <Paper
          shadow='xs'
          withBorder
          p='md'
          mb={'md'}
          w={300}
          radius='md'
          component='button'
          onClick={() => handleOnClick('docs')}
        >
          <Group>
            <IconNotes stroke={1} />
            <div>
              <Text size='sm' ta={'start'}>
                {'Document Page'}
              </Text>
              <Text c={'dimmed'} size='sm' ms={'xs'} ta={'start'}>
                {'Where your documents live.'}
              </Text>
            </div>
          </Group>
        </Paper>
      </Center>
      <Center>
        <Paper
          shadow='xs'
          withBorder
          p='md'
          mb={'md'}
          w={300}
          radius='md'
          component='button'
          onClick={() => handleOnClick('vetsandinsurance')}
        >
          <Group>
            <IconAmbulance stroke={1} />
            <div>
              <Text size='sm' ta={'start'}>
                {'Vet Page'}
              </Text>
              <Text c={'dimmed'} size='sm' ms={'xs'} ta={'start'}>
                {'Where your vet data lives.'}
              </Text>
            </div>
          </Group>
        </Paper>
      </Center>
      <Center>
        <Paper
          shadow='xs'
          withBorder
          p='md'
          mb={'md'}
          w={300}
          radius='md'
          component='button'
          onClick={() => handleOnClick('pets')}
        >
          <Group>
            <IconPaw stroke={1} />
            <div>
              <Text size='sm' ta={'start'}>
                {'Pet Page'}
              </Text>
              <Text c={'dimmed'} size='sm' ms={'xs'} ta={'start'}>
                {'Where your pet data lives.'}
              </Text>
            </div>
          </Group>
        </Paper>
      </Center>
      <Center>
        <Paper
          shadow='xs'
          withBorder
          p='md'
          w={300}
          radius='md'
          component='button'
          onClick={() => handleOnClick('account')}
        >
          <Group>
            <IconUserCircle stroke={1} />
            <div>
              <Text size='sm' ta={'start'}>
                {'Account Page'}
              </Text>
              <Text c={'dimmed'} size='sm' ms={'xs'} ta={'start'}>
                {'Where your personal data lives.'}
              </Text>
            </div>
          </Group>
        </Paper>
      </Center>
    </Container>
  );
};
