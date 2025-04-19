import { Container, Paper } from '@mantine/core';
import { createClient } from '../../../utils/supabase/server';
import { UpdateNote } from './UpdateNote';

export default async function UpdateNotePage({ params }) {
  const { noteID } = await params;
  const supabase = await createClient();

  const {
    data: [note],
  } = await supabase.from('notes').select().eq('id', noteID);

  const { data } = await supabase.storage
    .from('docs')
    .list(`private/privateier/docs/${note.user_id}/${note.id}`);
  if (data[0]) {
    const petImg = await supabase.storage
      .from('docs')
      .createSignedUrl(
        `private/privateier/docs/${note.user_id}/${note.id}/${data[0].name}`,
        600
      );
    note.img_name = data[0].name;
    note.image = petImg.data;
  } else {
    note.img_name = null;
    note.image = null;
  }

  return (
    <main>
      <Container size='md'>
        <Paper shadow='xs' withBorder p='md' radius='md' bg={'#fff0eb'}>
          <UpdateNote note={note} />
        </Paper>
      </Container>
    </main>
  );
}
