import { Center } from '@mantine/core';
import { Button, Group, Space } from '@mantine/core';
import { Login } from './Login';

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
        <Button variant='filled' color='rgba(0, 0, 0, 1)' size='xs' radius='xl'>
          {'???'}
        </Button>
      </Group>
    </div>
  );
}
