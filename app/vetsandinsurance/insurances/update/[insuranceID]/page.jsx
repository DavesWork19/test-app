import { createClient } from '../../../../utils/supabase/server';
import { UpdateInsurance } from './UpdateInsurance';

export default async function UpdateInsurancePage({ params }) {
  const { insuranceID } = await params;
  const supabase = await createClient();

  const {
    data: [insurance],
  } = await supabase.from('insurances').select().eq('id', insuranceID);

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
      <UpdateInsurance insurance={insurance} petNames={petNames} />
    </main>
  );
}
