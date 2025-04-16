import { Container, Paper } from '@mantine/core';
import { createClient } from '../utils/supabase/server';
import { NoPets } from './NoPets';
import { AllPets } from './AllPets';

export default async function NotesPage() {
  const supabase = await createClient();

  const { data: pets } = await supabase
    .from('pets')
    .select()
    .order('last_updated', { ascending: false });

  const docList = await supabase.storage
    .from('docs')
    .list(`private/privateier/pets/${pets[0].user_id}/${pets[0].id}`);

  const { data, error } = await supabase.storage
    .from('docs')
    .createSignedUrl(
      `private/privateier/pets/${pets[0].user_id}/${pets[0].id}/IMG_0297.jpeg`,
      600
    );

  console.log('in all pets', data, docList);

  return (
    <main>
      <Container size='md'>
        <Paper shadow='xs' withBorder p='md' radius='md' bg={'lightgray'}>
          <AllPets pets={pets} files={data} />
        </Paper>
      </Container>
    </main>
  );
}
