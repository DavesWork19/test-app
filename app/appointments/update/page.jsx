import { createClient } from '../../utils/supabase/server';
import { AddAppointment } from './AddAppointment';

export default async function CreateAppointmentPage() {
  const supabase = await createClient();

  const { data: vets } = await supabase.from('vets').select();

  const vetNames = vets.map((vet) => {
    return {
      label: vet.name,
      value: vet.id,
    };
  });

  const { data: insurances } = await supabase.from('insurances').select();

  const insuranceNames = insurances.map((insurance) => {
    return {
      label: insurance.company,
      value: insurance.id,
    };
  });

  const { data: category } = await supabase
    .from('appointments')
    .select('category');

  const allCategories = [];
  for (let i = 0; i < category.length; i++) {
    if (category[i].category) {
      allCategories.push(...category[i].category.split(','));
    }
  }

  return (
    <main>
      <AddAppointment
        vetNames={vetNames}
        insuranceNames={insuranceNames}
        categories={[...new Set(allCategories)]}
      />
    </main>
  );
}
