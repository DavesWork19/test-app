import { createClient } from '../../utils/supabase/server';
import { CreateNewVet } from './CreateNewVet';

export default async function UpdateVetsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main>
      <CreateNewVet userID={user.id} />
    </main>
  );
}
