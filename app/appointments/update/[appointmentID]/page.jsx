import { createClient } from '../../../utils/supabase/server';
import { UpdateAppointment } from './UpdateAppointment';

export default async function UpdateAppointmentPage({ params }) {
  const { appointmentID } = await params;
  const supabase = await createClient();

  const {
    data: [appointment],
  } = await supabase.from('appointments').select().eq('id', appointmentID);

  const { data: vet } = await supabase
    .from('vets')
    .select()
    .eq('id', appointment.vet);

  const updatedVet = vet ? vet[0] : {};

  return (
    <main>
      <UpdateAppointment appointment={appointment} vet={updatedVet} />
    </main>
  );
}
