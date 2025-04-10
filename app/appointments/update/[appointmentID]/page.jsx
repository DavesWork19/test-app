import { createClient } from '../../../utils/supabase/server';
import { UpdateAppointment } from './UpdateAppointment';

export default async function UpdateAppointmentPage({ params }) {
  const { appointmentID } = await params;
  console.log('these are params', appointmentID);
  const supabase = await createClient();

  const { data: appointment } = await supabase
    .from('appointments')
    .select()
    .eq('id', appointmentID);
  return (
    <main>
      <UpdateAppointment appointment={appointment[0]} />
    </main>
  );
}
