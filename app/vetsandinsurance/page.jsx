import { CarouselData } from './Carousel';
import { createClient } from '../utils/supabase/server';
import { Container, Paper } from '@mantine/core';

export default async function VetPage() {
  const supabase = await createClient();
  const { data: vets } = await supabase
    .from('vets')
    .select()
    .order('last_updated', { ascending: false });

  const { data: insurances } = await supabase
    .from('insurances')
    .select()
    .order('last_updated', { ascending: false });

  return (
    <main>
      <Container size='md'>
        <Paper shadow='xs' withBorder p='md' radius='md' bg={'#fff0eb'}>
          <CarouselData data={vets} type={'vet'} />
        </Paper>
        <Paper
          shadow='xs'
          withBorder
          p='md'
          mt={'xl'}
          radius='md'
          bg={'#fff0eb'}
        >
          <CarouselData data={insurances} type={'insurance'} />
        </Paper>
      </Container>
    </main>
  );
}
