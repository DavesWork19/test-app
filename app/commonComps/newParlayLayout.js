'use client';

import { Box, Text } from '@mantine/core';
import { todaysParlay1, todaysParlay2, todaysParlay3 } from './todaysParlays';
import { secretCode } from '../constants';
import { useRouter } from 'next/navigation';

function parseGames(rawData) {
  const entries = rawData.slice(2); // skip day and date

  const games = [];
  for (let i = 0; i < entries.length; i += 3) {
    const team = entries[i];
    const odds = entries[i + 1];
    const betType = entries[i + 2];

    if (!team || !odds || !betType) continue;

    const betTypeLabels = {
      money_line: 'ML',
      spread: 'Spread',
      over_under: 'O/U',
    };

    games.push({
      team,
      picks: [
        {
          columnLabel: betTypeLabels[betType] ?? betType,
          label: odds,
        },
      ],
    });
  }

  return games;
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
          {game.team}
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
          onClick={() => router.push(`${secretCode}/${game.team}`)}
        />
      ))}
    </Box>
  );
}

export default function GameCardList() {
  return (
    <Box style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <ParlayCard title='The Lay' rawData={todaysParlay1} />
      <ParlayCard title='Easy Money' rawData={todaysParlay2} />
      <ParlayCard title='Heave & Hope' rawData={todaysParlay3} />
    </Box>
  );
}
