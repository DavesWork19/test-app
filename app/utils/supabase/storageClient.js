import { createClient } from '@supabase/supabase-js';

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function uploadFile(file, userID, noteID) {
  const { error } = await supabase.storage
    .from('docs')
    .upload(`/private/privateier/${userID}/${noteID}/${file.name}`, file);

  if (error) {
    return 'error';
  }
}

export async function replaceFile(file, userID, noteID) {
  const { error } = await supabase.storage
    .from('docs')
    .update(`/private/privateier/${userID}/${noteID}/${file.name}`, file, {
      cacheControl: '3600',
      upsert: true,
    });
  if (error) {
    return 'error';
  }
}

export async function uploadPetFile(file, userID, petID) {
  const { error } = await supabase.storage
    .from('docs')
    .upload(`/private/privateier/pets/${userID}/${petID}/${file.name}`, file);

  if (error) {
    return 'error';
  }
}

export async function replacePetFile(file, userID, petID) {
  const { error } = await supabase.storage
    .from('docs')
    .update(`/private/privateier/pets/${userID}/${petID}/${file.name}`, file, {
      cacheControl: '3600',
      upsert: true,
    });

  if (error) {
    return 'error';
  }
}

export async function getPetFile() {
  const { data, error } = await supabase.storage
    .from('docs')
    .list(`private/privateier/pets`);

  console.log('tesitng fetch get call', data, error);
  if (error) {
    console.log('storage error', error);
  } else {
    return data;
  }
}
