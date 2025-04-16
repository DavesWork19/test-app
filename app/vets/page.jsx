import { Test } from './Test';
import { createClient } from '../utils/supabase/server';

export default async function VetPage() {
  const supabase = await createClient();
  const { data: vets } = await supabase
    .from('vets')
    .select()
    .order('last_updated', { ascending: false });

  return (
    <main>
      {'Vets?'}
      <Test data={vets} />
      {/* {'Insurances '}
      <Test /> */}
    </main>
  );
}
