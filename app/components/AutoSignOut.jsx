'use client';

import { useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../utils/supabase/client';

const MAX_INACTIVITY_MS = 60000 * 15; // Example: 60 seconds

export default function AutoSignOut() {
  const router = useRouter();
  const timer = useRef(null);
  const supabase = createClient();

  const onLogout = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (!error) {
      router.replace('/login');
    }
  }, [router]);

  const resetTimer = useCallback(() => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(onLogout, MAX_INACTIVITY_MS);
  }, [onLogout]);

  useEffect(() => {
    const handleEvent = () => {
      resetTimer();
    };

    window.addEventListener('mousemove', handleEvent);
    window.addEventListener('keypress', handleEvent);
    window.addEventListener('scroll', handleEvent); //optional
    window.addEventListener('click', handleEvent); //optional

    resetTimer(); // Initial timer setup

    return () => {
      window.removeEventListener('mousemove', handleEvent);
      window.removeEventListener('keypress', handleEvent);
      window.removeEventListener('scroll', handleEvent);
      window.removeEventListener('click', handleEvent);
      if (timer.current) clearTimeout(timer.current);
    };
  }, [resetTimer]);

  return null; // This component doesn't render anything
}
