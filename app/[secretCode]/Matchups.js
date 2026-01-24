'use client';

import { useRouter } from 'next/navigation';
import ATLogo from '../logos/atLogo1.png';
import '../Fonts.css';
import { todaysGames } from '../commonComps/todaysGames';
import { Paper, Text, Group, Image, Stack, Button } from '@mantine/core';
import { secretCode } from '../constants';

const NBAMatchups = () => {
  const router = useRouter();
  const setTeam = (team, textPos) => {
    return (
      <Text
        c={'black'}
        className={`legalTeamNames boldText`}
        align={textPos === 'start' ? 'left' : 'right'}
      >
        {/* <img className='teamImgs' src={nbaTeamLogos[team]} alt='logo' /> */}
        {team}
      </Text>
    );
  };

  return todaysGames.slice(2).map((data) => {
    const [gameTime, awayTeamILL, homeTeamILL] = data.split(',');
    const secondLastElement = gameTime.length - 1;
    const lastAwayElement = awayTeamILL.split(' ').length - 1;
    const lastHomeElement = homeTeamILL.split(' ').length - 1;
    const updatedGameTime = gameTime.slice(0, secondLastElement);
    const ampm = gameTime[secondLastElement].toUpperCase();
    const awayTeam = awayTeamILL.split(' ')[lastAwayElement];
    const homeTeam = homeTeamILL.split(' ')[lastHomeElement];
    const link = `${awayTeam}AT${homeTeam}`;

    const handleClick = () => {
      router.push(`${secretCode}/${link}`);
    };

    return (
      <Stack key={link}>
        <button onClick={handleClick} style={{ textDecoration: 'black' }}>
          <Paper
            shadow='sm'
            p='md'
            mt='xs'
            mb='xl'
            withBorder
            className='boldText slateGrayBackground cursor-pointer hover:shadow-lg transition-shadow'
            style={{ borderColor: 'black' }}
          >
            <Stack spacing='md'>
              <Text
                c={'black'}
                align='center'
                pb='sm'
                style={{ borderBottom: '1px solid black' }}
              >
                {`${updatedGameTime} ${ampm}M EDT`}
              </Text>

              <Group justify='space-between'>
                <div>{setTeam(awayTeam, 'start')}</div>

                <div style={{ flex: 0, textAlign: 'center', color: 'black' }}>
                  <Image
                    src={ATLogo}
                    alt='atLogo'
                    className='atSymbol'
                    width='auto'
                  />
                </div>

                <div>{setTeam(homeTeam, 'end')}</div>
              </Group>
            </Stack>
          </Paper>
        </button>
      </Stack>
    );
  });
};

export default NBAMatchups;
