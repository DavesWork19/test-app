import { createClient } from '../utils/supabase/server';
import { AllAppointments } from './AllAppointments';
import { NoAppointments } from './NoAppointments';

export default async function AppointmentPage() {
  const supabase = await createClient();

  const { data: appointments } = await supabase
    .from('appointments')
    .select()
    .order('start_time', { ascending: false });

  //need to add related parameter in - show as a side note or something
  //put related appointments into a carasol or slide deck thing

  return (
    <main>
      {appointments.length === 0 && <NoAppointments />}
      {appointments.length > 0 && (
        <AllAppointments appointments={appointments} />
      )}
    </main>
  );
}
