import { Container, Paper } from '@mantine/core';
import { createClient } from '../../../utils/supabase/server';
import { UpdatePet } from './UpdatePet';

export default async function UpdateNotePage({ params }) {
  const { petID } = await params;
  const supabase = await createClient();

  const {
    data: [pet],
  } = await supabase.from('pets').select().eq('id', petID);

  return (
    <main>
      <Container size='md'>
        <Paper shadow='xs' withBorder p='md' radius='md' bg={'lightgray'}>
          <UpdatePet pet={pet} />
        </Paper>
      </Container>
    </main>
  );
}
