import { createClient } from '@supabase/supabase-js';

// Create Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function uploadDocFile(file, userID, noteID) {
  const { error } = await supabase.storage
    .from('docs')
    .upload(`/private/privateier/docs/${userID}/${noteID}/${file.name}`, file);

  if (error) {
    return 'error';
  }
}

export async function replaceDocFile(file, userID, noteID, prevFileName) {
  const deleteFile = await supabase.storage
    .from('docs')
    .remove([`private/privateier/docs/${userID}/${noteID}/${prevFileName}`]);

  if (deleteFile.error) {
    return deleteFile;
  } else {
    const { error } = await supabase.storage
      .from('docs')
      .upload(
        `/private/privateier/docs/${userID}/${noteID}/${file.name}`,
        file
      );

    if (error) {
      return error;
    }
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

export async function replacePetFile(file, userID, petID, prevFileName) {
  const deleteFile = await supabase.storage
    .from('docs')
    .remove([`private/privateier/pets/${userID}/${petID}/${prevFileName}`]);

  if (deleteFile.error) {
    return 'error';
  } else {
    const { error } = await supabase.storage
      .from('docs')
      .upload(`/private/privateier/pets/${userID}/${petID}/${file.name}`, file);

    if (error) {
      return 'error';
    }
  }
}
