'use client';

import '../../../Fonts.css';
import {
  matchUpPageText1,
  matchUpPageText2,
  nflTeamShortNames,
} from '../../../constants';
import { todaysGamesFootball } from '../../../commonComps/todaysGamesFootball';
import { newPercentagesFootball } from '../../../commonComps/newPercentsFootball';
import GamblingHeader from '../../../commonComps/GamblingHeader';
import PercentDataTable from '../../../commonComps/PercentDataTable';
import { usePathname } from 'next/navigation';
import { Center, Grid, GridCol, Stack, Text } from '@mantine/core';

const NFLMatchUpPage = () => {
  const pathname = usePathname();
  const currentURL = pathname.split('/')[3];
  const [awayTeam, homeTeam] = currentURL.split('AT');
  const results = todaysGamesFootball.find(
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
  const headerRow = todaysGamesFootball.find((row) =>
    String(row).includes('|')
  );
  const todayLabel = headerRow
    ? headerRow.split('|')[0].trim()
    : todaysGamesFootball.slice(0, 1)[0];

  const moneyLineText = +homeMoneyLineCover
    ? `${homeTeam} predicted to win ( ${homeMoneyLine} )`
    : `${awayTeam} predicted to win ( ${awayMoneyLine} )`;
  const awaySpread =
    homeTeamSpread[0] === '-'
      ? `+${homeTeamSpread.slice(1)}`
      : `-${homeTeamSpread.slice(1)}`;
  const spreadCover = +homeTeamCover
    ? `${homeTeam} predicted to cover ${homeTeamSpread}`
    : `${awayTeam} predicted to cover ${awaySpread}`;
  const overUnderCoverName = +overUnderCover ? 'over' : 'under';

  return (
    <main className='container-fluid text bg-black lightText'>
      <GamblingHeader title={`${awayTeam} at ${homeTeam}`} link={'back'} />
      <Center>
        <Text className='col-12  fs-3'>{moneyLineText}</Text>
      </Center>
      <Center>
        <Text className='col-12  fs-3'>{spreadCover}</Text>
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
            percentagesName={nflTeamShortNames[awayTeam]}
            hours={new Set([hour])}
            checksAndXs={true}
            percentagesData={newPercentagesFootball}
            todayLabel={todayLabel}
          />
        </GridCol>
        <GridCol span={6}>
          <PercentDataTable
            title={homeTeam}
            percentagesName={nflTeamShortNames[homeTeam]}
            hours={new Set([hour])}
            checksAndXs={true}
            percentagesData={newPercentagesFootball}
            todayLabel={todayLabel}
          />
        </GridCol>
      </Grid>
      <Grid py={'xl'} hiddenFrom={'xs'}>
        <GridCol span={12}>
          <PercentDataTable
            title={awayTeam}
            percentagesName={nflTeamShortNames[awayTeam]}
            hours={new Set([hour])}
            checksAndXs={true}
            percentagesData={newPercentagesFootball}
            todayLabel={todayLabel}
          />
        </GridCol>
        <GridCol span={12}>
          <PercentDataTable
            title={homeTeam}
            percentagesName={nflTeamShortNames[homeTeam]}
            hours={new Set([hour])}
            checksAndXs={true}
            percentagesData={newPercentagesFootball}
            todayLabel={todayLabel}
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

export default NFLMatchUpPage;
