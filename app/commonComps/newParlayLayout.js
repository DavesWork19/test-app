'use client';

import { Box, Text } from '@mantine/core';
import { todaysParlay1, todaysParlay2, todaysParlay3 } from './todaysParlays';
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

      const picks = [];
      if (spreadHighlighted === '1')
        picks.push({
          columnLabel: 'Spread',
          label: spreadH ? homeSpreadLabel : awaySpreadLabel,
        });
      if (ouHighlighted === '1')
        picks.push({ columnLabel: 'O/U', label: ouH ? `U ${ou}` : `O ${ou}` });
      if (mlHighlighted === '1')
        picks.push({ columnLabel: 'ML', label: mlH ? homeML : awayML });

      return {
        time: convertEstToMst(time),
        link: `${awayTeam.split(' ').at(-1)}AT${homeTeam.split(' ').at(-1)}`,
        awayTeam,
        homeTeam,
        picks,
      };
    })
    .filter((game) => game.picks.length > 0);
}

function PickBox({ columnLabel, label }) {
  return (
    <Box
      style={{
        backgroundColor: 'rgba(34, 139, 34, 0.85)',
        borderRadius: 5,
        padding: '4px 12px',
        textAlign: 'center',
        minWidth: 72,
        border: '1px solid rgba(34,200,34,0.5)',
      }}
    >
      <Text
        style={{
          fontSize: 9,
          fontWeight: 500,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          color: 'rgba(200,255,200,0.85)',
        }}
      >
        {columnLabel}
      </Text>
      <Text fw={700} style={{ fontSize: 13, color: '#fff' }}>
        {label}
      </Text>
    </Box>
  );
}

function GameRow({ game, onClick }) {
  return (
    <Box
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        padding: '10px 16px',
        gap: 8,
        cursor: 'pointer',
        borderBottom: '1px solid rgba(0,0,0,0.12)',
      }}
    >
      <Box style={{ flex: '1 1 0', minWidth: 0 }}>
        <Text
          fw={700}
          style={{
            fontSize: 15,
            color: '#111',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {game.awayTeam}{' '}
          <Text
            component='span'
            fw={400}
            style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)' }}
          >
            @
          </Text>{' '}
          {game.homeTeam}
        </Text>
      </Box>

      <Box
        style={{ display: 'flex', gap: 5, alignItems: 'center', flexShrink: 0 }}
      >
        {game.picks.map((pick, i) => (
          <PickBox key={i} columnLabel={pick.columnLabel} label={pick.label} />
        ))}
      </Box>
    </Box>
  );
}

function ParlayCard({ title, rawData }) {
  const games = parseGames(rawData);
  if (games.length === 0) return null;
  const router = useRouter();

  return (
    <Box
      style={{
        backgroundColor: '#6b7f8f',
        borderRadius: 8,
        overflow: 'hidden',
      }}
    >
      <Box
        style={{
          padding: '10px 16px',
          borderBottom: '1px solid rgba(0,0,0,0.2)',
          textAlign: 'center',
        }}
      >
        <Text fw={700} style={{ fontSize: 15, color: '#111' }}>
          {title}
        </Text>
      </Box>
      {games.map((game, i) => (
        <GameRow
          key={i}
          game={game}
          onClick={() => router.push(`${secretCode}/${game.link}`)}
        />
      ))}
    </Box>
  );
}

export default function GameCardList() {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ParlayCard title='Parlay 1' rawData={todaysParlay1} />
      <ParlayCard title='Parlay 2' rawData={todaysParlay2} />
      <ParlayCard title='Parlay 3' rawData={todaysParlay3} />
    </Box>
  );
}
