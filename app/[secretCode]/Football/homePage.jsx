'use client';

import '../../Fonts.css';
import { todaysGamesFootball } from '../../commonComps/todaysGamesFootball';
import { newPercentagesFootball } from '../../commonComps/newPercentsFootball';
import { footerMessage1, footerMessage2 } from '../../constants';
import GamblingHeader from '../../commonComps/GamblingHeader';
import OverallPercents from './OverallPercentages';
import { secretCode, parlaySecretCode } from '../../constants';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '../../utils/supabase/client';
import { Center, Text } from '@mantine/core';
import GameCardList from '../../commonComps/newMatchupLayout';

const NFLHomePage = () => {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const secretCodeEntered = pathname.includes(secretCode);
  const todaysDayName = todaysGamesFootball.slice(0, 1)[0];
  const todaysDate = todaysGamesFootball.slice(1, 2)[0].split(',')[0];
  const formattedDate = todaysDate.replace(/\b0(\d)\b/, '$1');
  const date = `${todaysDayName}, ${formattedDate}`;

  const handleNoCode = async () => {
    if (!secretCodeEntered) {
      await supabase.auth.signOut();
      router.replace('/login');
      router.refresh();
      return;
    }
  };
  handleNoCode();

  const handleClick = () => {
    router.push(`/${secretCode}/Football/${parlaySecretCode}/`);
  };

  return (
    secretCodeEntered && (
      <main className='container-fluid text bg-black lightText'>
        <GamblingHeader title={date} link={'back'} />

        <GameCardList
          rawGames={todaysGamesFootball}
          basePath={`${secretCode}/Football`}
        />

        <OverallPercents
          percentagesData={newPercentagesFootball}
          todayLabel={todaysDayName}
        />

        <Center pt={'xl'}>
          <Text size={'xs'}>{footerMessage1}</Text>
        </Center>
        <button onClick={handleClick}>{'Parlays'}</button>
      </main>
    )
  );
};

export default NFLHomePage;
