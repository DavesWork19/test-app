import { Center } from '@mantine/core';
import { Group, Space } from '@mantine/core';
import { Login } from './Login';
import { GamblingButton } from '../components/GamblingButton';

export default function LoginPage() {
  return (
    <div>
      <Center>
        <Login />
      </Center>
      <Space h='xl' />
      <Space h='xl' />
      <Space h='xl' />
      <Space h='xl' />
      <Space h='xl' />
      <Space h='xl' />
      <Group justify='flex-end'>
        <GamblingButton />
      </Group>
    </div>
  );
}
