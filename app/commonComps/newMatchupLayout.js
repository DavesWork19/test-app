'use client';

import { Box, Text, Stack } from '@mantine/core';
import { todaysGames } from './todaysGames';
import { secretCode } from '../constants';
import { useRouter } from 'next/navigation';

function convertEstToMst(timeStr) {
  const match = timeStr.match(/^(\d+):(\d+)p$/);
  if (!match) return timeStr;

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);

  hours += 12;
  hours -= 2;

  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHour = hours > 12 ? hours - 12 : hours;
  const displayMinutes = minutes.toString().padStart(2, '0');

  return `${displayHour}:${displayMinutes} ${period} MST`;
}

function parseGames(rawData) {
  return rawData
    .slice(2)
    .filter((row) => row.includes(','))
    .map((row) => {
      const [
        time,
        awayTeam,
        homeTeam,
        spread,
        spreadHighlighted,
        ou,
        ouHighlighted,
        awayML,
        homeML,
        mlHighlighted,
      ] = row.split(',');

      const homeSpread = parseFloat(spread);
      const awaySpread = -homeSpread;
      const homeSpreadLabel =
        homeSpread > 0 ? `+${homeSpread}` : `${homeSpread}`;
      const awaySpreadLabel =
        awaySpread > 0 ? `+${awaySpread}` : `${awaySpread}`;

      const spreadH = spreadHighlighted === '1';
      const ouH = ouHighlighted === '1';
      const mlH = mlHighlighted === '1';

      return {
        time: convertEstToMst(time),
        link: `${awayTeam.split(' ').at(-1)}AT${homeTeam.split(' ').at(-1)}`,
        teams: [
          {
            name: awayTeam,
            highlighted: !spreadH,
            spread: { label: awaySpreadLabel, highlighted: !spreadH },
            ou: { label: `${ou}`, header: 'OVER', highlighted: ouH },
            ml: { label: awayML, highlighted: !mlH },
          },
          {
            name: homeTeam,
            highlighted: spreadH,
            spread: { label: homeSpreadLabel, highlighted: spreadH },
            ou: { label: `${ou}`, header: 'UNDER', highlighted: !ouH },
            ml: { label: homeML, highlighted: mlH },
          },
        ],
      };
    });
}

const games = parseGames(todaysGames);

function BetBox({ label, columnLabel, highlighted }) {
  return (
    <Box
      style={{
        backgroundColor: highlighted
          ? 'rgba(34, 139, 34, 0.85)'
          : 'rgba(0,0,0,0.18)',
        borderRadius: 5,
        padding: '4px 6px',
        textAlign: 'center',
        width: 68,
        flexShrink: 0,
        cursor: 'pointer',
        border: highlighted
          ? '1px solid rgba(34,200,34,0.5)'
          : '1px solid transparent',
      }}
    >
      <Text
        style={{
          fontSize: 8,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.04em',
          color: highlighted ? 'rgba(200,255,200,0.85)' : 'rgba(0,0,0,0.5)',
        }}
      >
        {columnLabel}
      </Text>
      <Text
        fw={700}
        style={{ fontSize: 12, color: highlighted ? '#fff' : '#111' }}
      >
        {label}
      </Text>
    </Box>
  );
}

function TeamRow({ team }) {
  return (
    <Box
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '8px 12px',
        gap: 8,
        width: '100%',
      }}
    >
      <Text
        fw={700}
        style={{
          fontSize: 15,
          color: '#111',
          flex: '1 1 0',
          minWidth: 0,
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          whiteSpace: 'nowrap',
          textAlign: 'left',
        }}
      >
        {team.name}
      </Text>
      <Box
        style={{ display: 'flex', gap: 4, alignItems: 'center', flexShrink: 0 }}
      >
        <BetBox
          columnLabel='Spread'
          label={team.spread.label}
          highlighted={team.spread.highlighted}
        />
        <Box style={{ width: 1, height: 30, background: 'rgba(0,0,0,0.15)' }} />
        <BetBox
          columnLabel={team.ou.header}
          label={team.ou.label}
          highlighted={team.ou.highlighted}
        />
        <Box style={{ width: 1, height: 30, background: 'rgba(0,0,0,0.15)' }} />
        <BetBox
          columnLabel='ML'
          label={team.ml.label}
          highlighted={team.ml.highlighted}
        />
      </Box>
    </Box>
  );
}

function GameCard({ game }) {
  return (
    <Box
      style={{
        backgroundColor: '#6b7f8f',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 8,
        width: '100%',
      }}
    >
      <Box
        style={{
          textAlign: 'center',
          padding: '6px 12px',
          borderBottom: '1px solid rgba(0,0,0,0.15)',
        }}
      >
        <Text fw={700} style={{ fontSize: 18, color: '#111' }}>
          {game.time}
        </Text>
      </Box>

      <TeamRow team={game.teams[0]} />
      <Box
        style={{ height: 1, background: 'rgba(0,0,0,0.12)', margin: '0 12px' }}
      />
      <TeamRow team={game.teams[1]} />
    </Box>
  );
}

export default function GameCardList() {
  const router = useRouter();
  return (
    <Box pb={'lg'}>
      <Stack gap={8}>
        {games.map((game, i) => (
          <button
            key={i}
            style={{
              all: 'unset',
              display: 'block',
              width: '100%',
              cursor: 'pointer',
            }}
            onClick={() => {
              router.push(`${secretCode}/${game.link}`);
            }}
          >
            <GameCard game={game} />
          </button>
        ))}
      </Stack>
    </Box>
  );
}
