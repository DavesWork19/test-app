import { Container, Paper, Center, Button, Divider } from '@mantine/core';
import { HomePageInfo } from './HomePageInfo';

// Page for sharing data
export default async function HomePage() {
  console.log('here');
  return (
    <main>
      <Container size='md'>
        <Paper shadow='xs' withBorder p='md' radius='md' bg={'#fff0eb'}>
          <Center>
            <Button>Share Data</Button>
          </Center>
          <Divider my='md' />
          <HomePageInfo />
        </Paper>
      </Container>
    </main>
  );
}
