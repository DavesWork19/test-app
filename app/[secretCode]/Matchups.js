'use client';

import { useRouter } from 'next/navigation';
// import ATLogo from '../logos/atLogo1.png';
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
    const updatedEasternTime = `${updatedGameTime} ${gameTime.slice(secondLastElement).toUpperCase()}M`;

    const [time, modifier] = updatedEasternTime.split(' ');
    let [hours, minutes] = time.split(':');
    hours = parseInt(hours);

    if (modifier === 'PM' && hours !== 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    // Create date string with Eastern timezone offset
    const date = new Date(
      `2024-01-15T${String(hours).padStart(2, '0')}:${minutes}:00-05:00`
    );

    const mountainTime = date.toLocaleString('en-US', {
      timeZone: 'America/Denver',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });

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
                {`${mountainTime} MST`}
              </Text>

              <Group justify='space-between'>
                {setTeam(awayTeam, 'start')}

                {/* <Image src={ATLogo} className='atSymbol' width='auto' /> */}
                <Text c={'black'}>{'@'}</Text>

                {setTeam(homeTeam, 'end')}
              </Group>
            </Stack>
          </Paper>
        </button>
      </Stack>
    );
  });
};

export default NBAMatchups;
