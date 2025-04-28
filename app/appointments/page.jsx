import { Container, Paper } from '@mantine/core';
import { createClient } from '../utils/supabase/server';
import { AllAppointments } from './AllAppointments';

export default async function AppointmentPage() {
  const supabase = await createClient();

  const { data: appointments } = await supabase
    .from('appointments')
    .select()
    .order('start_time', { ascending: false });

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
      <Container size='md'>
        <Paper shadow='xs' withBorder p='md' radius='md' bg={'#fff0eb'}>
          <AllAppointments
            appointments={appointments}
            categories={[...new Set(allCategories)]}
          />
        </Paper>
      </Container>
    </main>
  );
}
