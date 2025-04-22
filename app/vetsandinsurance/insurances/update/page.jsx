import { createClient } from '../../../utils/supabase/server';
import { AddInsurance } from './AddInsurance';

export default async function AddInsurancePage() {
  const supabase = await createClient();
  const { data: pets } = await supabase
    .from('pets')
    .select()
    .order('last_updated', { ascending: false });

  const petNames = pets.map((pet) => {
    return {
      label: pet.name,
      value: pet.id,
    };
  });

  return (
    <main>
      <AddInsurance pets={petNames} />
    </main>
  );
}
