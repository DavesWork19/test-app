import { Container, Paper } from '@mantine/core';
import { createClient } from '../../utils/supabase/server';
import { HeaderClient } from './HeaderClient';

export async function Header() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <header className='p-8'>{user && <HeaderClient />}</header>;
}
