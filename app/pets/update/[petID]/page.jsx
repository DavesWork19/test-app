import { createClient } from '../../../utils/supabase/server';
import { UpdatePet } from './UpdatePet';

export default async function UpdateNotePage({ params }) {
  const { petID } = await params;
  const supabase = await createClient();

  const {
    data: [pet],
  } = await supabase.from('pets').select().eq('id', petID);

  const { data } = await supabase.storage
    .from('docs')
    .list(`private/privateier/pets/${pet.user_id}/${pet.id}`);
  if (data[0]) {
    const petImg = await supabase.storage
      .from('docs')
      .createSignedUrl(
        `private/privateier/pets/${pet.user_id}/${pet.id}/${data[0].name}`,
        600
      );
    pet.img_name = data[0].name;
    pet.image = petImg.data;
  } else {
    pet.img_name = null;
    pet.image = null;
  }

  return (
    <main>
      <UpdatePet pet={pet} />
    </main>
  );
}
