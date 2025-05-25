import { createClient } from '../utils/supabase/server';
import { HomePageInfo } from './HomePageInfo';

// Page for sharing data
export default async function HomePage() {
  const supabase = await createClient();

  const { data: pets } = await supabase
    .from('pets')
    .select()
    .order('last_updated', { ascending: false });

  if (pets.length !== 0) {
    const userID = pets[0].user_id;

    for (let i = 0; i < pets.length; i++) {
      const petID = pets[i].id;
      const { data } = await supabase.storage
        .from('docs')
        .list(`private/privateier/pets/${userID}/${petID}`);
      if (data[0]) {
        const petImg = await supabase.storage
          .from('docs')
          .createSignedUrl(
            `private/privateier/pets/${userID}/${petID}/${data[0].name}`,
            600
          );
        pets[i].image = petImg.data;
      } else {
        pets[i].image = null;
      }
    }
  }

  const { data: appointments } = await supabase
    .from('appointments')
    .select()
    .order('start_time', { ascending: false });

  const { data: notes } = await supabase
    .from('notes')
    .select()
    .order('date', { ascending: false });

  const allCategories = [];
  for (let i = 0; i < appointments.length; i++) {
    if (appointments[i].category) {
      allCategories.push(...appointments[i].category.split(','));
    }
  }

  const { data: vets } = await supabase
    .from('vets')
    .select()
    .order('last_updated', { ascending: false });

  const { data: insurances } = await supabase
    .from('insurances')
    .select()
    .order('last_updated', { ascending: false });

  const {
    data: [userInfo],
  } = await supabase.from('user_info').select();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main>
      <HomePageInfo
        appointments={appointments}
        docs={notes}
        pets={pets}
        vets={vets}
        insurances={insurances}
        account={userInfo}
        userEmail={user.email}
      />
    </main>
  );
}
