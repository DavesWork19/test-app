import { Container, Paper } from '@mantine/core';
import { createClient } from '../utils/supabase/server';
import { AllNotes } from './AllNotes';

export default async function NotesPage() {
  const supabase = await createClient();

  const { data: notes } = await supabase
    .from('notes')
    .select()
    .order('date', { ascending: false });

  return (
    <main>
      <Container size='md'>
        <Paper shadow='xs' withBorder p='md' radius='md' bg={'#fff0eb'}>
          <AllNotes notes={notes} />
        </Paper>
      </Container>
    </main>
  );
}
