import { Container, Paper } from '@mantine/core';
import { createClient } from '../../utils/supabase/server';
import { AddNote } from './AddNote';

export default async function UpdateNotesPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main>
      <Container size='md'>
        <Paper shadow='xs' withBorder p='md' radius='md' bg={'#fff0eb'}>
          <AddNote userID={user.id} />
        </Paper>
      </Container>
    </main>
  );
}
