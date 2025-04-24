import { Container, Paper } from '@mantine/core';
import { createClient } from '../../utils/supabase/server';
import { AddPet } from './AddPet';

export default async function UpdateNotesPage() {
  const supabase = await createClient();

  const {
    data: [notes],
  } = await supabase.from('notes').select().order('date', { ascending: false });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main>
      <AddPet userID={user.id} />
    </main>
  );
}
