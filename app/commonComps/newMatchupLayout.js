'use client';

import { Box, Text, Stack } from '@mantine/core';
import { useRouter } from 'next/navigation';

// Converts an Eastern kickoff time to Mountain time. Accepts both the 24-hour
// form used by football data ("13:00", "20:00") and the "6:00p" form used by
// basketball data. Returns the display label plus a minutes-since-midnight
// value used to sort a day's games.
function convertEtToMt(timeStr) {
  const match = String(timeStr)
    .trim()
    .match(/^(\d{1,2}):(\d{2})\s*([ap])?m?$/i);
  if (!match) return { label: timeStr, sortMinutes: Number.MAX_SAFE_INTEGER };

  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const meridiem = match[3] ? match[3].toLowerCase() : null;

  if (meridiem === 'p' && hours !== 12) hours += 12;
  if (meridiem === 'a' && hours === 12) hours = 0;

  // Eastern -> Mountain
  hours = (hours - 2 + 24) % 24;

  const period = hours >= 12 ? 'PM' : 'AM';
  const displayHour = hours % 12 === 0 ? 12 : hours % 12;
  const displayMinutes = minutes.toString().padStart(2, '0');

  return {
    label: `${displayHour}:${displayMinutes} ${period} MT`,
    sortMinutes: hours * 60 + minutes,
  };
}

function parseGames(rawData) {
  const isTimeRow = (parts) =>
    /^\s*\d{1,2}:\d{2}\s*[ap]?m?\s*$/i.test(parts[0] || '');

  let currentDay = '';
  let lastDayForOrder = null;
  let dayOrder = -1;

  const noteDay = (day) => {
    const trimmed = day.trim();
    if (!trimmed) return;
    currentDay = trimmed;
    if (currentDay !== lastDayForOrder) {
      dayOrder += 1;
      lastDayForOrder = currentDay;
    }
  };

  const games = [];

  rawData.forEach((row) => {
    const raw = String(row);

    // "Sunday|September 13, 2026" slate header.
    if (raw.includes('|')) {
      noteDay(raw.split('|')[0]);
      return;
    }

    const parts = raw.split(',');

    if (!isTimeRow(parts)) {
      // Legacy leading rows: a bare day name ("Sunday"); a date row
      // ("April 12, 2026") carries no day info, so it is ignored.
      if (!raw.includes(',')) noteDay(raw);
      return;
    }

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
    ] = parts;

    const homeSpread = parseFloat(spread);
    const awaySpread = -homeSpread;
    const homeSpreadLabel = homeSpread > 0 ? `+${homeSpread}` : `${homeSpread}`;
    const awaySpreadLabel = awaySpread > 0 ? `+${awaySpread}` : `${awaySpread}`;

    const spreadH = spreadHighlighted === '1';
    const ouH = ouHighlighted === '1';
    const mlH = mlHighlighted === '1';

    const { label: timeLabel, sortMinutes } = convertEtToMt(time);

    games.push({
      time: timeLabel,
      day: currentDay,
      dayOrder: Math.max(dayOrder, 0),
      sortMinutes,
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
    });
  });

  return games.sort(
    (a, b) => a.dayOrder - b.dayOrder || a.sortMinutes - b.sortMinutes
  );
}

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

export default function GameCardList({ rawGames, basePath }) {
  const router = useRouter();
  const games = parseGames(rawGames);
  const multiDay = new Set(games.map((game) => game.day).filter(Boolean)).size > 1;

  return (
    <Box pb={'lg'}>
      <Stack gap={8}>
        {games.map((game, i) => {
          const showDayHeader =
            multiDay && (i === 0 || game.day !== games[i - 1].day);

          return (
            <Box key={i}>
              {showDayHeader && (
                <Text
                  fw={700}
                  style={{
                    fontSize: 13,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#c8d4da',
                    padding: '10px 2px 4px',
                  }}
                >
                  {game.day}
                </Text>
              )}
              <button
                style={{
                  all: 'unset',
                  display: 'block',
                  width: '100%',
                  cursor: 'pointer',
                }}
                onClick={() => {
                  router.push(`/${basePath}/${game.link}`);
                }}
              >
                <GameCard game={game} />
              </button>
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
}
