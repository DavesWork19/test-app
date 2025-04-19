import { Container, Paper } from '@mantine/core';
import { createClient } from '../utils/supabase/server';
import { AllPets } from './AllPets';

export default async function NotesPage() {
  const supabase = await createClient();

  const { data: pets } = await supabase
    .from('pets')
    .select()
    .order('last_updated', { ascending: false });

  const userID = pets[0].user_id;

  for (let i = 0; i < pets.length; i++) {
    const petID = pets[i].id;
    const { data } = await supabase.storage
      .from('docs')
      .list(`private/privateier/pets/${userID}/${petID}`);
    if (data[0]) {
      const petImg = await supabase.storage
        .from('docs')
        .createSignedUrl(
          `private/privateier/pets/${userID}/${petID}/${data[0].name}`,
          600
        );
      pets[i].image = petImg.data;
    } else {
      pets[i].image = null;
    }
  }

  return (
    <main>
      <Container size='md'>
        <Paper shadow='xs' withBorder p='md' radius='md' bg={'#fff0eb'}>
          <AllPets pets={pets} />
        </Paper>
      </Container>
    </main>
  );
}
