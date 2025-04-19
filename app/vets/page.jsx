import { Test } from './Test';
import { createClient } from '../utils/supabase/server';
import { Container } from '@mantine/core';

export default async function VetPage() {
  const supabase = await createClient();
  const { data: vets } = await supabase
    .from('vets')
    .select()
    .order('last_updated', { ascending: false });

  return (
    <main>
      <Container size={'md'}>
        <Test data={vets} />
      </Container>
      {/* {'Insurances '}
      <Test /> */}
    </main>
  );
}
