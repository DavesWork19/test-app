'use client';

import '../../Fonts.css';
import {
  matchUpPageText1,
  matchUpPageText2,
  nbaTeamShortNames,
} from '../../constants';
import { todaysGames } from '../../commonComps/todaysGames';
import GamblingHeader from '../../commonComps/GamblingHeader';
import PercentDataTable from '../../commonComps/PercentDataTable';
import { usePathname } from 'next/navigation';
import { Center, Grid, GridCol, Stack, Text } from '@mantine/core';

const NBAMatchUpPage = () => {
  const pathname = usePathname();
  const currentURL = pathname.split('/')[2];
  const [awayTeam, homeTeam] = currentURL.split('AT');
  const results = todaysGames.find(
    (element) =>
      element.split(',')[1]?.includes(awayTeam) ||
      element.split(',')[2]?.includes(homeTeam)
  );

  const [
    homeTeamSpread,
    homeTeamCover,
    overUnder,
    overUnderCover,
    awayMoneyLine,
    homeMoneyLine,
    homeMoneyLineCover,
  ] = results.split(',').slice(3);
  const [gameTime] = results.split(',')[0];
  const hour = gameTime.split(':')[0];

  const moneyLineText = +homeMoneyLineCover
    ? `${homeTeam} predicted to win and cover ${homeMoneyLine}`
    : `${awayTeam} predicted to win and cover ${awayMoneyLine}`;
  const homeCover = +homeTeamCover ? 'cover ' : 'not cover ';
  const overUnderCoverName = +overUnderCover ? 'over' : 'under';

  return (
    <main className='container-fluid text bg-black lightText'>
      <GamblingHeader title={`${awayTeam} at ${homeTeam}`} link={'back'} />
      <Center>
        <Text className='col-12  fs-3'>{moneyLineText}</Text>
      </Center>
      <Center>
        <Text className='col-12  fs-3'>
          {`${homeTeam} predicted to ${homeCover} ${homeTeamSpread}`}
        </Text>
      </Center>
      <Center pb={'xl'}>
        <Text className='col-12  fs-3'>
          {`Predicted ${overUnderCoverName} ${overUnder}`}
        </Text>
      </Center>

      <Grid py={'xl'} visibleFrom={'xs'}>
        <GridCol span={6}>
          <PercentDataTable
            title={awayTeam}
            percentagesName={nbaTeamShortNames[awayTeam]}
            hours={new Set([hour])}
            checksAndXs={true}
          />
        </GridCol>
        <GridCol span={6}>
          <PercentDataTable
            title={homeTeam}
            percentagesName={nbaTeamShortNames[homeTeam]}
            hours={new Set([hour])}
            checksAndXs={true}
          />
        </GridCol>
      </Grid>
      <Grid py={'xl'} hiddenFrom={'xs'}>
        <GridCol span={12}>
          <PercentDataTable
            title={awayTeam}
            percentagesName={nbaTeamShortNames[awayTeam]}
            hours={new Set([hour])}
            checksAndXs={true}
          />
        </GridCol>
        <GridCol span={12}>
          <PercentDataTable
            title={homeTeam}
            percentagesName={nbaTeamShortNames[homeTeam]}
            hours={new Set([hour])}
            checksAndXs={true}
          />
        </GridCol>
      </Grid>

      <Center pt={'xl'}>
        <Text size={'xs'}>{matchUpPageText1}</Text>
      </Center>
      <Center>
        <Text size={'xs'}>{matchUpPageText2}</Text>
      </Center>
    </main>
  );
};

export default NBAMatchUpPage;
