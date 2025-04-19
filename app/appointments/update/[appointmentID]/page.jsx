import { createClient } from '../../../utils/supabase/server';
import { UpdateAppointment } from './UpdateAppointment';

export default async function UpdateAppointmentPage({ params }) {
  const { appointmentID } = await params;
  const supabase = await createClient();

  const {
    data: [appointment],
  } = await supabase.from('appointments').select().eq('id', appointmentID);

  const { data: vets } = await supabase
    .from('vets')
    .select()
    .eq('user_id', appointment.user_id);

  const vetNames = vets.map((vet) => {
    return {
      label: vet.name,
      value: vet.id,
    };
  });

  return (
    <main>
      <UpdateAppointment appointment={appointment} vetNames={vetNames} />
    </main>
  );
}
