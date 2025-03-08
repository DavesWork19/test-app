import { Container, Paper } from '@mantine/core';
import { SingleNote } from './SingleNote';

export default async function Notes({ params }) {
  const { userID } = await params;

  return (
    <main>
      <Container size='md'>
        <Paper shadow='xs' withBorder p='md' radius='md' bg={'lightgray'}>
          <SingleNote userID={userID} />
        </Paper>
      </Container>
    </main>
  );
}
