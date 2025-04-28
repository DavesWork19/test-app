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

  return (
    <main>
      <AddAppointment vetNames={vetNames} insuranceNames={insuranceNames} />
    </main>
  );
}
