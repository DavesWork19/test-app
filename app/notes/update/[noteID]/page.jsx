import { Container, Paper } from '@mantine/core';
import { createClient } from '../../../utils/supabase/server';
import { UpdateNote } from './UpdateNote';

export default async function UpdateNotePage({ params }) {
  const { noteID } = await params;
  const supabase = await createClient();

  const {
    data: [note],
  } = await supabase.from('notes').select().eq('id', noteID);

  return (
    <main>
      <Container size='md'>
        <Paper shadow='xs' withBorder p='md' radius='md' bg={'lightgray'}>
          <UpdateNote note={note} />
        </Paper>
      </Container>
    </main>
  );
}
