'use client';

import '../Fonts.css';
import GamblingHeader from '../commonComps/GamblingHeader';
import { secretCode } from '../constants';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '../utils/supabase/client';
import { Center, Stack, Button } from '@mantine/core';

const SportSelectPage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const secretCodeEntered = pathname.includes(secretCode);

  const handleNoCode = async () => {
    if (!secretCodeEntered) {
      await supabase.auth.signOut();
      router.replace('/login');
      router.refresh();
      return;
    }
  };
  handleNoCode();

  return (
    secretCodeEntered && (
      <main className='container-fluid text bg-black lightText'>
        <GamblingHeader title={'Choose a Sport'} />

        <Center pt={'xl'}>
          <Stack spacing='md' w={220}>
            <Button
              size='lg'
              variant='filled'
              color='dark'
              onClick={() => router.push(`/${secretCode}/Basketball`)}
            >
              Basketball?
            </Button>
            <Button
              size='lg'
              variant='filled'
              color='dark'
              onClick={() => router.push(`/${secretCode}/Football`)}
            >
              Football
            </Button>
          </Stack>
        </Center>
      </main>
    )
  );
};

export default SportSelectPage;
