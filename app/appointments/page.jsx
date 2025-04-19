import { Container, Paper } from '@mantine/core';
import { createClient } from '../utils/supabase/server';
import { AllAppointments } from './AllAppointments';

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
      <Container size='md'>
        <Paper shadow='xs' withBorder p='md' radius='md' bg={'lightgray'}>
          <AllAppointments appointments={appointments} />
        </Paper>
      </Container>
    </main>
  );
}
