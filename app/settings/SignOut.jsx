'use client';

import { Center } from '@mantine/core';
import { useRouter } from 'next/navigation';
import { createClient } from '../utils/supabase/client';

export const SignOut = () => {
  const supabase = createClient();
  const router = useRouter();

  const handleOnClick = async () => {
    const { error } = await supabase.auth.signOut();
    router.replace('/');
  };

  return (
    <button onClick={handleOnClick}>
      <Center>Sign Out</Center>
    </button>
  );
};
