import { createClient } from '../../../../utils/supabase/server';
import { UpdateVet } from './UpdateVet';

export default async function UpdateVetPage({ params }) {
  const { vetID } = await params;
  const supabase = await createClient();

  const {
    data: [vet],
  } = await supabase.from('vets').select().eq('id', vetID);

  return (
    <main>
      <UpdateVet vet={vet} />
    </main>
  );
}
